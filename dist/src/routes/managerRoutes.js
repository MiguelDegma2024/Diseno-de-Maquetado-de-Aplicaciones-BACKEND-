"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const managerController_1 = require("../controllers/managerController");
const router = express_1.default.Router();
router.get("/", managerController_1.getAllManagers);
router.get("/:id", managerController_1.getManagerById);
router.post("/", managerController_1.createManager);
router.patch("/:id", managerController_1.updateManager);
router.delete("/", managerController_1.deleteManager);
exports.default = router;
