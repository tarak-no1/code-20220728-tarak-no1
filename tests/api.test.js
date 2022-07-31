require("dotenv").config();
const supertest = require("supertest");
const server = require("../server");

const app = server.startTheServer();
const request = supertest(app);

describe("API Check", () => {
    it('data exists check', async () => {
        const response = await request.get("/api/v1/usage/display");

        expect(response.status).toBe(200);
        expect(response.body.data).not.toHaveLength(0);
    });

    // it('data not exists check', async () => {
    //     const response = await request.get("/api/v1/usage/display");

    //     expect(response.status).toBe(200);
    //     expect(response.body.data).toHaveLength(0);
    // });
});