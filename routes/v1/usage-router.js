const express = require("express");

const catchErrors = require("../../middlewares/catch-errors");
const multer = require("../../middlewares/multer");
const usageHandler = require("../../handlers/usage-handler");

class UsageRouter {
    constructor() {
        this.router = express.Router();
    }
    usageRoutes() {
        this.router.post(
            "/upload",
            multer.single("userData"),
            catchErrors(usageHandler.uploadUserData)
        );

        this.router.get(
            "/display",
            catchErrors(usageHandler.displayData)
        );
    }
    getRouter() {
        this.usageRoutes();
        return this.router;
    }
}

module.exports = new UsageRouter();