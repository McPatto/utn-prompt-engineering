import { Router } from "express";
import {
  getAllMattresses,
  addMattress,
  getMattressById,
  updateMattress,
  deleteMattress
} from "../controllers/mattresFileController.js";

const mattressFileRoutes = Router();

// Obtener todos los colchones
mattressFileRoutes.get("/", getAllMattresses);

// Crear un colchón
mattressFileRoutes.post("/", addMattress);

// Obtener un colchón por ID
mattressFileRoutes.get("/:id", getMattressById);

// Actualizar un colchón
mattressFileRoutes.put("/:id", updateMattress);

// Eliminar un colchón
mattressFileRoutes.delete("/:id", deleteMattress);

export { mattressFileRoutes };
