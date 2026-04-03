const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  email:{type:String,required:true,unique:true},
  logo: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
},{timestamps:true});


module.exports = mongoose.model("restaurants",restaurantSchema)