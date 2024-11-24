import React, { useState } from "react";
import TodoItem from "../modules/TodoItem";
import NewTodoInput from "../modules/NewTodoInput";

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
  const [todos, setTodos] = useState<Tasks | undefined>(example);

  return (
    <div>
      <h3 className="text-red-600">Who's To-dos</h3>
      <ul>
        {example.map((task: Task, index: number) => (
          <TodoItem content={task.content} finished={task.finished} key={index}></TodoItem>
        ))}
      </ul>
      <NewTodoInput />
    </div>
  );
};

export default Todo;
