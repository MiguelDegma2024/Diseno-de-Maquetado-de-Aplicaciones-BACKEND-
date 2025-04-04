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
exports.deleteUser = exports.modifyUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_1 = require("../models/user");
// Crear un nuevo usuario
const createUser = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content cannot be empty.",
            payload: null,
        });
    }
    const user = Object.assign({}, req.body);
    user_1.User.create(user)
        .then((data) => {
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
exports.createUser = createUser;
// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    user_1.User.findAll()
        .then((data) => {
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
exports.getAllUsers = getAllUsers;
// Obtener usuario por ID
const getUserById = (req, res) => {
    user_1.User.findByPk(req.params.id)
        .then((data) => {
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
exports.getUserById = getUserById;
// Modificar usuario
const modifyUser = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content cannot be empty.",
            payload: null,
        });
    }
    user_1.User.update(Object.assign({}, req.body), { where: { id: req.params.id } })
        .then(([updated]) => {
        if (updated) {
            res.status(200).json({
                status: "success",
                message: "User successfully updated",
                payload: Object.assign({}, req.body),
            });
        }
        else {
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
exports.modifyUser = modifyUser;
// Eliminar usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deleted = yield user_1.User.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "User deleted" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error,
        });
    }
});
exports.deleteUser = deleteUser;
