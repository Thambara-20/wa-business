"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./config/data-source");
const routes_1 = require("./routes/routes");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socketService_1 = require("../src/services/socketService");
data_source_1.AppDataSource.initialize().then(async () => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    // app.use(authenticateToken)
    app.use((0, cookie_parser_1.default)());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        origin: [process.env.FRONT_END_URL, process.env.LAMBDA_URL],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    }));
    const server = (0, http_1.createServer)(app);
    (0, socketService_1.initializeSocketIO)(server);
    routes_1.Routes.forEach((route) => {
        const { method, route: path, controller, action, middleware } = route;
        app[method](path, ...middleware, (req, res, next) => {
            const result = new controller()[action](req, res, next);
            if (result instanceof Promise) {
                result.then((data) => data !== null && data !== undefined ? res.send(data) : undefined);
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    server.listen(process.env.PORT);
    console.log(`Express server has started on port ${process.env.PORT}.`);
});
//# sourceMappingURL=index.js.map