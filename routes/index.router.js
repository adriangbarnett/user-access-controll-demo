// routes
const express = require('express');
const router = express.Router();
module.exports = router;

//
const { ROLE } = require("../config/config.roles.js");
const index = require("../controllers/index.controller.js")
const auth = require("../controllers/auth.controller.js")



// router.get("*", (req, res, next) => {
//     console.log("RUN ONCE");
//     return next();
// });


// TODO: Remeber to REMOVE set user middleware from router in production
//
router.get("/", index.home);
router.get("/test", auth.isAuth, index.test);
router.get("/dashboard", auth.setUser, auth.isAuth, index.dashboard);
router.get("/user", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), index.userPage);
router.get("/admin", auth.setUser, auth.isAuth, auth.authRole(ROLE.ADMIN), index.adminPage);
router.get("/sysadm", auth.setUser, auth.isAuth, auth.authRole(ROLE.SYSADM), index.sysAdminPage);

// project
router.get("/project-create", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.canCreateProject, index.createProjectPage);
router.get("/project-read", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.canReadProject, index.readProjectPage);
router.get("/project-update", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.canReadProject, auth.canUpdateProject, index.updateProjectPage);
router.get("/project-delete", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.canReadProject, auth.canDeleteProject, index.deleteProjectPage);

// project items
router.get("/project-item-create", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.canReadProject, auth.canUpdateProject, auth.canCreateProjectItem, index.createProjectItemPage);
router.get("/project-item-read", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.setProjectItem, auth.canReadProject, index.readProjectItemPage);
router.get("/project-item-update", auth.setUser, auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.setProjectItem, auth.canReadProject, auth.canReadProjectItem, auth.canUpdateProjectItem, auth.setProjectItem, index.updateProjectItemPage);
router.get("/project-item-delete",  auth.setUser,auth.isAuth, auth.authRole(ROLE.USER), auth.setProject, auth.setProjectItem, auth.canReadProject, auth.canDeleteProjectItem, index.deleteProjectItemPage);