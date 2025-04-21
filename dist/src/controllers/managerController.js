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
exports.deleteManager = exports.updateManager = exports.createManager = exports.getManagerById = exports.getAllManagers = void 0;
const manager_1 = require("../models/manager");
// Obtener todos los managers
const getAllManagers = (req, res) => {
    manager_1.Manager.findAll()
        .then((data) => {
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
exports.getAllManagers = getAllManagers;
// Obtener manager por ID
const getManagerById = (req, res) => {
    manager_1.Manager.findByPk(req.params.id)
        .then((data) => {
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
exports.getManagerById = getManagerById;
// Crear un nuevo manager
const createManager = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
        return;
    }
    manager_1.Manager.create(req.body)
        .then((data) => {
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
exports.createManager = createManager;
// Actualizar manager
const updateManager = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content cannot be empty.",
            payload: null,
        });
        return;
    }
    manager_1.Manager.update(req.body, { where: { id: req.params.id } })
        .then(([updated]) => {
        if (updated) {
            return manager_1.Manager.findByPk(req.params.id);
        }
        else {
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
exports.updateManager = updateManager;
// Eliminar manager
const deleteManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deleted = yield manager_1.Manager.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({
                status: "success",
                message: "Manager deleted",
                payload: null
            });
        }
        else {
            res.status(404).json({
                status: "error",
                message: "Manager not found",
                payload: null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting manager",
            error,
            payload: null
        });
    }
});
exports.deleteManager = deleteManager;
