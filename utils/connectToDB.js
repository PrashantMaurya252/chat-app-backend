import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("database connection error");
  }
};
