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
exports.deleteBranch = exports.getBranchById = exports.getAllBranches = void 0;
const branch_1 = require("../models/branch");
// Crear una nueva sucursal
/*export const createBranch: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
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
};*/
// Obtener todas las sucursales
const getAllBranches = (req, res) => {
    branch_1.Branch.findAll()
        .then((data) => {
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
exports.getAllBranches = getAllBranches;
// Obtener sucursal por ID
const getBranchById = (req, res) => {
    branch_1.Branch.findByPk(req.params.id)
        .then((data) => {
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
exports.getBranchById = getBranchById;
// Modificar sucursal
/*export const modifyBranch: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
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
};*/
// Eliminar sucursal
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deleted = yield branch_1.Branch.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "Branch deleted" });
        }
        else {
            res.status(404).json({ message: "Branch not found" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting branch",
            error,
        });
    }
});
exports.deleteBranch = deleteBranch;
