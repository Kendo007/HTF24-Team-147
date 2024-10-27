import { Router } from "express";
import { createProject, deleteProject, findAllProjectsByUser, findOneProject, updateProject, ApplyForProject } from "../controllers/project.cont.js";
import { verifyToken } from "../utils/verifyToken.js";

const ProjectRouter = Router();

ProjectRouter.route("/:userId")
	.get(findAllProjectsByUser);

ProjectRouter.route("/")
	.post(verifyToken, createProject);

ProjectRouter.route("/:id")
	.get(findOneProject)
	.put(verifyToken, updateProject)
	.delete(verifyToken, deleteProject);

ProjectRouter.route("/apply")
	.post(verifyToken, ApplyForProject);

export default ProjectRouter;