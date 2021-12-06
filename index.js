const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const userModel = require('./db')
const jwt = require('jsonwebtoken');
const { find } = require('./db');


const root = {
    getHello: () => {
        return "Hello"
    },
    createUser: async ({input}) => {
        let b = await userModel.find({username: input.username})
        
        if (b.length > 0) {
            return null
        }
        
        const user = new userModel({
            username: input.username,
            password: input.password,
            access: jwt.sign(
                {
                    username: input.username
                },
                '1234567890',
                {
                    expiresIn: 600
                }
            ),
            refresh: jwt.sign(
                {
                    username: input.username
                },
                '1234567890',
                {
                    expiresIn: '24h'
                }
            )
        })
        await user.save()

        return {access: user.access, refresh: user.refresh}
    },
    getInfo: async ({input}) => {
        let token
        try {
            token = jwt.verify(input.access, '1234567890')
        } catch {
            console.log(321)
            return null
        }
        let b = await userModel.find({
            username: token.username, 
            access: input.access
        })
        if (b.length === 0) {
            console.log('123')
            return null
        }
        
        return {username: b[0].username}
    },
    getNewToken: async ({input}) => {
        let token 
        try {
            token = jwt.verify(input.refresh, '1234567890')
        } catch {
            console.log(321)
            return null
        }

        let b = await userModel.find({
            username: token.username, 
            refresh: input.refresh
        })
        if (b.length === 0) {
            console.log('123')
            return null
        }
        await userModel.updateMany({username: token.username}, {
            $set: {
                access: jwt.sign({
                    username: token.username
                },
                '1234567890',
                {
                    expiresIn: 600
                }),
                refresh: jwt.sign({
                    username: token.username
                },
                '1234567890',
                {
                    expiresIn: '24h'
                })
            }
        })
        console.log(token)
        let user = await userModel.find({username: token.username})
        console.log(user)
        
        return ({access: user[0].access, refresh: user[0].refresh})
    }
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
