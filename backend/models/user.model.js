import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoaggregatepaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  });
};

userSchema.methods.getRefreshToken = async function () {
  const refreshToken = jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });

  // Save the refresh token to the database, allowing only one per user
  this.refreshToken = refreshToken;
  await this.save();

  return refreshToken;
};

// Clear the refresh token (for logout)
userSchema.methods.clearRefreshToken = async function () {
  this.refreshToken = null;
  await this.save();
};

// Plugin for pagination
userSchema.plugin(mongoaggregatepaginate);

const User = mongoose.model("User", userSchema);
export default User;
