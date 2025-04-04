import { RequestHandler, Request, Response } from "express";
import { User } from "../models/user";

// Crear un nuevo usuario
export const createUser: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
      res.status(400).json({
      status: "error",
      message: "Content cannot be empty.",
      payload: null,
    });
  }

  const user = { ...req.body };
  User.create(user)
    .then((data: User | null) => {
      res.status(200).json({
        status: "success",
        message: "User successfully created",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened creating the user. " + err.message,
        payload: null,
      });
    });
};

// Obtener todos los usuarios
export const getAllUsers: RequestHandler = (req: Request, res: Response) => {
  User.findAll()
    .then((data: User[]) => {
      res.status(200).json({
        status: "success",
        message: "Users successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened retrieving users. " + err.message,
        payload: null,
      });
    });
};

// Obtener usuario por ID
export const getUserById: RequestHandler = (req: Request, res: Response) => {
  User.findByPk(req.params.id)
    .then((data: User | null) => {
      if (!data) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
          payload: null,
        });
      }
      res.status(200).json({
        status: "success",
        message: "User successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened retrieving the user. " + err.message,
        payload: null,
      });
    });
};

// Modificar usuario
export const modifyUser: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
      res.status(400).json({
      status: "error",
      message: "Content cannot be empty.",
      payload: null,
    });
  }

  User.update({ ...req.body }, { where: { id: req.params.id } })
    .then(([updated]) => {
      if (updated) {
        res.status(200).json({
          status: "success",
          message: "User successfully updated",
          payload: { ...req.body },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "User not found",
          payload: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened updating the user. " + err.message,
        payload: null,
      });
    });
};

// Eliminar usuario
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error,
    });
  }
};
