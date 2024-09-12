const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: false,
  },
  city: {
    type: String,
  },
 

  role: {
    type: String,
    enum: ['Superadmin', 'Admin', 'Superuser', 'User'],
    default: "User",
  },
});

module.exports = mongoose.model("Users", Schema);
