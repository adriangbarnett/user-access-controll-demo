// routes
const express = require('express');
const router = express.Router();
module.exports = router;

//
const { ROLE } = require("../config/config.roles.js");
const index = require("../controllers/index.controller.js")
const auth = require("../controllers/auth.controller.js")

//
router.get("/", index.home);
router.get("/test", auth.isAuth, index.test);
router.get("/dashboard", auth.setUser, auth.isAuth, index.dashboard);
router.get("/user", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), index.userPage);
router.get("/admin", auth.setUser, auth.isAuth, auth.authRole(ROLE.ADMIN), index.adminPage);
router.get("/sysadm", auth.setUser, auth.isAuth, auth.authRole(ROLE.SYSADM), index.sysAdminPage);