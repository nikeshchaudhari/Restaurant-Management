const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Restaurant = require("../model/Restaurant");
const Auth = require("../middleware/Auth")
route.post("/add-res", Auth,async (req, res) => {
  try {
    const addRestaurant = await new Restaurant({
      name: req.body.name,
      address: req.body.address,
      createdBy: req.user.id,
    });

    const saved = await addRestaurant.save();
    res.status(200).json(saved)
  } catch (err) {
    console.log("error");
  }
});

module.exports = route;
