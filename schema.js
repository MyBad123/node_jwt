const {buildSchema} = require('graphql');
const { connect } = require('mongoose');

const chema = buildSchema(`
    type User {
        username: String
        password: String
    }

    type UserTokens {
        access: String
        refresh: String
    }

    input UserRegister {
        username: String
        password: String
    }

    input UserAccess {
        access: String
    }

    input UserRefresh {
        refresh: String
    }

    type Query {
        getHello: String
    }

    type Mutation {
        createUser(input: UserRegister): UserTokens
        getInfo(input: UserAccess): User
        getNewToken(input: UserRefresh): UserTokens
    }   
    
`);

module.exports = chema;