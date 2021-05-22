import { connect, connection } from "mongoose";
import { config } from "dotenv";

/*const {___} = require(<package>) is called Destructuring. 
This makes our code a lot more cleaner. */

/*We'll use module.exports since we want to import this file in our server.js*/

module.exports = () => {
    config(); //invoking the dotenv config here
    const uri = process.env.DB_URL;

    if (uri === undefined) {
        console.log("Improper environment setup");
        return;
    }

    connect(uri, {
        //user: process.env.DB_USER,
        //pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => {
            console.log("Connection estabislished with MongoDB");
        })
        .catch((error) => console.error(error.message));
    connection.on("connected", () => {
        console.log("Mongoose connected to DB Cluster");
    });
    connection.on("error", (error) => {
        console.error(error.message);
    });
    connection.on("disconnected", () => {
        console.log("Mongoose Disconnected");
    });
    process.on("SIGINT", () => {
        connection.close(() => {
            console.log("Mongoose connection closed on Application Timeout");
            process.exit(0);
        });
    });
};
