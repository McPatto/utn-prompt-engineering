import { Router } from "express";
import {
  getAllMattresses,
  addMattress,
  getMattressById,
  updateMattress,
  deleteMattress
} from "../controllers/mattresMongoController.js";

const mattressMongoRoutes = Router();

// Obtener todos los colchones
mattressMongoRoutes.get("/", getAllMattresses);

// Crear un colchón
mattressMongoRoutes.post("/", addMattress);

// Obtener un colchón por ID
mattressMongoRoutes.get("/:id", getMattressById);

// Actualizar un colchón
mattressMongoRoutes.put("/:id", updateMattress);

// Eliminar un colchón
mattressMongoRoutes.delete("/:id", deleteMattress);

export { mattressMongoRoutes };
