const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const userModel = require('./db')

const root = {
    getHello: () => {
        return "Hello"
    },
    createUser: async ({input}) => {
        let b = await userModel.find({
            username: "wow"
        })
        if (b) {
            console.log("error my")
            return null
        }
        
        const user = new userModel({
            username: "wow",
            password: "wow",
            access: "wow",
            refresh: "wow"
        })
        await user.save()

        return null
    },
    
}

const app = express();
app.use('/', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

const start1 = async () => {
    try {
        app.listen(4000, () => {
            mongoose.connect("mongodb://localhost/users")
            console.log("listen");
        })
    }
    catch (e) {
        console.log(e);
    }
};

start1();
