import user from "../model/usermodel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
//fetch all users
export const getall=async(req,res)=>{
    try{
       const userdata=await user.find()
       if(!userdata){
        return res.status(404).json({msg:"user data not found"})
       }
       res.status(200).json(userdata)
    }
    catch(error){
       res.status(500).json({error})
    }
}

//particular record through id
export const getone = async (req, res) => {
  const { id } = req.params;

  try {
    const User = await user.findById(id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

   
    res.json({
      email: User.email,
      fname: User.fname,
      lname: User.lname,
      password:User.password, 
    });
  } catch (error) {
    console.error("Fetch User Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//update user
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...otherFields } = req.body;

    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    let updatedFields = { ...otherFields };

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.findByIdAndUpdate(id, updatedFields, { new: true });
    return res.status(200).json({ msg: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};



//delete user
export const deleteuser=async(req,res)=>{
    try{
       const id=req.params.id
       const userexist=await user.findById(id)
       if(!userexist){
          return res.status(404).json({msg:"user not exist"})
       }
       await user.findByIdAndDelete(id)
       res.status(200).json({msg:"user deleted successfully"})
    }
    catch(error){
        res.status(500).json({error})
    }
}

//userlogin


export const userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.findOne({ email });
    if (!User) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password.toString(), User.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: User._id, email: User.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Clear admintoken to prevent overlap
    res.clearCookie("admintoken", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
    });

    // Set usertoken cookie
    res.cookie("usertoken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    // Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: User._id,
        email: User.email,
        firstName: User.fname,
        lastName: User.lname,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


 //sign up 
 export const signup = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!email || !password || !fname || !lname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // No manual hashing here
    const newUser = new user({ fname, lname, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//logout


export const userlogout = (req, res) => {
  res.clearCookie("usertoken", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });
  return res.status(200).json({ message: "User logged out successfully" });
};
