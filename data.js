// simulate local database of users

const { ROLE } = require("./config/config.roles.js");


USER = [

    {
        username: "bobUser",
        id: "1",
        role: "user"
    },
    {
        username: "bobAdmin",  
        id: "2",
        role: "admin"
    },
    {
        username: "bobSystemAdmin",
        id: "3",
        role: "sysadm"
    }

]



module.exports = {
    USER
}