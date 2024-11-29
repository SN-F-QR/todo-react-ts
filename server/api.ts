import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import Task from "./models/Task";
import { Task as TaskInterface } from "../shared/types";

const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

router.get("/todos", auth.ensureLoggedIn, (req, res) => {
  const getTodos = async (userID: string) => {
    const todos: TaskInterface[] | null = await Task.find({ creator_id: userID });
    return res.send(todos); // return TaskInterface[] instead of mere data
  };
  getTodos(req.user!._id);
});

router.post("/todo", auth.ensureLoggedIn, (req, res) => {
  const newTask = new Task({
    creator_id: req.user!._id,
    title: req.body.title,
    finished: req.body.finished,
    date: Date.now(),
  });

  const addTodo = async () => {
    const task: TaskInterface | null = await newTask.save();
    return res.send(task);
  };
  addTodo();
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
