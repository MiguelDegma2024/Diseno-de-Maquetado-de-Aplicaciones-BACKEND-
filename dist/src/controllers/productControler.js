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
exports.deleteProduct = exports.modifyProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
const category_1 = require("../models/category"); // Importar el modelo Category
// Create and Save a new Product
const createProduct = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    // Verificar que existe la categoría primero
    const categoryId = req.body.categoryId;
    category_1.Category.findByPk(categoryId)
        .then((category) => {
        if (!category) {
            res.status(400).json({
                status: "error",
                message: "La categoría especificada no existe",
                payload: null,
            });
            return null; // Para detener la cadena de promesas
        }
        // Save Product in the database
        const product = Object.assign({}, req.body);
        return product_1.Product.create(product);
    })
        .then((data) => {
        if (!data)
            return null; // Si no hay datos, detener la cadena
        // Buscar el producto recién creado con su categoría
        return product_1.Product.findByPk(data.id, {
            include: [{
                    model: category_1.Category,
                    attributes: ['id', 'name', 'key']
                }]
        });
    })
        .then((productWithCategory) => {
        if (!productWithCategory)
            return; // Si no hay producto, detener
        res.status(200).json({
            status: "success",
            message: "Product successfully created",
            payload: productWithCategory,
        });
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened creating the product. " + err.message,
            payload: null,
        });
    });
};
exports.createProduct = createProduct;
// Retrieve all Products from the database.
const getAllProducts = (req, res) => {
    // Incluir la relación con Category al obtener los productos
    product_1.Product.findAll({
        include: [{
                model: category_1.Category,
                attributes: ['id', 'name', 'key'] // Solo incluir los atributos necesarios
            }]
    })
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Products successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all products. " + err.message,
            payload: null,
        });
    });
};
exports.getAllProducts = getAllProducts;
// Find a single Product with an id
const getProductById = (req, res) => {
    product_1.Product.findByPk(req.params.id)
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Product successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving the product. " + err.message,
            payload: null,
        });
    });
};
exports.getProductById = getProductById;
// Update a Product by the id in the request
const modifyProduct = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    // Check if product exists first
    product_1.Product.findByPk(req.params.id)
        .then(productExists => {
        if (!productExists) {
            res.status(404).json({
                status: "error",
                message: "Product not found",
                payload: null,
            });
            throw new Error("Product not found"); // Stop the chain
        }
        // If categoryId is provided, verify it exists
        if (req.body.categoryId) {
            return category_1.Category.findByPk(req.body.categoryId);
        }
        return null; // Return null instead of true to maintain consistent return types
    })
        .then(categoryResult => {
        if (req.body.categoryId && categoryResult === null) {
            res.status(400).json({
                status: "error",
                message: "La categoría especificada no existe",
                payload: null,
            });
            throw new Error("Category not found"); // Stop the chain
        }
        // Now update the product
        return product_1.Product.update(req.body, { where: { id: req.params.id } });
    })
        .then(updateResult => {
        const [affectedCount] = updateResult;
        if (affectedCount > 0) {
            // If product was updated, fetch the updated product
            return product_1.Product.findByPk(req.params.id, {
                include: [{
                        model: category_1.Category,
                        attributes: ['id', 'name', 'key']
                    }]
            });
        }
        else {
            res.status(400).json({
                status: "error",
                message: "No changes applied to the product",
                payload: null,
            });
            throw new Error("No changes applied"); // Stop the chain
        }
    })
        .then(updatedProduct => {
        res.status(200).json({
            status: "success",
            message: "Product successfully updated",
            payload: updatedProduct,
        });
    })
        .catch((err) => {
        // Only log and send error response if it wasn't already handled
        if (err.message !== "Product not found" &&
            err.message !== "Category not found" &&
            err.message !== "No changes applied") {
            console.error("Error updating product:", err);
            res.status(500).json({
                status: "error",
                message: "Something happened updating the product. " + err.message,
                payload: null,
            });
        }
    });
};
exports.modifyProduct = modifyProduct;
// Delete a Product with the specified id in the request
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield product_1.Product.destroy({ where: { id } });
        res.status(200).json({ message: "Product deleted" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting products",
            error,
        });
    }
});
exports.deleteProduct = deleteProduct;
