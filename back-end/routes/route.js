const express = require("express");
const router = express.Router();
const controler = require("../controlars/controler");
const { checkRole } = require("../middleware/checkRole");

router.post("/login", controler.login);
router.get("/roles", checkRole(["Superadmin"]), controler.getRoles);

// Procted routes with role-based access control

router.post(
  "/create-admin",

  checkRole(["Superadmin"]),
  controler.createAdmin
);
router.get(
  "/admins",
  checkRole(["Superadmin"]),
  controler.getAllAdmins
);

router.post(
  "/create-user",
  checkRole(["Admin"]),
  controler.createSuperuserOrUser
);
router.get(
  "/superusers",
  checkRole(["Superadmin", "Admin"]),
  controler.getAllSuperusers
);
router.get(
  "/users",
  checkRole(["Superadmin", "Admin"]),
  controler.getAllUsers
);

module.exports = router;
