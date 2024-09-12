const Employee = require("../models/Schema");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const createDefaultSuperadmin = async () => {
  try {
    const existingSuperadmin = await Employee.findOne({
      email: "superadmin@example.com",
    });
    if (existingSuperadmin) {
      console.log("Superadmin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("superadmin123", 10);
    const superadmin = new Employee({
      name: "Superadmin",
      email: "superadmin@example.com",
      phone: 1234567890,
      city: "Admin City",
      role: "Superadmin",
      password: hashedPassword,
    });

    await superadmin.save();
    console.log("Default admin user created successfully");
  } catch (err) {
    console.error("Error creating default admin user:", err);
  }
};

module.exports = { createDefaultSuperadmin };
