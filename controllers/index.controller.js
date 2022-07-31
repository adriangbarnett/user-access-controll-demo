const { ROLE } = require("../config/config.roles.js");
const { USERS } = require("../data.js");


function home(req, res) {
    return res.send("Home Page");
}


function test() {
    return res.send("you can not see this unless you are authenticated");
}


function dashboard(req, res) {
    return res.send(`Dashboard page, you role is: [${req.user.role}]`);
}

function userPage(req, res) {
    return res.send(`User page, you role is: [${req.user.role}]`);
}

function adminPage(req, res) {
    return res.send(`Admin page, you role is: [${req.user.role}]`);
}

function sysAdminPage(req, res) {
    return res.send(`System Admin page, you role is: [${req.user.role}]`);
}

module.exports = {
    userPage,
    adminPage,
    sysAdminPage,
    home,
    test,
    dashboard
}