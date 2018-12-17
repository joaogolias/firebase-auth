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
const sign_in_use_case_1 = require("../../core/sign-in-use-case");
exports.SigninHandler = (input, context) => __awaiter(this, void 0, void 0, function* () {
    const loginInput = {
        email: input.email,
        password: input.password
    };
    const result = yield new sign_in_use_case_1.SignInUseCase(context.getAuthDataSource()).execute(loginInput);
    return result;
});
//# sourceMappingURL=firebase-login.js.map