const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { required: true, type: String, message: "Name is required" },
    email: {
      required: true,
      type: String,
      message: "Email is required",
      email: true,
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
    },
    gender: {
      required: true,
      type: String,
      message: "Gender is required",
      enum: ["male", "female", "other"],
    },
    preferences: {
      required: true,
      type: Array,
      message: "Preferences is required",
    },
    age: { required: true, type: Number, message: "Age is required" },
    password: { required: true, type: String, message: "Password is required",select: false },
    plan: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
