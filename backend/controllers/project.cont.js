import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
	try {
		if (!req.user._id) {
			return res.status(401).json({ message: "Unauthorized" });
        }

		const project = await Project.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            userId: req.user._id,
            status: "pending",
        });

		await project.save();
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const findAllProjectsByUser = async (req, res) => {
	try {
		if (!req.user._id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const projects = await Project.find({ userId: req.user._id });
		res.json(projects);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const findOneProject = async (req, res) => {
	try {
		if (!req.user._id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		// Ensure the user is authorized to view this project
		if (project.userId.toString() !== req.user._id) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		res.json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateProject = async (req, res) => {
	try {
		if (!req.user._id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		// Ensure the user is authorized to update this project
		if (project.userId.toString() !== req.user._id) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		project.name = req.body.name || project.name;
		project.description = req.body.description || project.description;

		await project.save();
		res.json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteProject = async (req, res) => {
	try {
		if (!req.user._id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		// Ensure the user is authorized to delete this project
		if (project.userId.toString() !== req.user._id) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		await project.remove();
		res.json({ message: "Project deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const ApplyForProject = async (req, res) => {
	try {
		if (!req.user._id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const project = await Project.findById(req.user._id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		if (project.userId.toString() === req.user._id) {
			return res.status(403).json({ message: "Cannot apply to your own project" });
		}

		project.appliedUsers.push(req.user._id);

		await project.save();
		res.json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const assignUserToProject = async (req, res) => {
	try {
		if (!req.user._id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		if (project.userId.toString() !== req.user._id) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		const user = await User.findById(req.body.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		project.assignedUsers.push(user._id);

		await project.save();
		res.json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};