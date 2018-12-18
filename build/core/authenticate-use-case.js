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
class AuthenticateUseCase {
    constructor(authDataSource) {
        this.authDataSource = authDataSource;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let authInfo;
            if (!input.provider) {
                authInfo = yield this.authDataSource.authenticate(input.token);
            }
            else {
                if (input.provider === 'facebook') {
                    authInfo = yield this.authDataSource.facebookAuthenticate(input.token);
                }
                if (input.provider === 'google') {
                    authInfo = yield this.authDataSource.googleAuthenticate(input.token);
                }
            }
            return authInfo;
        });
    }
}
exports.AuthenticateUseCase = AuthenticateUseCase;
//# sourceMappingURL=authenticate-use-case.js.map