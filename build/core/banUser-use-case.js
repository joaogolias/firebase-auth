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
class BanUserUseCase {
    constructor(authDataSource) {
        this.authDataSource = authDataSource;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield this.authDataSource.authenticate(input.token);
            return this.authDataSource.banUser(credentials.id);
        });
    }
}
exports.BanUserUseCase = BanUserUseCase;
//# sourceMappingURL=banUser-use-case.js.map