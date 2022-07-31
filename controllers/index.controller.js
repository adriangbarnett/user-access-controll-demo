const { ROLE } = require("../config/config.roles.js");
const { USERS } = require("../data.js");
const auth = require("./auth.controller.js");

function home(req, res) {
    return res.send("Home Page");
}

 // // ------------------------------------- MISC PAGES ----------------------------------------
function test() {
    return res.send("you can not see this unless you are authenticated");
}

function dashboard(req, res) {
    return res.send(`Dashboard page, your role is: [${req.user.role}]`);
}

function userPage(req, res) {
    return res.send(`User page, your role is: [${req.user.role}]`);
}

function adminPage(req, res) {
    return res.send(`Admin page, your role is: [${req.user.role}]`);
}

function sysAdminPage(req, res) {
    return res.send(`System Admin page, role: [${req.user.role}]`);
}


// ------------------------------------- PROJECT ITEMS ----------------------------------------
// Create
function createProjectItemPage(req, res) {
    return res.send(`Create project item, role: [${req.user.role}], yourid:[${req.user.id}], projectid: [${req.project.id}]`);
}

// Read
function readProjectItemPage(req, res) {
    return res.send(`Read project item, role: [${req.user.role}], yourid:[${req.user.id}], projectid: [${req.project.id}], itemid: [${req.item.id}]`);
}

// Update
function updateProjectItemPage(req, res) {
    return res.send(`Update project item, page, role: [${req.user.role}], yourid:[${req.user.id}], projectid: [${req.project.id}], itemid: [${req.item.id}]`);
}

// Delete
function deleteProjectItemPage(req, res) {
    return res.send(`Update project item, role: [${req.user.role}], yourid:[${req.user.id}], projectid: [${req.project.id}], itemid: [${req.item.id}]`);
}

// ------------------------------------- PROJECT ----------------------------------------

function createProjectPage(req, res) {
    return res.send(`Create progect page, role: [${req.user.role}]`);
}

function updateProjectPage(req, res) {
    return res.send(`Update project, page, role: [${req.user.role}], yourid:[${req.user.id}], projectid:[${req.project.id}]`);
}
function deleteProjectPage(req, res) {
    return res.send(`Delete project, page, role: [${req.user.role}], yourid:[${req.user.id}], projectid:[${req.project.id}]`);
}

// read project
function readProjectPage(req, res) {
    if (req.query.projectid) {
        const p = auth.findProjectId(req.query.projectid);
        if (!p) {
            return res.send("Project not found by id");
        }
        return res.send({project: p, user: req.user});
    }
    return res.send("Project not found by id");
}


//
module.exports = {

    // misc pages
    userPage,
    adminPage,
    sysAdminPage,
    home,
    test,
    dashboard,

    // project
    readProjectPage,
    createProjectPage,
    updateProjectPage,
    deleteProjectPage,

    // project items
    createProjectItemPage,
    readProjectItemPage,
    updateProjectItemPage,
    deleteProjectItemPage
}