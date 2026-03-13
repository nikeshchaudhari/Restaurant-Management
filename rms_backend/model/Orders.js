const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    tableNumber: String,
    items: [
      {
        menuId: { type: mongoose.Types.ObjectId, ref: "menus" },
        qty: { type: Number, require: true },
        price: { type: Number, require: true },
      },
    ],
    totalAmount: { type: Number },
    status: {
      type: String,
      enum: ["pending", "preparing", "served", "paid"],
      default: "served",
    },
  },
  { timestamps: true },
);


module.exports= mongoose.model("orders",orderSchema);