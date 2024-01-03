const request = require("supertest");
const app = require("./app");

describe("Success Test Cases -> GET /v1/fiat", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/v1/fiat").send();
        expect(response.statusCode).toBe(200);
    });

    test("should specify json in the content type header", async () => {
        const response = await request(app).get("/v1/fiat").send();
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
    test("should have array length greater than zero", async () => {
        const response = await request(app).get("/v1/fiat").send();
        expect(response.body.data?.data?.length).toBeGreaterThan(0);
    });

    test("should have property name and symbol", async () => {
        const response = await request(app).get("/v1/fiat").send();
        expect(response.body.data?.data.every(item => item.hasOwnProperty('name'))).toBe(true);
        expect(response.body.data?.data.every(item => item.hasOwnProperty('symbol'))).toBe(true);
    });
});



describe("Success Test Cases -> GET /v1/cryptocurrency", () => {

    const api = "/v1/cryptocurrency";

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get(api).send();
        expect(response.statusCode).toBe(200);
    });

    test("should specify json in the content type header", async () => {
        const response = await request(app).get(api).send();
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

    });
    test("should have array length greater than zero", async () => {
        const response = await request(app).get(api).send();
        expect(response.body.data?.data?.length).toBeGreaterThan(0);
    });

    test("should have property name and symbol", async () => {
        const response = await request(app).get(api).send();
        expect(response.body.data?.data.every(item => item.hasOwnProperty('name'))).toBe(true);
        expect(response.body.data?.data.every(item => item.hasOwnProperty('symbol'))).toBe(true);
    });
});


describe("Success Test Cases -> GET /v1/conversion", () => {

    const api = "/v1/conversion?source=BTC&amount=2&target=INR";

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get(api).send();
        expect(response.statusCode).toBe(200);
    });

    test("should specify json in the content type header", async () => {
        const response = await request(app).get(api).send();
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

    });

    test("should have property amount, source, target, total", async () => {
        const response = await request(app).get(api).send();
        expect(response.body.data.data).toHaveProperty('amount');
        expect(response.body.data.data).toHaveProperty('source');
        expect(response.body.data.data).toHaveProperty('target');
        expect(response.body.data.data).toHaveProperty('total');
    });
});

describe("Failing Test Cases -> GET /v1/conversion", () => {

    describe("Invalid source", () => {
        let api = "/v1/conversion?source=BTCi&amount=2&target=INR";

        test("should respond with a 400 status code", async () => {
            const response = await request(app).get(api).send();
            expect(response.statusCode).toBe(400);
        });

        test("should specify json in the content type header", async () => {
            const response = await request(app).get(api).send();
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

        });

        test("should have message property", async () => {
            const response = await request(app).get(api).send();
            expect(response.body.data).toHaveProperty('message');
        });
    })

    describe("Invalid amount", () => {

        let api = "/v1/conversion?source=BTC&amount=notnumber&target=INR";

        test("should respond with a 400 status code", async () => {
            const response = await request(app).get(api).send();
            expect(response.statusCode).toBe(400);
        });

        test("should specify json in the content type header", async () => {
            const response = await request(app).get(api).send();
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

        });

        test("should have message property", async () => {
            const response = await request(app).get(api).send();
            expect(response.body.data).toHaveProperty('message');
        });
    });


    describe("Invalid target", () => {

        let api = "/v1/conversion?source=BTC&amount=2&target=INRi";

        test("should respond with a 400 status code", async () => {
            const response = await request(app).get(api).send();
            expect(response.statusCode).toBe(400);
        });

        test("should specify json in the content type header", async () => {
            const response = await request(app).get(api).send();
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

        });

        test("should have message property", async () => {
            const response = await request(app).get(api).send();
        });
    });

});