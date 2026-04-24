const express = require("express");
const route = express();
const mongoose = require("mongoose");
const Order = require("../model/Orders");
const Table = require("../model/Table");
const Auth = require("../middleware/Auth");
route.post("/order", Auth, async (req, res) => {
  try {
    const { tableId, tableNumber, items, totalAmount } = req.body;
    const table = await Table.findById(tableId);
    console.log(table);
    console.log("USER:", req.user);

    if (!table) {
      return res.status(404).json({ msg: "Table not found" });
    }

    if (table.status === "unavailable") {
      return res.status(400).json({ msg: "Table already booked" });
    }

    const addData = await new Order({
      userId: req.user.uId,
      orderId: "Ord" + Date.now(),
      tableId,
      tableNumber,
      items,
      totalAmount,
      status: "preparing",
    });
    const saveData = await addData.save();

    const updateTable = await Table.findByIdAndUpdate(tableId, {
      status: "unavailable",
    });

    res.status(200).json({
      msg: "Order created successfully",
      saveData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// update status

route.put("/:id", async (req, res) => {
  try {
    // const updateData = await Order.find({ _id: req.params.id });
    // console.log("Update Data", updateData[0]);
    const order = await Order.findById(req.params.id);
    // console.log(order);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = "served";
    const dataSave = await order.save();

    const tableUpdate = await Table.findByIdAndUpdate(order.tableId, {
      status: "available",
    });

    console.log(tableUpdate);

    res.status(200).json({
      msg: "Order updated successfully",
      order,
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
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("items.menuId");

    console.log(recentOrder);
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// my-order
route.get("/my-order", Auth, async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.uId,
    }).sort({ createdAt: -1 });

    console.log(orders);

    res.status(200).json({
      orders,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// update status table
route.put("/order-update/:id", Auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ msg: "Status is required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = status;
    await order.save();

    console.log(order.status);

    if (status === "completed") {
      const tableUpdate = await Table.findByIdAndUpdate(
        order.tableId,
        { status: "available" },
        { new: true },
      );

      console.log(tableUpdate);
    }
     if (status === "preparing") {
      const tableUpdate = await Table.findByIdAndUpdate(
        order.tableId,
        { status: "unavailable" },
        { new: true },
      );

      // console.log(tableUpdate);
    }
     if (status === "paid") {
      const tableUpdate = await Table.findByIdAndUpdate(
        order.tableId,
        { status: "available" },
        { new: true },
      );

      // console.log(tableUpdate);
    }
    

    res.status(200).json({
      updateData: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = route;
