import { RequestHandler, Request, Response } from "express";
import { Branch } from "../models/branch";

// Crear una nueva sucursal
export const createBranch: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
      res.status(400).json({
      status: "error",
      message: "Content cannot be empty.",
      payload: null,
    });
  }

  const branch = { ...req.body };
  Branch.create(branch)
    .then((data: Branch | null) => {
      res.status(200).json({
        status: "success",
        message: "Branch successfully created",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened creating the branch. " + err.message,
        payload: null,
      });
    });
};

// Obtener todas las sucursales
export const getAllBranches: RequestHandler = (req: Request, res: Response) => {
  Branch.findAll()
    .then((data: Branch[]) => {
      res.status(200).json({
        status: "success",
        message: "Branches successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened retrieving branches. " + err.message,
        payload: null,
      });
    });
};

// Obtener sucursal por ID
export const getBranchById: RequestHandler = (req: Request, res: Response) => {
  Branch.findByPk(req.params.id)
    .then((data: Branch | null) => {
      if (!data) {
        return res.status(404).json({
          status: "error",
          message: "Branch not found",
          payload: null,
        });
      }
      res.status(200).json({
        status: "success",
        message: "Branch successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened retrieving the branch. " + err.message,
        payload: null,
      });
    });
};

// Modificar sucursal
export const modifyBranch: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
      res.status(400).json({
      status: "error",
      message: "Content cannot be empty.",
      payload: null,
    });
  }

  Branch.update({ ...req.body }, { where: { id: req.params.id } })
    .then(([updated]) => {
      if (updated) {
        res.status(200).json({
          status: "success",
          message: "Branch successfully updated",
          payload: { ...req.body },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Branch not found",
          payload: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened updating the branch. " + err.message,
        payload: null,
      });
    });
};

// Eliminar sucursal
export const deleteBranch: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  try {
    const deleted = await Branch.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Branch deleted" });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting branch",
      error,
    });
  }
};
