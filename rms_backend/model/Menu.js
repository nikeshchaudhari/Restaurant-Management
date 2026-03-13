const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    menuName: { type: String, required: true, unique:true},
    price: { type: String, required: true},
    category: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    imageId: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("menus", menuSchema);
