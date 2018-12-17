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
const admin = require("firebase-admin");
const firebase = require("firebase");
const config_1 = require("../config");
const auth_data_source_1 = require("../core/data-sources/auth-data-source");
class FirebaseAuthDatabase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                credential: admin.credential.cert({
                    projectId: config_1.getConfig().firebase.projectId,
                    clientEmail: config_1.getConfig().firebase.clientEmail,
                    privateKey: config_1.getConfig().firebase.privateKey,
                }),
                apiKey: config_1.getConfig().firebase.apiKey,
            });
        }
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: config_1.getConfig().firebase.projectId,
                    clientEmail: config_1.getConfig().firebase.clientEmail,
                    privateKey: config_1.getConfig().firebase.privateKey,
                }),
            });
        }
    }
    signUpWithEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const credential = yield firebase.auth().createUserWithEmailAndPassword(email, password);
                    const customToken = yield admin.auth().createCustomToken(credential.user.uid);
                    res(this.firebaseCredentialToAuthInfo(credential, customToken));
                }
                catch (err) {
                    rej(err);
                }
            }));
        });
    }
    signInWithEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const credential = yield firebase.auth().signInWithEmailAndPassword(email, password);
                    const customToken = yield admin.auth().createCustomToken(credential.user.uid);
                    res(this.firebaseCredentialToAuthInfo(credential, customToken));
                }
                catch (err) {
                    rej(err);
                }
            }));
        });
    }
    sendPasswordResetEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield firebase.auth().sendPasswordResetEmail(email);
                    res(`Reset Password Email sent to ${email}`);
                }
                catch (err) {
                    rej(err);
                }
            }));
        });
    }
    changePassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authenticate(token);
            yield this.user.updatePassword(newPassword);
            return 'Password successfully changed';
        });
    }
    authenticate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase.auth().signInWithCustomToken(token);
            this.user = firebase.auth().currentUser;
            return {
                id: this.user.uid,
                token,
                refreshToken: this.user.refreshToken,
                authService: auth_data_source_1.AuthService.Firebase,
                thirdProvider: auth_data_source_1.ThirdProvider.None
            };
        });
    }
    signOut(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authenticate(token);
            yield firebase.auth().signOut();
        });
    }
    banUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield admin.auth().updateUser(uid, {
                        disabled: true
                    });
                    res("User disabled successfully");
                }
                catch (err) {
                    rej(err);
                }
            }));
        });
    }
    unbanUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield admin.auth().updateUser(uid, {
                disabled: false
            });
            return "User enabled successfully";
        });
    }
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield admin.auth().deleteUser(uid);
            return 'User deleted successfully';
        });
    }
    firebaseCredentialToAuthInfo(firebaseCredentials, customToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = customToken || (yield firebaseCredentials.user.getIdToken());
            return {
                id: firebaseCredentials.user.uid,
                token,
                refreshToken: firebaseCredentials.user.refreshToken,
                authService: auth_data_source_1.AuthService.Firebase,
                thirdProvider: auth_data_source_1.ThirdProvider.None,
            };
        });
    }
}
exports.FirebaseAuthDatabase = FirebaseAuthDatabase;
//# sourceMappingURL=firebase-auth-database.js.map