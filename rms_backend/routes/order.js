const express = require("express");
const route = express();
const mongoose = require("mongoose");
const Order = require("../model/Orders");
route.post("/order", async (req, res) => {
  try {
    const addData = await new Order({
      _id: new mongoose.Types.ObjectId(),
      tableNumber: req.body.tableNumber,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });

    const saveOrder = await addData.save();

    res.status(200).json({
      msg: "Add order",
      saveOrder: saveOrder,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});
// update status

route.put("/:id", async (req, res) => {
  try {
    const updateData = await Order.find({ _id: req.params.id });
    console.log(updateData[0]);

    const addData = {
      status: req.body.status,
    };

    const orderUpdate = await Order.findByIdAndUpdate(req.params.id, addData, {
      returnDocument: "after",
    });

    res.status(200).json({
      updateOrder: orderUpdate,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// recent order
route.get("/recent-order", async (req, res) => {
  try {

    const recentOrder = await Order.find()
    .sort({createdAt:-1})
    .limit(10)
    .populate("items.menuId")

    console.log(recentOrder);
    
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});
module.exports = route;
