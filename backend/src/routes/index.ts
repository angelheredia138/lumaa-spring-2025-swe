import { Router } from "express";
import * as authController from "../controllers/authController";
import * as taskController from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Auth routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Task routes (protected)
router.get("/tasks", authMiddleware, taskController.getTasks);
router.post("/tasks", authMiddleware, taskController.createTask);
router.put("/tasks/:id", authMiddleware, taskController.updateTask);
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

export default router;
