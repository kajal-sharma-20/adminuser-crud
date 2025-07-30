import express from "express";
import  {deleteuser, getall, getone, signup, update,userlogin, userlogout}  from "../controller/usercontroller.js";
import { adminlogin, adminlogout} from "../controller/admincontroller.js";
import { verifyAdminToken, verifyUserToken } from "../controller/authcontroller.js";
const route=express.Router();
route.get("/getall",getall)
route.get("/getone/:id",getone)
route.put("/update/:id",update)
route.delete("/delete/:id",deleteuser)
route.post("/adminlogin",adminlogin)
route.post("/userlogin",userlogin)
route.post("/signup",signup)
route.get("/userlogout",userlogout)
route.get("/adminlogout",adminlogout)
route.post("/verify-admin-token", verifyAdminToken);
route.post("/verify-user-token", verifyUserToken);
export default route