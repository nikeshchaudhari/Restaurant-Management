// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth =async (req, res, next) => {
  try {
const token = await req.headers.authorization.split(" ")[1] 
// console.log(token);
const verifyToken = await jwt.verify(token,"rmskey")
// console.log(verifyToken);
console.log("token verify__middleware ");

req.user= verifyToken;
// console.log(req.user);


next();

  } catch (err) {
    console.log("Auth error only admin add data");
    res.status(403).json({ msg: "Invalid token" });
  }
};

module.exports = auth;