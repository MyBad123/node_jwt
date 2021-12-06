My first project on Node.js
=================================================

Instructions for launching the application: 

#. Make sure the following development tools are installed::

    npm 
    node --version
    mongo
    
#. Create a project 

    npm init -y
    
#. Install following dependings
   
    npm install bcrypt  express express-graphql graphql jsonwebtoken mongoose --save
    
#. Run the app 

    node index
    
Requests
========

Mutations:

#. Get info(test of access token)

    getInfo(input: {access: String}){username}
    
   username - your username; access - get access token
   
#. Auth user

    createUser(input: { username: String, password: String }) { access refresh }
    
   username - your username; password - your password; access - get access token; refresh - get refresh token 
 
#. Refresh tokens

    getNewToken(input: {refresh: String}) { access refresh }
    
   username - your username; access - get access token; refresh - get refresh token

