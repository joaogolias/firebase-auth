"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_auth_database_1 = require("./data/firebase-auth-database");
class Context {
    constructor(authType) {
        if (authType === AuthType.Firebase) {
            this.authDataSource = new firebase_auth_database_1.FirebaseAuthDatabase();
        }
    }
    getAuthDataSource() {
        return this.authDataSource;
    }
}
exports.Context = Context;
var AuthType;
(function (AuthType) {
    AuthType[AuthType["Cognito"] = 0] = "Cognito";
    AuthType[AuthType["Firebase"] = 1] = "Firebase";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
//# sourceMappingURL=context.js.map