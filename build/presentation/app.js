"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const router_1 = require("./router");
class App {
    constructor() {
        this.routerCtrl = new router_1.Routes();
        this.app = express();
        this.config();
    }
    getApp() {
        return this.app;
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, provider, token");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Credentials", "*");
            next();
        });
        this.routerCtrl.setRoutes(this.app);
    }
}
exports.default = new App().getApp();
//# sourceMappingURL=app.js.map