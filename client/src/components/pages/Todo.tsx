import React, { useEffect, useState } from "react";
import TodoItem from "../modules/TodoItem";
import { NewTodoInput } from "../modules/NewTodoInput";
import { generateId } from "../../utilities";
import { useGoogleLogin, CodeResponse } from "@react-oauth/google";
import { get, post, put } from "../../utilities";
import { Task as TaskDocument } from "../../../../shared/types";

type Tasks = Array<TaskDocument>; // remember the TaskDocument extends from Document of mongoose

type Props = {
  userId?: string;
  handleLogin: (codeResponse: CodeResponse) => void;
  handleLogout: () => void;
};

const Todo = (props: Props) => {
  const [todos, setTodos] = useState<Tasks | undefined>([]);

  const addNewTodo = (newTodo: TaskDocument) => {
    todos ? setTodos([...todos, newTodo]) : setTodos([newTodo]);
  };

  const updateTodo = (id: string, finished: boolean, title?: string) => {
    if (!todos) return;
    const savedTasks: Tasks = [...todos];
    try {
      // update the task with defined data, keep undefined data as origin
      const targetTask = todos.find((task) => task._id === id);
      if (!targetTask) return;
      const updateData = {
        title: title || targetTask.title,
        finished: finished,
      };
      setTodos(
        todos.map((task: TaskDocument): TaskDocument => {
          if (task._id === id) {
            Object.keys(updateData).forEach((key) => {
              task[key] = updateData[key];
            });
          }
          return task;
        })
      );
      put(`/api/todo/${id}`, updateData);
    } catch (error) {
      console.error("Failed to update todo with the following error: ", error);
      setTodos(savedTasks);
    }
  };

  const deleteTodo = (id: string) => {
    if (todos) {
      setTodos(todos.filter((task) => task._id !== id));
    }
  };

  useEffect(() => {
    if (props.userId) {
      get("/api/todos").then((todos: TaskDocument[]) => setTodos(todos));
      console.log("Fetching todos");
    } else {
      console.log("Fetching nothing");
    }
  }, [props.userId]);

  // useGoogleLogin is a hook that returns a function that can be called to start the login flow
  // thus there is no need to define login as a "function"
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: props.handleLogin,
  });

  const emptyList: React.JSX.Element = (
    <p className="italic font-semibold">Empty! Add a new TODO now~</p>
  );
  let todoLists: React.JSX.Element[] = [emptyList];
  if (todos && todos.length > 0) {
    todoLists = todos.map((task: TaskDocument) => (
      <TodoItem
        task={task}
        updateFinished={updateTodo}
        deleteTodo={deleteTodo}
        key={task._id}
      ></TodoItem>
    ));
  } else {
    todoLists = [emptyList];
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-y-3">
      <h3 className="text-orange-400 py-1 px-5 font-bold text-3xl">Who's To-dos</h3>
      {props.userId ? (
        <>
          <button className="pb-1" onClick={props.handleLogout}>
            Logout
          </button>
          {todoLists}
          <NewTodoInput addTodo={addNewTodo}></NewTodoInput>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default Todo;
