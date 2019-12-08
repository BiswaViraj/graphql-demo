const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// connect to MongoDB
mongoose.connect(
    `mongodb+srv://biswaviraj:${process.env.MONGODB_PASSWORD}@graphql-booklist-sckgo.mongodb.net/test?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
    console.log("connected to DB");
});

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000, () => {
    console.log("listening on port 4000");
});
