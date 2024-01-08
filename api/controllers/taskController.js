import prisma from "../constats/config.js";
import { z } from "zod";

// CREATE A TASK
const createTask = async (req, res) => {
  const { task } = req.body;

  try {
    const newTask = await prisma.tasks.create({
      data: {
        task: task,
      },
    });
    // console.log(task);
    // console.log(newTask);
    res.status(201).json({ Task: newTask });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SHOW ALL TASKS
const allTasks = async (req, res) => {
  try {
    const allTasks = await prisma.tasks.findMany();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

// SHOW SINGLE TASK
const singleTask = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const oneTask = await prisma.tasks.findUnique({
      where: {
        id: id,
      },
    });
    if (oneTask) {
      res.status(200).json(oneTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// UPDATE A TASK
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  // console.log(id);

  if (!id) return res.status(400).json({ message: "Id is not correct" });

  try {
    const updateT = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        task: task,
      },
    });
    res.status(200).json("Success!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// DELETE A TASK
const deleteTask = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  if (!id) return res.status(400).json({ message: "Id is incorrect." });

  try {
    const deleteT = await prisma.tasks.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Task deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { createTask, allTasks, singleTask, updateTask, deleteTask };
