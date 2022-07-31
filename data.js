// simulate local database of users, projects with items

USER = [
    {
        username: "user1",
        id: "1",
        role: "user"
    },
    {
        username: "user2",  
        id: "2",
        role: "user"
    },
    {
        username: "user3",
        id: "3",
        role: "user"
    },
    {
        username: "admin1",
        id: "4",
        role: "admin"
    },
    {
        username: "sysadm1",
        id: "5",
        role: "sysadm"
    },
],

PROJECT = [
    
    // project 1
    {
        id: "1",
        name: "project1",
        ownerid: "1",
        createon: "",
        createdby: "",
        updatedon: "",
        updatedby: "",
        uac: [
            {
                userid: "2",
                read: true,
                update: true,
                delete: true,
                createitem: true,
                readitem: true,
                updateitem: true,
                deleteitem: true
            },
            {
                userid: "3",
                read: true,
                update: false,
                delete: false,
                createitem: false,
                readitem: true,
                updateitem: false,
                deleteitem: false
            },
        ],
        
        items: [
            { 
                id: "1",
                name: "project1-item1",
                ownerid: "1",
                createon: "",
                createdby: "",
                updatedon: "",
                updatedby: ""
            },
            { 
                id: "2",
                name: "project1-item2",
                ownerid: "1",
                createon: "",
                createdby: "",
                updatedon: "",
                updatedby: ""
            }
        ]
    },

    // project 2
    {
        id: "2",
        name: "project2",
        ownerid: "2",
        createon: "",
        createdby: "",
        updatedon: "",
        updatedby: "",
        uac: [],
        items: [
            { 
                id: "1",
                name: "project2-item1",
                ownerid: "2",
                createon: "",
                createdby: "",
                updatedon: "",
                updatedby: ""
            }
        ]
    }
]

module.exports = {
    USER,
    PROJECT
}