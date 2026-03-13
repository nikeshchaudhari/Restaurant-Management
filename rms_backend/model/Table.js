const mongoose = require("mongoose");
const tableSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    tableNumber: { type: String, required: true, unique: true },
    capacity: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "reserved", "occupied"],
      default: "available",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("tables", tableSchema);
