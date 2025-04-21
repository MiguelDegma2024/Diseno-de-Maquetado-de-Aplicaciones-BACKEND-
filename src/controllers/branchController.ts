import { RequestHandler, Request, Response } from "express";
import { Branch } from "../models/branch";
import { Manager } from "../models/manager"; // Asegúrate de importar el modelo Manager

// Crear una nueva sucursal
// Create and Save a new Branch
export const createBranch: RequestHandler = (req: Request, res: Response) => {
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
  Manager.findAll()
    .then(managers => {
      console.log("Managers disponibles:", managers.map(m => m.id));
      
      return Manager.findByPk(managerId);
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
      const branch = { 
        ...req.body,
        managerId: managerId // Forzar el tipo correcto
      };
      
      return Branch.create(branch);
    })
    .then((data: Branch | null) => {
      if (!data) return null; // Si no hay datos, detener la cadena
      
      console.log("Branch creada con ID:", data.id);
      
      // Buscar la sucursal recién creada con su manager
      return Branch.findByPk(data.id, {
          include: [{
              model: Manager, 
              as: 'manager',
              attributes: ['id', 'name', 'email']
          }]
      });
    })
    .then((branchWithManager: Branch | null) => {
      if (!branchWithManager) return; // Si no hay sucursal, detener
      
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

// Obtener todas las sucursales
export const getAllBranches: RequestHandler = (req: Request, res: Response) => {
  Branch.findAll({
    include: [{ 
      model: Manager, 
      as: 'manager',
      attributes: ['id', 'name','email'] // Selecciona solo los campos que necesitas
    }]
  })
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
  Branch.findByPk(req.params.id, {
    include: [{ 
      model: Manager, 
      as: 'manager',
      attributes: ['id', 'name'] // Selecciona solo los campos que necesitas
    }]
  })
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
    return;
  }

  // Eliminar la propiedad manager si existe en el body para evitar errores
  const { manager, ...branchData } = req.body;
  
  // Si hay managerId, asegurarse que sea número
  if (branchData.managerId) {
    branchData.managerId = Number(branchData.managerId);
  }

  Branch.update(branchData, { where: { id: req.params.id } })
    .then(([updated]) => {
      if (updated) {
        // Después de actualizar, obtener la sucursal actualizada con su manager
        return Branch.findByPk(req.params.id, {
          include: [{ 
            model: Manager, 
            as: 'manager',
            attributes: ['id', 'name']
          }]
        });
      } else {
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

// Eliminar sucursal
export const deleteBranch: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  try {
    const deleted = await Branch.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ 
        status: "success",
        message: "Branch deleted",
        payload: null
      });
    } else {
      res.status(404).json({ 
        status: "error",
        message: "Branch not found",
        payload: null
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting branch",
      error,
      payload: null
    });
  }
};