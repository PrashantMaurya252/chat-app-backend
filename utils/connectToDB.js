import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://chatUser:Gojo885@cluster0.7mk2cyi.mongodb.net/assignment-message-app?retryWrites=true&w=majority&appName=Cluster0");
    console.log("connected to database successfully");
  } catch (error) {
    console.log("database connection error");
  }
};
