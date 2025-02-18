import { Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { AuthRequest } from "../middleware/authMiddleware";

const taskRepository = AppDataSource.getRepository(Task);

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const tasks = await taskRepository.find({
      where: { user: { id: req.user!.id } },
      relations: ["user"],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;
    const task = taskRepository.create({
      title,
      description,
      user: { id: req.user!.id },
    });
    const savedTask = await taskRepository.save(task);
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await taskRepository.findOne({
      where: { id: parseInt(id), user: { id: req.user!.id } },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await taskRepository.update(id, { title, description, isComplete });
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await taskRepository.findOne({
      where: { id: parseInt(id), user: { id: req.user!.id } },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await taskRepository.delete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
