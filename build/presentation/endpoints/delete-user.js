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
const delete_user_use_case_1 = require("../../core/delete-user-use-case");
exports.DeleteUserHandler = (input, context) => __awaiter(this, void 0, void 0, function* () {
    const deleteUserHandlerInput = {
        id: input.id
    };
    const result = yield new delete_user_use_case_1.DeleteUserUseCase(context.getAuthDataSource())
        .execute(deleteUserHandlerInput);
    return result;
});
//# sourceMappingURL=delete-user.js.map