const axios = require("axios");
const AppError = require("../utils/errorHandling/AppError");
const { INTERNAL_SERVER_ERROR } = require("../constants/error");
const { validateConversionQuery } = require("../validate/validateQuery");
exports.getFiat = async (req, res, next) => {
    try {

        //CoinMarketCap Api
        const api = "https://pro-api.coinmarketcap.com/v1/fiat/map";
        const headers = {
            "X-CMC_PRO_API_KEY": process.env.X_CMC_PRO_API_KEY
        }
        const result = await axios.get(api, { headers });
        res.status(200).json({
            status: "success",
            data: {
                data: result?.data?.data
            }
        })
    } catch (error) {
        next(new AppError(500, INTERNAL_SERVER_ERROR));
    }
};

exports.getCryptocurrency = async (req, res, next) => {
    try {

        //CoinMarketCap Api
        const api = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=100";
        const headers = {
            "X-CMC_PRO_API_KEY": process.env.X_CMC_PRO_API_KEY
        }
        const result = await axios.get(api, { headers });
        res.status(200).json({
            status: "success",
            data: {
                data: result?.data?.data
            }
        })
    } catch (error) {
        next(new AppError(500, INTERNAL_SERVER_ERROR));
    }
};

exports.getConversion = async (req, res, next) => {
    try {
        //Validate Query
        const value = await validateConversionQuery(req.query);
        if (!value.status) {
            return next(new AppError(400, value.message));
        }
        const { source, amount, target } = req.query;

        //CoinMarketCap Api
        const api = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100&convert=${target}`;
        const headers = {
            "X-CMC_PRO_API_KEY": process.env.X_CMC_PRO_API_KEY
        }
        //Api call to get conversion for 1 unit to target
        const result = await axios.get(api, { headers });

        const { data } = result?.data;
        const currencyObj = data.find(el => el.symbol == source);

        if (!currencyObj) {
            return next(new AppError(400, `Invalid source value`));
        }

        const { price } = currencyObj?.quote[target];
        //Conversion for n unit to target
        let total = (amount * 1) * price;
        total = (total.toFixed(2)) * 1;

        res.status(200).json({
            status: "success",
            data: {
                data: {
                    source,
                    amount,
                    target,
                    total
                }
            }
        })

    } catch (error) {
        const { error_code, error_message } = error?.response?.data?.status;
        next(new AppError(error_code, error_message));
    }

}; 