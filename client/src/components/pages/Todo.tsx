import React from "react";
import TodoItem from "../modules/TodoItem";

type Task = {
  _id?: string;
  content: string;
  finished: boolean;
};

type Tasks = Array<Task>;

const example: Tasks = Array<Task>(
  {
    content: "Homework",
    finished: false,
  },
  {
    content: "Housework",
    finished: false,
  }
);

const Todo = () => {
  return (
    <div>
      <h3>Who's To-dos</h3>
      <ul>
        {example.map((task: Task, index: number) => (
          <TodoItem content={task.content} finished={task.finished} key={index}></TodoItem>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
