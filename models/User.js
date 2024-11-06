const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: { required: true, type: String, message: "Name is required" },
    email: {
      required: true,
      type: String,
      message: "Email is required",
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          console.log(value, validator.isEmail(value));
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    gender: {
      required: true,
      type: String,
      message: "Gender is required",
      enum: ["male", "female", "other"],
    },
    role: {
      required: true,
      type: String,
      message: "Role is required",
      enum: ["user", "admin"],
      default: "user",
    },
    preferences: {
      required: true,
      type: Array,
      message: "Preferences is required",
    },
    age: { required: true, type: Number, message: "Age is required" },
    password: {
      required: true,
      type: String,
      message: "Password is required",
      select: false,
    },
    plan: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
