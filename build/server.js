"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./presentation/app");
app_1.default.listen(3001, () => {
    console.log('Express server listening on port ' + 3001);
    app_1.default._router.stack.map((mainStack, i) => {
        getRoutes(mainStack);
    });
});
function getRoutes(mainStack) {
    if (mainStack.route) {
        const path = mainStack.route.path;
        const method = (mainStack.route.stack[0].method).toString().toUpperCase();
        console.log('\x1b[33m%s\x1b[33m%s\x1b[0m', `${method}: `, `${path}`);
    }
}
//# sourceMappingURL=server.js.map