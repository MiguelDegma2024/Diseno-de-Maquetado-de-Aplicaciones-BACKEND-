import { RequestHandler, Request, Response } from "express";           
import { Product } from '../models/product';
import { Category } from '../models/category'; // Importar el modelo Category


// Create and Save a new Product
export const createProduct: RequestHandler = (req: Request, res: Response) => {
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
    
    Category.findByPk(categoryId)
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
            const product = { ...req.body };
            return Product.create(product);
        })
        .then((data: Product | null) => {
            if (!data) return null; // Si no hay datos, detener la cadena
            
            // Buscar el producto recién creado con su categoría
            return Product.findByPk(data.id, {
                include: [{
                    model: Category,
                    attributes: ['id', 'name', 'key']
                }]
            });
        })
        .then((productWithCategory: Product | null) => {
            if (!productWithCategory) return; // Si no hay producto, detener
            
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



// Retrieve all Products from the database.
export const getAllProducts: RequestHandler = (req: Request, res: Response) => {
    // Incluir la relación con Category al obtener los productos
    Product.findAll({
        include: [{
            model: Category,
            attributes: ['id', 'name', 'key'] // Solo incluir los atributos necesarios
        }]
    })
        .then((data: Product[]) => {
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

// Find a single Product with an id
export const getProductById: RequestHandler = (req: Request, res: Response) => {
     Product.findByPk(req.params.id)
        .then((data: Product | null) => {
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



// Update a Product by the id in the request
export const modifyProduct: RequestHandler = (req: Request, res: Response) => {
    // Validate request
    if (!req.body) {
            res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    
    // Check if product exists first
    Product.findByPk(req.params.id)
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
                return Category.findByPk(req.body.categoryId);
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
            return Product.update(req.body, { where: { id: req.params.id } });
        })
        .then(updateResult => {
            const [affectedCount] = updateResult;
            
            if (affectedCount > 0) {
                // If product was updated, fetch the updated product
                return Product.findByPk(req.params.id, {
                    include: [{
                        model: Category,
                        attributes: ['id', 'name', 'key']
                    }]
                });
            } else {
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
            if (
                err.message !== "Product not found" && 
                err.message !== "Category not found" && 
                err.message !== "No changes applied"
            ) {
                console.error("Error updating product:", err);
                res.status(500).json({
                    status: "error",
                    message: "Something happened updating the product. " + err.message,
                    payload: null,
                });
            }
        });
}; 


// Delete a Product with the specified id in the request
export const deleteProduct: RequestHandler = async (req: Request,res: Response) => {
    const { id } = req.body;
    try {
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({
        message: "Error deleting products",
        error,
        });
    }
};