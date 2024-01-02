const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currencyController");
router
    .route("/fiat")
    .get(currencyController.getFiat);

router
    .route("/cryptocurrency")
    .get(currencyController.getCryptocurrency);

router
    .route("/conversion")
    .get(currencyController.getConversion);

module.exports = router;    