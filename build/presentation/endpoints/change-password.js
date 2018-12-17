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
const change_password_use_case_1 = require("../../core/change-password-use-case");
exports.ChangePasswordHandler = (input, context) => __awaiter(this, void 0, void 0, function* () {
    const changePassowrdHandlerInput = {
        token: input.headers['token'],
        newPassword: input.body.newPassword
    };
    const result = yield new change_password_use_case_1.ChangePasswordUseCase(context.getAuthDataSource())
        .execute(changePassowrdHandlerInput);
    return result;
});
//# sourceMappingURL=change-password.js.map