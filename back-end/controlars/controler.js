const Users = require("../models/Schema");
const jwt = require("jsonwebtoken");

const getRoles = async (req, res) => {
  try {
    const roles = ["Superadmin", "Admin", "Superuser", "User"];
    res.status(200).json(roles);
  } catch (err) {
    console.log(`Error :${err}`);
    res.status(500).json({ message: "Serever error" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, city, role } = req.body;
    const existingAdmin = await Users.findOne({
      email,
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin  email already exists" });
    }

    const newAdmin = new Users({
      name,
      email,
      phone,
      city,
      role: "Admin",
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin add sucessfully", newAdmin });
  } catch (err) {
    console.log(`there is an error ${err}`);
    res.status(500).json({ message: "server error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Users.find({ role: "Admin" });

    if (admins.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json(admins);
  } catch (err) {
    console.error(`There was an error: ${err}`);
    res.status(500).json({ message: "Server error" });
  }
};

const createSuperuserOrUser = async (req, res) => {
  try {
    const { name, email, phone, city, role } = req.body;
    if (!["Superuser", "User"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User email already exists" });
    }

    const newUser = new Users({
      name,
      email,
      phone,
      city,
      role,
    });

    await newUser.save();
    res.status(200).json({ message: `${role} created successfully`, newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllSuperusers = async (req, res) => {
  try {
    const superusers = await Users.find({ role: "Superuser" });
    res.status(200).json(superusers);
  } catch (err) {
    console.error("Error fetching superusers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({ role: "User" });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { name, email } = req.body;

  const user = await Users.findOne({ email: email });
  if (user.name === name) {
    const jwtToken = jwt.sign({ id: user.id, role: user.role }, "token", {
      expiresIn: "1day",
    });
    return res
      .status(200)
      .json({ token: jwtToken, user, message: "user Login sucess" });
  } else {
    res.status(400).json({ message: "user credentail not matching" });
  }
};

module.exports = {
  createAdmin,
  
  createSuperuserOrUser,
  login,
  getAllAdmins,
  getAllSuperusers,
  getAllUsers,
  getRoles,
};
