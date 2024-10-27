import { Router } from "express";
import { findOneUser, loginUser, logoutUser, newTokens, registerUser, updateUser, userHistory } from "../controllers/user.cont.js";
import { verifyToken } from "../utils/verifyToken.js";

const UserRouter = Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/logout", verifyToken, logoutUser);
UserRouter.get("/:id", findOneUser);
UserRouter.put("/", verifyToken, updateUser);

UserRouter.get("/history", verifyToken, userHistory);
UserRouter.post("/refresh", verifyToken, newTokens); // Endpoint for refreshing tokens

export default UserRouter;