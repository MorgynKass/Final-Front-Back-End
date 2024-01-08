import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import * as taskController from "../controllers/taskController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/allTasks", taskController.allTasks);
router.get("/singleTask/:id", taskController.singleTask);
router.post("/createTask", taskController.createTask);
router.patch("/editTask/:id", taskController.updateTask);
router.delete("/deleteTask/:id", taskController.deleteTask);

export default router;
