import Post from "../models/post.model.js";

export const findAllPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const findOnePost = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	try {
        const post = await Post.create({
            project: req.body.project,
            title: req.body.title,
            content: req.body.content,
            initialAmount: req.body.salary,
            currentAmount: req.body.salary,
            lastApplicationDate: req.body.lastApplicationDate,
            completionDate: req.body.completionDate,
            projManager: req.user._id,
        });
        if (!post) {
            return res.status(400).json({ message: 'Post creation failed' });
        }

		await post.save();
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		post.title = req.body.title || post.title;
		post.content = req.body.content || post.content;

		await post.save();
		res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		await post.remove();
		res.json({ message: "Post deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const findAllByUserPosts = async (req, res) => {
	try {
		const posts = await Post.find({ user: req.user._id });
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
