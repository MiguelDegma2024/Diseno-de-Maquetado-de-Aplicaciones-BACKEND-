import { RequestHandler, Request, Response } from "express";
import { Manager } from "../models/manager";

// Obtener todos los managers
export const getAllManagers: RequestHandler = (req: Request, res: Response) => {
  Manager.findAll()
    .then((data: Manager[]) => {
      res.status(200).json({
        status: "success",
        message: "Managers successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened retrieving managers. " + err.message,
        payload: null,
      });
    });
};

// Obtener manager por ID
export const getManagerById: RequestHandler = (req: Request, res: Response) => {
  Manager.findByPk(req.params.id)
    .then((data: Manager | null) => {
      if (!data) {
        return res.status(404).json({
          status: "error",
          message: "Manager not found",
          payload: null,
        });
      }
      res.status(200).json({
        status: "success",
        message: "Manager successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened retrieving the manager. " + err.message,
        payload: null,
      });
    });
};

// Crear un nuevo manager
export const createManager: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
    return;
  }

  Manager.create(req.body)
    .then((data: Manager) => {
      res.status(200).json({
        status: "success",
        message: "Manager successfully created",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened creating the manager. " + err.message,
        payload: null,
      });
    });
};

// Actualizar manager
export const updateManager: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content cannot be empty.",
      payload: null,
    });
    return;
  }

  Manager.update(req.body, { where: { id: req.params.id } })
    .then(([updated]) => {
      if (updated) {
        return Manager.findByPk(req.params.id);
      } else {
        res.status(404).json({
          status: "error",
          message: "Manager not found",
          payload: null,
        });
        return null;
      }
    })
    .then((updatedManager) => {
      if (updatedManager) {
        res.status(200).json({
          status: "success",
          message: "Manager successfully updated",
          payload: updatedManager,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened updating the manager. " + err.message,
        payload: null,
      });
    });
};

// Eliminar manager
export const deleteManager: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  try {
    const deleted = await Manager.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ 
        status: "success",
        message: "Manager deleted",
        payload: null
      });
    } else {
      res.status(404).json({ 
        status: "error",
        message: "Manager not found",
        payload: null
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting manager",
      error,
      payload: null
    });
  }
};