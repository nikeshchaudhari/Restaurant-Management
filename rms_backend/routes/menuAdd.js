const express = require("express");
const route = express.Router();
const Menu = require("../model/Menu");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Auth = require("../middleware/Auth");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// menu-added
route.post("/add-menu",Auth, async (req, res) => {
  try {

    if(!req.files && !req.files.photo){
      return res.status(400).json({
        msg:"Photo is required"
      })
    }

const photo = req.files.photo

// photo type check
const allowedType = ["image/jpeg","imahe/png","image/jpg"];

if(!allowedType.includes(photo.mimetype)){
  return res.status(400).json({
    msg:"Only Jpeg,Png & Jpg"
  })
}

// photo size

const maxSize = 2*1024*1024;

if(photo.size>maxSize){
  return res.status(400).json({
     msg: "Image size must be less than 2MB"
  })
}

    const uploadPhoto = await cloudinary.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "menu_image",
      },
    );

    console.log(uploadPhoto);

    const addMenu = new Menu({
      _id: new mongoose.Types.ObjectId(),
      menuName: req.body.menuName,
      price: req.body.price,
      category: req.body.category,
      available:req.body.available,
      description: req.body.description,
      imageId: uploadPhoto.public_id,
      imageUrl: uploadPhoto.secure_url,
    });

    const menuAdd = await addMenu.save();

    res.status(200).json({
      menu: menuAdd,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// get all menu

route.get("/all-menu", async (req, res) => {
  try {
    const allMenu = await Menu.find();
    console.log(allMenu);
    res.status(200).json({
      allMenu: allMenu,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// update menu

route.put("/:id", async (req, res) => {
  try {
    const menu = await Menu.find({ _id: req.params.id });
    console.log(menu);

    if (req.files && req.files.photo) {
      await cloudinary.uploader.destroy(menu[0].imageId);

      const updateMenu = await cloudinary.uploader.upload(
        req.files.photo.tempFilePath,
        {
          folder: "menu_image",
        },
      );

      const newData = {
        menuName: req.body.menuName,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        imageId: updateMenu.public_id,
        imageUrl: updateMenu.secure_url,
      };
      const findData = await Menu.findByIdAndUpdate(req.params.id, newData, {
        returnDocument: "after",
      });

      res.status(400).json({
        updateData: findData,
      });
    }
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});


// delete menu

route.delete("/:id", async (req, res) => {
  try {
    const deleteData = await Menu.find({ _id: req.params.id });
    console.log(deleteData[0]);

    await cloudinary.uploader.destroy(deleteData[0].imageId);
    const dataDelete = await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({
      deleteData: dataDelete,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});
module.exports = route;
