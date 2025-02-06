import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
      const { name, email, password,phone,role } = req.body;
      if (!name || !email || !password || !phone || !role) {
        return res.status(401).json({
          message: "Something is missing, please check!",
          success: false,
        });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(401).json({
          message: "Try different email",
          success: false,
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role
      });
      return res.status(201).json({
        message: "Account created successfully",
        success: true,
      });
    } catch (error) {
      console.log(error, "register api error");
    }
  };


  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email || password)) {
        return res.status(401).json({
          message: "Something is missing, please check!",
          success: false,
        });
      }
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
  
     
      user = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
  
      const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "20d",
      });
      return res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 10 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: `Welcome back ${user.username}`,
          user,
          token:token,
          success: true,
        });
    } catch (error) {
      console.log(error, "login api error");
    }
  };
  
  export const logout = async(_,res)=>{
      try {
          return res.cookie("token","",{maxAge:0}).json({
              message:'Logged Out successfully',
              success:true
          })
      } catch (error) {
          console.log(error)
      }
  }

  export const getAllUsers = async(req,res)=>{
    const userId = req.id
    try {
      const otherUser = await User.find({_id:{$ne:userId}}).select("_id name email role")

      if(!otherUser || otherUser.length === 0){
        return res.status(400).json({message:"No user currently",success:false})
      }

      return res.status(200).json({message:"All Users",success:true,users:otherUser})

    } catch (error) {
      console.log(error)
      return res.status(500).json({message:"Internal Server Error",success:false})
    }
  }