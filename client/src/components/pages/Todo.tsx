import React, { useState } from "react";
import TodoItem from "../modules/TodoItem";
import { NewTodoInput } from "../modules/NewTodoInput";
import { generateId } from "../../utilities";

type Task = {
  _id: string;
  content: string;
  finished: boolean;
};

type Tasks = Array<Task>;

const example: Tasks = Array<Task>(
  {
    _id: generateId(),
    content: "Homework",
    finished: false,
  },
  {
    _id: generateId(),
    content: "Housework",
    finished: false,
  }
);

const Todo = () => {
  const [todos, setTodos] = useState<Tasks | undefined>(example);

  const addNewTodo = (content: string) => {
    const newTodo: Task = {
      _id: generateId(),
      content: content,
      finished: false,
    };
    todos ? setTodos([...todos, newTodo]) : setTodos([newTodo]);
  };

  const updateTodo = (id: string, finished: boolean) => {
    if (todos) {
      setTodos(
        todos.map((task) => {
          if (task._id === id) {
            return { ...task, finished: finished };
          }
          return task;
        })
      );
    }
  };

  const deleteTodo = (id: string) => {
    if (todos) {
      setTodos(todos.filter((task) => task._id !== id));
    }
  };

  return (
    <div>
      <h3 className="text-red-600 py-1 px-5">Who's To-dos</h3>
      {todos ? (
        <ul>
          {todos.map((task: Task, index: number) => (
            <TodoItem
              _id={task._id}
              content={task.content}
              finished={task.finished}
              updateFinished={updateTodo}
              deleteTodo={deleteTodo}
              key={index}
            ></TodoItem>
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
