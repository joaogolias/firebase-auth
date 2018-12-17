"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_login_1 = require("./endpoints/firebase-login");
const firebase_signup_1 = require("./endpoints/firebase-signup");
const context_1 = require("../context");
const send_reset_password_email_1 = require("./endpoints/send-reset-password-email");
const authenticate_1 = require("./endpoints/authenticate");
const sign_out_1 = require("./endpoints/sign-out");
const change_password_1 = require("./endpoints/change-password");
const banUser_1 = require("./endpoints/banUser");
const unbanUser_1 = require("./endpoints/unbanUser");
const delete_user_1 = require("./endpoints/delete-user");
class Routes {
    setRoutes(app) {
        app.route('/firebase/signin').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body) {
                    throw new Error('Missing Body');
                }
                const result = yield firebase_login_1.SigninHandler(req.body, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/signup').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body) {
                    throw new Error('Missing Body');
                }
                const result = yield firebase_signup_1.SignUpHandler(req.body, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/reset-password-email').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req.query && req.query['email'])) {
                    throw new Error('Missing email parameter');
                }
                const email = req.query['email'];
                const result = yield send_reset_password_email_1.SendResetPasswordEmailHandler({ email }, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/authenticate').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield authenticate_1.AuthenticateHandler(req.headers, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/sign-out').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sign_out_1.SignOutHandler(req.headers, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/change-password').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req.headers && req.headers['token'])) {
                    throw new Error('Missing information in headers');
                }
                if (!(req.body && req.body['newPassword'])) {
                    throw new Error('Missing newPassword parameter in body');
                }
                const result = yield change_password_1.ChangePasswordHandler({ headers: req.headers, body: req.body }, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send({ message: result });
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/ban-user').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req.headers && req.headers['token'])) {
                    throw new Error('Missing information in headers');
                }
                const result = yield banUser_1.BanUserHandler(req.headers, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send({ message: result });
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/unban-user').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req.body && req.body.userId)) {
                    throw new Error('UserId not provided');
                }
                const result = yield unbanUser_1.UnbanUserHandler({ id: req.body.userId }, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send({ message: result });
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
        app.route('/firebase/delete-user').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(req.body && req.body.userId)) {
                    throw new Error('UserId not provided');
                }
                const result = yield delete_user_1.DeleteUserHandler({ id: req.body.userId }, new context_1.Context(context_1.AuthType.Firebase));
                res.status(200).send({ message: result });
            }
            catch (err) {
                res.status(400).send(err);
            }
        }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=router.js.map