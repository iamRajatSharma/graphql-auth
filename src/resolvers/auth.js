const { loginUser } = require("../controllers/login.controller");
const me = require("../controllers/me.controller");
const { registerUser } = require("../controllers/register.controller");
const User = require("../models/User");

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            return await me(context)
        }
    },
    Mutation: {
        register: async (_, { username, email, password }) => {
            return await registerUser(username, email, password)
        },
        login: async (_, { email, password }) => {
            return await loginUser(email, password)
        },
    }
}


module.exports = resolvers