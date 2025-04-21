import express from "express";
import {
  getAllManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager
} from "../controllers/managerController";

const router = express.Router();

router.get("/", getAllManagers);
router.get("/:id", getManagerById);
router.post("/", createManager);
router.patch("/:id", updateManager);
router.delete("/", deleteManager);

export default router;