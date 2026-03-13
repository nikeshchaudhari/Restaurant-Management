const express = require("express");
const route = express.Router();
const Table = require("../model/Table");
const mongoose = require("mongoose");
require("dotenv").config();

// add table
route.post("/add-table", async (req, res) => {
  try {
    const addTable = await new Table({
      _id: new mongoose.Types.ObjectId(),
      tableNumber: req.body.tableNumber,
      capacity: req.body.capacity,
      status: req.body.status || "available",
    });

    const data = await addTable.save();
    res.status(200).json({
      addData: data,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// get-All table

route.get("/all-table", async (req, res) => {
  try {
    const allData = await Table.find();
    console.log(allData);
    res.status(200).json({
      allData: allData,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// update or edit

route.put("/:id", async (req, res) => {
  try {
    const update = await Table.find({ _id: req.params.id });
    console.log(update[0]);

    if (!update) {
      return res.status(401).json({
        msg: "Table Not Found....",
      });
    }

    const newData = {
      tableNumber: req.body.tableNumber,
      capacity: req.body.capacity,
      status: req.body.status || "available",
    };

    const updateData = await Table.findByIdAndUpdate(req.params.id, newData, {
      returnDocument: "after",
    });
    res.status(200).json({
      updateData: updateData,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});
// delete table

route.delete("/:id", async (req, res) => {
  try {
    const deleteTable = await Table.find({ _id: req.params.id });
    console.log(deleteTable[0]);

    const deleteData = await Table.findByIdAndDelete(req.params.id)


    res.status(200).json({
      deleteTable: deleteData,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});
module.exports = route;
