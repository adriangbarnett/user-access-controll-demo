// roles

ROLE = {
    USER: "user",           // basic user
    ADMIN: "admin",         // admin
    SYSADM: "sysadm"        // system admin (full access)
}

// TODO - PERMISSION current not used, 
// i added this as a reminder try and use later
PERMISSION = {
    
    // admin
    user_create: true,
    user_read: true,
    user_update: true,
    user_delete: true,

    // user, admin, systemAdmin
    project_create: true,
    project_read: true,
    project_update: true,
    project_delete: true,
    project_item_create: true,
    project_item_read: true,
    project_item_update: true,
    project_item_delete: true
}


module.exports = {
    ROLE
}