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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranch = exports.modifyBranch = exports.getBranchById = exports.getAllBranches = exports.createBranch = void 0;
const branch_1 = require("../models/branch");
const manager_1 = require("../models/manager"); // Asegúrate de importar el modelo Manager
// Crear una nueva sucursal
// Create and Save a new Branch
const createBranch = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
        return;
    }
    // Log para depuración
    console.log("Datos de branch a crear:", req.body);
    console.log("Tipo de managerId:", typeof req.body.managerId);
    // Verificar que existe el manager primero
    // Forzar la conversión a número
    const managerId = Number(req.body.managerId);
    // Verificar si el manager existe consultando todos los managers disponibles
    manager_1.Manager.findAll()
        .then(managers => {
        console.log("Managers disponibles:", managers.map(m => m.id));
        return manager_1.Manager.findByPk(managerId);
    })
        .then((manager) => {
        if (!manager) {
            res.status(400).json({
                status: "error",
                message: "El manager especificado no existe",
                payload: null,
            });
            return null; // Para detener la cadena de promesas
        }
        console.log("Manager encontrado:", manager.id, manager.name);
        // Save Branch in the database
        // Asegurarnos que managerId sea un número
        const branch = Object.assign(Object.assign({}, req.body), { managerId: managerId // Forzar el tipo correcto
         });
        return branch_1.Branch.create(branch);
    })
        .then((data) => {
        if (!data)
            return null; // Si no hay datos, detener la cadena
        console.log("Branch creada con ID:", data.id);
        // Buscar la sucursal recién creada con su manager
        return branch_1.Branch.findByPk(data.id, {
            include: [{
                    model: manager_1.Manager,
                    as: 'manager',
                    attributes: ['id', 'name', 'email']
                }]
        });
    })
        .then((branchWithManager) => {
        if (!branchWithManager)
            return; // Si no hay sucursal, detener
        res.status(200).json({
            status: "success",
            message: "Branch successfully created",
            payload: branchWithManager,
        });
    })
        .catch((err) => {
        console.error("Error creando branch:", err);
        res.status(500).json({
            status: "error",
            message: "Something happened creating the branch. " + err.message,
            payload: null,
        });
    });
};
exports.createBranch = createBranch;
// Obtener todas las sucursales
const getAllBranches = (req, res) => {
    branch_1.Branch.findAll({
        include: [{
                model: manager_1.Manager,
                as: 'manager',
                attributes: ['id', 'name', 'email'] // Selecciona solo los campos que necesitas
            }]
    })
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
    branch_1.Branch.findByPk(req.params.id, {
        include: [{
                model: manager_1.Manager,
                as: 'manager',
                attributes: ['id', 'name'] // Selecciona solo los campos que necesitas
            }]
    })
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
const modifyBranch = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content cannot be empty.",
            payload: null,
        });
        return;
    }
    // Eliminar la propiedad manager si existe en el body para evitar errores
    const _a = req.body, { manager } = _a, branchData = __rest(_a, ["manager"]);
    // Si hay managerId, asegurarse que sea número
    if (branchData.managerId) {
        branchData.managerId = Number(branchData.managerId);
    }
    branch_1.Branch.update(branchData, { where: { id: req.params.id } })
        .then(([updated]) => {
        if (updated) {
            // Después de actualizar, obtener la sucursal actualizada con su manager
            return branch_1.Branch.findByPk(req.params.id, {
                include: [{
                        model: manager_1.Manager,
                        as: 'manager',
                        attributes: ['id', 'name']
                    }]
            });
        }
        else {
            res.status(404).json({
                status: "error",
                message: "Branch not found",
                payload: null,
            });
            return null;
        }
    })
        .then((updatedBranch) => {
        if (updatedBranch) {
            res.status(200).json({
                status: "success",
                message: "Branch successfully updated",
                payload: updatedBranch,
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
exports.modifyBranch = modifyBranch;
// Eliminar sucursal
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deleted = yield branch_1.Branch.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({
                status: "success",
                message: "Branch deleted",
                payload: null
            });
        }
        else {
            res.status(404).json({
                status: "error",
                message: "Branch not found",
                payload: null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting branch",
            error,
            payload: null
        });
    }
});
exports.deleteBranch = deleteBranch;
