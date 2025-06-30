const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/auth");

const app = express();

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || "";
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    return { userId: decoded.userId };
                } catch (err) {
                    console.error("Invalid token");
                }
            }
            return {};
        },
    });

    await server.start();
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();
