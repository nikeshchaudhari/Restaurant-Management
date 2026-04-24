const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User",},
    orderId: String,
    tableId:{type: mongoose.Schema.Types.ObjectId, ref:"Table"},
    tableNumber: String,
    items: [
      {
        menuId: { type: mongoose.Types.ObjectId, ref: "menus" },
        menuName: { type:String, require: true },
        qty: { type: Number, require: true },
        price: { type: Number, require: true },
        totalAmount: { type: Number, require: true },
      },
    ],
    totalAmount: { type: Number },
    status: {
      type: String,
      enum: ["preparing", "paid","completed"],
      default: "preparing",
    },
  },
  { timestamps: true },
);


module.exports= mongoose.model("orders",orderSchema);