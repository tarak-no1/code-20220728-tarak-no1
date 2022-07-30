const express = require("express");
const usageRouter = require("./usage-router");

class V1Router {
    constructor() {
        this.router = express.Router();
    }

    v1Routes() {
        this.router.use("/usage", usageRouter.getRouter());
    }

    getRoutes() {
        this.v1Routes();
        return this.router;
    }
}

module.exports = new V1Router();