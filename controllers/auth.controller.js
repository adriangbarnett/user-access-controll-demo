// authentication functions
const { Console } = require("console");
const { nextTick } = require("process");
const { ROLE } = require("../config/config.roles.js");
const { USER } = require("../data.js");
const { PROJECT } = require("../data.js");

// set user from url id (user is set as logged in)
function setUser(req, res, next) {
    req.user = findUserById(req.query.id);
    next();
}

// set project from url
function setProject(req, res, next) {
    req.project  = findProjectId(req.query.projectid);
    return next();
}

// set item id from url
function setProjectItem(req, res, next) {
    req.item  = findProjectItemId(req.project, req.query.itemid);
    return next();
}

// is user logged in
function isAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).send("Not authenticated")
    }
    return next();
}

// is user NOT logged it
function isNotAuth(req, res, next) {
    if (!req.user) { return next(); }
    return res.status(401).send("Authenticated")
}

// Authenticate role
function authRole(role) {
    return (req, res, next) => {
        if (req.user.role === ROLE.SYSADM) { return next(); }
        if(role === "user" && req.user.role === ROLE.ADMIN) { return next(); }
        if (req.user.role === role) { return next() }
        return res.status(401).send(`Permission denied, requires role: [${role}], your role is: [${req.user.role}]`);
    }
}

// ------------------------------------- USER ----------------------------------------
// get anmd get user from db by id
function findUserById(id) {
    if (id) { return item = USER.find(item => item.id === id); }
    return null;
}

// ------------------------------------- PROJECT ITEMS ----------------------------------------
// Create
function canCreateProjectItem(req, res, next) {
    
    const p = req.project;
    if (req.user.role === ROLE.SYSADM) { return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (p.ownerid === req.user.id) { return next(); }
    if (p.uac) {
        for (let i=0; i != p.uac.length; i++ ) {
            if(req.user.id === p.uac[i].userid && p.uac[i].createitem === true) { return next(); }
        }
    } 
    return res.status(401).send("Requires permission: [project-item-create]");
}

// Read
function canReadProjectItem(req, res, next) {

    const p = req.project;
    if (req.user.role === ROLE.SYSADM) { return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (p.ownerid === req.user.id) { return next(); }

    if (p.uac) {
        for (let i=0; i != p.uac.length; i++ ) {
            if(req.user.id === p.uac[i].userid && p.uac[i].readitem === true) { return next(); }
        }
    } 
    return res.status(401).send("Requires permission: [project-item-create]");
}

// Update
function canUpdateProjectItem(req, res, next) {
    const p = req.project;
    if (req.user.role === ROLE.SYSADM) { return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (p.ownerid === req.user.id) { return next(); }
    if (p.uac) {
        for (let i=0; i != p.uac.length; i++ ) {
            if(req.user.id === p.uac[i].userid && p.uac[i].updateitem === true) { return next(); }
        }
    } 
    return res.status(401).send("Requires permission: [project-item-update]");
}

// Delete
function canDeleteProjectItem(req, res, next) {
    const p = req.project;
    if (req.user.role === ROLE.SYSADM) { return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (p.ownerid === req.user.id) { return next(); }
    if (p.uac) {
        for (let i=0; i != p.uac.length; i++ ) {
            if(req.user.id === p.uac[i].userid && p.uac[i].deleteitem === true) { return next(); }
        }
    } 
    return res.status(401).send("Requires permission: [project-item-delete]");
}


// ------------------------------------- PROJECT ----------------------------------------
// create project
function canCreateProject(req, res, next) {
    if (req.user.role === ROLE.SYSADM) { return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (req.user.id !== null) { return next(); } 
    return res.status(401).send("Requires permission: [project-create]");
}

// read project
function canReadProject(req, res, next) {
    if (!req.project){ return res.send("Project not set"); }
    const p = req.project;
    if (!p){ return res.send("Project not found by id"); }
    if (req.user.role === ROLE.SYSADM) { return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (p.ownerid === req.user.id) { return next(); } 

    // UAC check if the user was granted special access and permission
    if (p.uac) {
        for (let i=0; i != p.uac.length; i++ ) {
            if(req.user.id === p.uac[i].userid && p.uac[i].read === true) { req.project = p; return next(); }
        }
    } 
    return res.status(401).send("Requires permission: [project-read]");
 }


// update project
function canUpdateProject(req, res, next) {
    if (!req.project){ return res.send("Project not set"); }
    const p = req.project;
    if (req.user.role === ROLE.SYSADM) {req.project = p;  return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (p.ownerid === req.user.id) { req.project = p; return next(); } 

    // UAC check if the user was granted indivisual access and permission
    if (p.uac) {
        for (let i=0; i != p.uac.length; i++ ) {
            if(req.user.id === p.uac[i].userid && p.uac[i].update === true) { req.project = p;  return next(); }
        }
    }

    return res.status(401).send("Requires permission: [project update]");  
}

// Delete project
function canDeleteProject(req, res, next) {
    if (!req.project){ return res.send("Project not set"); }
    const p = findProjectId(req.query.projectid);
    if (req.user.role === ROLE.SYSADM) {req.project = p;   return next(); }
    if (req.user.role === ROLE.ADMIN) { return next(); }
    if (p.ownerid === req.user.id) { req.project = p;   return next(); }

    // UAC check if the user was granted indivisual access and permission
    if (p.uac) {
        for (let i=0; i != p.uac.length; i++ ) {
            if(req.user.id === p.uac[i].userid && p.uac[i].delete === true) { req.project = p;   return next(); }
        }
    }
    return res.status(401).send("Requires permission: [project delete]");
}

// fidn and get project from db by id
function findProjectId(id) {
    if (id) { return item = PROJECT.find(item => item.id === id); }
    return null;
}

// find item within a project
function findProjectItemId(project, id) {
    if (!project || id == null) { return null ;}
    if (project.items) {
        if (project.items && id) { 
            return item = project.items.find(item => item.id === id); 
        }
    }
}

//
module.exports = {
    isAuth,
    setUser,
    isNotAuth,
    authRole,
    findUserById,

    // project
    setProject,
    findProjectId,
    canCreateProject,
    canReadProject,
    canUpdateProject,
    canDeleteProject,
   
    // Project item
    canCreateProjectItem,
    canReadProjectItem,
    canUpdateProjectItem,
    canDeleteProjectItem,
    setProjectItem,

}