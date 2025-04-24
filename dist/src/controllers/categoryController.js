"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const category_1 = require("../models/category");
// Obtener todas las categorías
const getAllCategories = (req, res) => {
    category_1.Category.findAll()
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Categories successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving categories. " + err.message,
            payload: null,
        });
    });
};
exports.getAllCategories = getAllCategories;
// Obtener categoría por ID
const getCategoryById = (req, res) => {
    category_1.Category.findByPk(req.params.id)
        .then((data) => {
        if (!data) {
            return res.status(404).json({
                status: "error",
                message: "Category not found",
                payload: null,
            });
        }
        res.status(200).json({
            status: "success",
            message: "Category successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving the category. " + err.message,
            payload: null,
        });
    });
};
exports.getCategoryById = getCategoryById;
// Crear una nueva categoría
const createCategory = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
        return;
    }
    category_1.Category.create(req.body)
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Category successfully created",
            payload: data,
        });
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened creating the category. " + err.message,
            payload: null,
        });
    });
};
exports.createCategory = createCategory;
// Actualizar categoría
const updateCategory = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content cannot be empty.",
            payload: null,
        });
        return;
    }
    category_1.Category.update(req.body, { where: { id: req.params.id } })
        .then(([updated]) => {
        if (updated) {
            return category_1.Category.findByPk(req.params.id);
        }
        else {
            res.status(404).json({
                status: "error",
                message: "Category not found",
                payload: null,
            });
            return null;
        }
    })
        .then((updatedCategory) => {
        if (updatedCategory) {
            res.status(200).json({
                status: "success",
                message: "Category successfully updated",
                payload: updatedCategory,
            });
        }
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened updating the category. " + err.message,
            payload: null,
        });
    });
};
exports.updateCategory = updateCategory;
// Eliminar categoría
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deleted = yield category_1.Category.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({
                status: "success",
                message: "Category deleted",
                payload: null
            });
        }
        else {
            res.status(404).json({
                status: "error",
                message: "Category not found",
                payload: null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting category",
            error,
            payload: null
        });
    }
});
exports.deleteCategory = deleteCategory;
