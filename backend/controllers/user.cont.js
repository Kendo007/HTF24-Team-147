import { Schema } from "mongoose";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
	try {
		if (!req.body.name || !req.body.email || !req.body.password) {
			return res.status(400).json({ message: "Please fill in all fields" });
		}

		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		const accessToken = await user.getAccessToken();
		const refreshToken = await user.getRefreshToken();
		if (!accessToken || !refreshToken) {
			return res.status(500).json({ message: "Authentication failed" });
		}
		res.cookie("accessToken", accessToken, { httpOnly: true });
		res.cookie("refreshToken", refreshToken, { httpOnly: true });

		user.refreshToken = refreshToken;
		await user.save();

		res.status(201).json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message:  "Internal server error" });
	}
};

export const loginUser = async (req, res) => {
	try {
		if (!req.body.email || !req.body.password) {
			return res.status(400).json({ message: "Please fill in all fields" });
		}

		const user = await User.findOne({
			email: req.body.email,
		}).select("-__v");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (!await user.matchPassword(req.body.password)) {
			return res.status(401).json({ message: "Wrong Password." });
		}

		const accessToken = await user.getAccessToken();
		const refreshToken = await user.getRefreshToken();
		if (!accessToken || !refreshToken) {
			return res.status(500).json({ message: "Authentication failed" });
		}
		res.cookie("accessToken", accessToken, { httpOnly: true });
		res.cookie("refreshToken", refreshToken, { httpOnly: true });

		user.refreshToken = refreshToken;
		await user.save();

		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message:  "Internal server error" });
	}
};

export const logoutUser = (req, res) => {
	try {
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message:  "Internal server error" });
	}
};

export const findOneUser = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		console.log(req.params.id);

		const user = await User.findById(req.params.id).select("-password -__v ");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message:  "Internal server error" });
	}
};

export const updateUser = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;

		await user.save();
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message:  "Internal server error" });
	}
};

export const userHistory = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const history = await User.aggregate([
			{
				$match: {
					_id: Schema.Types.ObjectId(req.user._id),
				},
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "user",
					as: "posts",
				},
			},
		]);
		res.json(history);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message:  "Internal server error" });
	}
};

export const newTokens = async (req, res) => {
	try {
		const token = req.cookies.refreshToken;
		if (!token) {
			return res.status(401).json({ message: "Refresh token missing" });
		}

		const user = await User.findOne({
			refreshToken: token,
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const tokens = await user.getSignedTokens();
		res.cookie("accessToken", tokens.accessToken, { httpOnly: true });
		res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });

		res.json(user);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).json({ message:  "Internal server error" });
	}
};
