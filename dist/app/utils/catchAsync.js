"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const env_js_1 = require("../config/env.js");
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (env_js_1.envVars.NODE_ENV === "development") {
            console.log("catchAsync:", err);
        }
        next(err);
    });
};
exports.catchAsync = catchAsync;
//# sourceMappingURL=catchAsync.js.map