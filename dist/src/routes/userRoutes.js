"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branchController_1 = require("../controllers/branchController");
const branchRouter = (0, express_1.Router)();
branchRouter.get("/", branchController_1.getAllBranches);
branchRouter.get("/:id", branchController_1.getBranchById);
/*branchRouter.post("/", createBranch);

branchRouter.patch("/:id", modifyBranch);*/
branchRouter.delete("/", branchController_1.deleteBranch);
exports.default = branchRouter;
