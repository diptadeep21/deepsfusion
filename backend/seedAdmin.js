import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import userModel from "./models/userModel.js";


const seedAdmin = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/deepsfusion`);

    console.log("Connected to MongoDB");

    const adminEmail = "admin@deepsfusion.com";
    const adminPassword = "admin123";

    const existingAdmin = await userModel.findOne({
      email: adminEmail,
      role: "admin"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      console.log("Email:", adminEmail);
      console.log("Password:", adminPassword);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await userModel.create({
      name: "Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      cartdata: {}
    });

    console.log("Admin user created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
