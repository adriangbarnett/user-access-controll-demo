# User Access Control demo

## Roles:
user:           a basic user role
admin           admin role to manage users
system admin    full control to everything

## Permissions
Non authenticated user can access page: home
Any authenticated user can access page: Dashboard
Authenticated User role can access pages: user
Authenticated Admin role can access pages: user, admin
Authenticated System Admin role can access pages: user, admin, sysadm

## Files:


### ./config/roles.config.js
contains a list of role names

### ./contollers/auth.contoller.js
contains authentication functions

### ./contollers/index.contoller.js
if authentication is successful via the router, then the request is passed to this controller to perform addtional steps

### ./routes/router.js
contains list of available routes, some routes are gated by authentication checks






### ./data.js
contains a list of users to simulate a database





## Testing the requests
Using ./test.requests.rest change the id on the URL to 1,2 or 3 to test each role trying to access pages that require different access levels.

