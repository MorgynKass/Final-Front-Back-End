import express from "express";
import taskController from "../controllers/taskController";

const router = express.Router();

router.get("/allTasks", taskController.allTasks);
router.get("/singleTask", taskController.singleTask);
router.post("/createTask", taskController.createTask);
router.patch("/editTask", taskController.updateTask);
router.delete("/deleteTask", taskController.deleteTask);

export default router;
