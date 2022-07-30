const express = require("express");
const http = require("http");
const Routes = require("./routes");

const AppConfig = require("./config/app-config");

class Server {
    constructor() {
        this.app = express();
        this.http = http.Server(this.app);
    }

    appConfig() {
        new AppConfig(this.app).includeConfig();
    }

    includeRoutes() {
        new Routes(this.app).includeRoutes();
    }

    startTheServer() {
        this.appConfig();
        this.includeRoutes();

        const host = process.env.NODE_SERVER_HOST || "0.0.0.0";
        const port = process.env.NODE_SERVER_PORT || 3030;
        this.app.set("host", host);
        this.app.set("port", port);

        this.http.listen(port);

        this.http.on("listening", () => {
            const addr = this.http.address();
            const bind = typeof addr === "string"
                ? `pipe ${  addr }`
                : `port ${  addr.port }`;
            console.log(`Listening on ${ bind }`);
        });

        this.http.on("error", (error) => {
            if (error.syscall !== "listen") {
                throw error;
            }

            const bind = typeof port === "string"
                ? `Pipe ${ port }`
                : `Port ${ port }`;

            switch (error.code) {
                case "EACCES":
                    console.log(`${ bind } requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    console.log(`${ bind } is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
    }
}

module.exports = new Server();