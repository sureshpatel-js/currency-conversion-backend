const express = require("express");
const app = express();
const cors = require("cors");
const currencyRoute = require("./routers/currencyRoute");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/v1", currencyRoute);

//Testing URL
app.get("/hello", (req, res, next) => {
    res.status(200).json({
        starus: "success",
        data: {
            message: "Hello from Server!"
        }
    })
});
//Error Handling
app.use((err, req, res, next) => {
    const { status, message } = err;
    res.status(status).json({
        status: "error",
        data: {
            message: message,
        }
    });
});

module.exports = app;

