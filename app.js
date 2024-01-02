const express = require("express");
const app = express();
const cors = require("cors");
const currencyRoute = require("./routers/currencyRoute");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/v1", currencyRoute);

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

