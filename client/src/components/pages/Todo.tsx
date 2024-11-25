import React, { useState } from "react";
import TodoItem from "../modules/TodoItem";
import { NewTodoInput } from "../modules/NewTodoInput";

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

  const addNewTodo = (content: string) => {
    const newTodo: Task = {
      content: content,
      finished: false,
    };
    todos ? setTodos([...todos, newTodo]) : setTodos([newTodo]);
  };

  return (
    <div>
      <h3 className="text-red-600">Who's To-dos</h3>
      {todos ? (
        <ul>
          {todos.map((task: Task, index: number) => (
            <TodoItem content={task.content} finished={task.finished} key={index}></TodoItem>
          ))}
        </ul>
      ) : (
        <p className="italic font-semibold">Empty! Add a new TODO now~</p>
      )}

      <NewTodoInput addTodo={addNewTodo}></NewTodoInput>
    </div>
  );
};

export default Todo;
