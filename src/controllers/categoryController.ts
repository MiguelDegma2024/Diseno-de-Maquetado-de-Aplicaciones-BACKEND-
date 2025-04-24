import { RequestHandler, Request, Response } from "express";
import { Category } from "../models/category";

// Obtener todas las categorías
export const getAllCategories: RequestHandler = (req: Request, res: Response) => {
  Category.findAll()
    .then((data: Category[]) => {
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

// Obtener categoría por ID
export const getCategoryById: RequestHandler = (req: Request, res: Response) => {
  Category.findByPk(req.params.id)
    .then((data: Category | null) => {
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

// Crear una nueva categoría
export const createCategory: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
    return;
  }

  Category.create(req.body)
    .then((data: Category) => {
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

// Actualizar categoría
export const updateCategory: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content cannot be empty.",
      payload: null,
    });
    return;
  }

  Category.update(req.body, { where: { id: req.params.id } })
    .then(([updated]) => {
      if (updated) {
        return Category.findByPk(req.params.id);
      } else {
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

// Eliminar categoría
export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  try {
    const deleted = await Category.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ 
        status: "success",
        message: "Category deleted",
        payload: null
      });
    } else {
      res.status(404).json({ 
        status: "error",
        message: "Category not found",
        payload: null
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting category",
      error,
      payload: null
    });
  }
};