const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirm_password: { type: String },
    role: {
      type: String,
      enum: ["admin", "waiter", "cashier"],
      default: "waiter",
    },
    photo: {
      type: String,
      // default:"https://freesvg.org/img/abstract-user-flat-4.png"
    },
    ImageId: { type: String },
    ImageUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("users", userSchema);
