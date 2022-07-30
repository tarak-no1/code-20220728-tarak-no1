const RouteHandler = require("../handlers/route-handler");

const V1Router = require("./v1/");

class Routes {
    constructor(app) {
        this.app = app;
    }

    includeRoutes() {
        this.app.get("/", RouteHandler.defaultPathHandler);
        this.app.get("/api/", RouteHandler.defaultPathHandler);
		this.app.use("/api/v1/", V1Router.getRoutes());

		this.app.use("*", RouteHandler.routeNotFoundHandler);
		this.app.use(RouteHandler.errorHandler);
    }
}

module.exports = Routes;