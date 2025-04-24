"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes_1 = __importDefault(require("./productRoutes"));
const branchRoutes_1 = __importDefault(require("./branchRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const managerRoutes_1 = __importDefault(require("./managerRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/product", productRoutes_1.default);
apiRouter.use("/branch", branchRoutes_1.default);
apiRouter.use("/user", userRoutes_1.default);
apiRouter.use("/manager", managerRoutes_1.default);
apiRouter.use("/category", categoryRoutes_1.default);
apiRouter.use("/auth", authRoutes_1.default);
apiRouter.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = apiRouter;
