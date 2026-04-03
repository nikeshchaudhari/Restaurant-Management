const express = require("express");
const route = express.Router();
const User = require("../model/Users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const Auth = require("../middleware/Auth");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// create_admin

route.post("/admin", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user);

    if (user.length > 0) {
      return res.status(401).json({
        msg: "Email already regsiter...",
      });
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const createAdmin = new User({
      _id: new mongoose.Types.ObjectId(),
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      role: "admin",
     
    });
    const admin = await createAdmin.save();

    res.status(200).json({
      msg: "Admin successfully Added...",
      _id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role:admin.role,
      
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});
// post_user_data

route.post("/add-user", async (req, res) => {
  try {
    let ImageId = "";
    let ImageUrl = "https://freesvg.org/img/abstract-user-flat-4.png";
    let uploadPhoto = null;
    // check mail

    const user = await User.find({ email: req.body.email });
 

    if (user.length > 0) {
      return res.status(500).json({
        msg: "email already register..",
      });
    }

    // if(req.user.role !=="admin"){
    //   return res.status(401).json({
    //     msg:"Only admin user add"
    //   })
    // }

    if ( req.files?.photo) {
     const  uploadPhoto = await cloudinary.uploader.upload(
        req.files.photo.tempFilePath,
        {
          folder: "rms_user",
        },
      );

      ImageId = uploadPhoto.public_id;
      ImageUrl = uploadPhoto.secure_url;
    }

    // console.log("upload folder", uploadPhoto);

    const hash = await bcrypt.hash(req.body.password, 10);

    const addUser = new User({
      _id: new mongoose.Types.ObjectId(),
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      role: req.body.role || "waiter",
      ImageId: ImageId,
      ImageUrl: ImageUrl,
      createdBy: new mongoose.Types.ObjectId(req.user?.uId || null),
    });

    // User-Add & save

     const userAdd = await addUser.save();

    res.status(200).json({
      msg: "Data Add Successfully...",
      AddData: userAdd,
    });
  } catch (err) {
    console.log("Somthing wrong..");
    res.status(400).json({
      error: err,
    });
  }
});

// get user or login

route.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    // console.log(user[0]);

    if (user.length === 0) {
      return res.status(401).json({
        msg: "user not found...",
      });
    }

    // verify

    const isMatch = await bcrypt.compare(req.body.password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid Password",
      });
    }

    const token = await jwt.sign(
      {
        uId: user[0].id,
        fullName: user[0].fullName,
        email: user[0].email,
        role: user[0].role,
        // resturantId :user[0].restaurantId
        imageUrl:user[0].ImageUrl
      },
      "rmskey",
      {
        expiresIn: "365d",
      },
    );

    console.log(token);

    res.status(200).json({
      uId: user[0]._id,
      fullName: user[0].fullName,
      email: user[0].email,
      role: user[0].role,
      imageUrl:user[0].ImageUrl,
      token: token,
    });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      error: err,
    });
  }
});

// all get admin only add user

route.get("/users", Auth, async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verifyToken = await jwt.verify(token, "rmskey");

    const allUsers = await User.find({ createdBy: verifyToken.uId });
    console.log(allUsers);

    res.status(200).json({
      msg: allUsers,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// get all data

route.get("/all-user", async (req, res) => {
  try {
    const allData = await User.find();
    res.json(allData);
    // res.status(200).json({
    //   msg: allData,
    // });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// update or edit data

route.put("/:id", Auth, async (req, res) => {
  try {
   
      
    const user = await User.find({ _id: req.params.id });
    console.log(user[0]);

    let ImageId = user[0].ImageId;
    let ImageUrl = user[0].ImageUrl;

    if (req.user.role !== "admin") {
      return res.status(401).json({
        msg: "Only admin can edid or update",
      });
    }
    if (req.files && req.files.photo) {
      if (user[0].ImageId) {
        await cloudinary.uploader.destroy(user[0].ImageId);
      }
      const update = await cloudinary.uploader.upload(
        req.files.photo.tempFilePath,
        {
          folder: `rms_photo`,
        },
      );
      ImageId = update.public_id;
      ImageUrl = update.secure_url;
    }
    const hash = await bcrypt.hash(req.body.password, 10);

    const newData = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      role: req.body.role,
      ImageId,
      ImageUrl,
    };

    const findUpdate = await User.findByIdAndUpdate(req.params.id, newData, {
      returnDocument: "after",
    });

    res.status(200).json({
      updateData: findUpdate,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

// delete user

route.delete("/:id",Auth, async (req, res) => {
  try {
    const deleteUser = await User.find({ _id: req.params.id });
    console.log(deleteUser[0]);

   if(deleteUser.ImageId){
     await cloudinary.uploader.destroy(deleteUser[0].ImageId);
   }
    const deleteData = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      deleteUser: deleteData,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});

//user-profile

route.get("/profile",Auth,async(req,res)=>{
  try{
   const userId = req.uId
    
    

  }catch(err){
    console.log("error");
    res.status(400).json({
      error:err
    })
    
  }

})

module.exports = route;
