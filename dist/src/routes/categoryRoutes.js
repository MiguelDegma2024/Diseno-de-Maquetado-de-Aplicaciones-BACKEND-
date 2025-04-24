"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/categoryRoutes.ts
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
// Rutas para categorías
router.get('/', categoryController_1.getAllCategories);
router.get('/:id', categoryController_1.getCategoryById);
router.post('/', categoryController_1.createCategory);
router.put('/:id', categoryController_1.updateCategory);
router.delete('/:id', categoryController_1.deleteCategory);
exports.default = router;
