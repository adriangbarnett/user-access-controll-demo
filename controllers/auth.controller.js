// authentication functions
const { nextTick } = require("process");
const { USER }  = require("../data.js");
const { ROLE }  = require("../config/config.roles.js");

// login
function setUser(req, res, next) {

    const id = req.query.id;

    if (id) {
        const u = findUserById(id);
        if (u) {
            console.log({action: "SET USER", user: u})
            req.user = u;
        }
        // Set user failed: id not found

    }
    // Set user failed: missing id
    return next();
}



// is user logged in
function isAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).send("Not autnenticated")
    }
    next();
}

// Authenticate role
function authRole(role) {
    return (req, res, next) => {

        // System Admin  override all
        if (req.user.role === ROLE.SYSADM) { return next(); }

        // Admin overide user
        if(role === "user" && req.user.role === ROLE.ADMIN) { return next(); }

        // Check role
        if (req.user.role !== role) {
            return res.status(401).send(`Permission denied, requires role: [${role}], your role is: [${req.user.role}]`);
        }
        return next();
    }
}

// get user from db
function findUserById(id) {
    if (id) {
        return  item = USER.find(item => item.id === id);
    }
    console.log("User not found by id");
    return null;
}

module.exports = {
    setUser,
    isAuth,
    authRole,
}