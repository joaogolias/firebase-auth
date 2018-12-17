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
const firebase_auth_database_1 = require("../../../data/firebase-auth-database");
const perf_hooks_1 = require("perf_hooks");
const statistic_1 = require("../../statistic");
const firebaseAuth = new firebase_auth_database_1.FirebaseAuthDatabase();
const MAX_TESTS = 40;
const test = () => __awaiter(this, void 0, void 0, function* () {
    let requestTimeArray = [];
    for (let i = 0; i < MAX_TESTS; i++) {
        console.log(i);
        try {
            const t0 = perf_hooks_1.performance.now();
            const auth = yield firebaseAuth.signUpWithEmail(`test${i}@email.com`, '123456');
            const t1 = perf_hooks_1.performance.now();
            requestTimeArray.push(t1 - t0);
            yield firebaseAuth.deleteUser(auth.id);
        }
        catch (err) {
            console.log(err);
        }
    }
    console.log(requestTimeArray);
    const statistics = new statistic_1.StatisticManager('TESTE DE PERFORMANCE DE CREATE USER - FIREBASE', requestTimeArray);
    statistics.generateResults();
});
const main = () => __awaiter(this, void 0, void 0, function* () {
    Promise.resolve(test());
});
main();
//# sourceMappingURL=create-user.js.map