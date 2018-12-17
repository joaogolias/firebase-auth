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
const send_reset_password_email_use_case_1 = require("../../core/send-reset-password-email-use-case");
exports.SendResetPasswordEmailHandler = (input, context) => __awaiter(this, void 0, void 0, function* () {
    const sendResetPasswordEmailInput = {
        email: input.email,
    };
    const result = yield new send_reset_password_email_use_case_1.SendResetPasswordEmailUseCase(context.getAuthDataSource())
        .execute(sendResetPasswordEmailInput.email);
    return result;
});
//# sourceMappingURL=send-reset-password-email.js.map