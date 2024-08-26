const express = require("express");
const userCtrl = require("../controller/user");

const router = express.Router();

//! Register
router.post("/api/users/register", userCtrl.register);

router.post("/api/users/login", userCtrl.login);

router.get("/api/users/profile", userCtrl.profile);

module.exports = router;
