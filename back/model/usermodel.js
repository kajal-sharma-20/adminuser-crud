import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userschema = new mongoose.Schema({
  fname: {
    type: String, 
    required: true,
  },
  lname: {
    type: String, 
    required: true,
  },
  email: {
    type: String, 
    unique: true, 
    required: true,
  },
  password: {
    type: String, 
    required: true,
  },
});

userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
export default mongoose.model("user", userschema);
