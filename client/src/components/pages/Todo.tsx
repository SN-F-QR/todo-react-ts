import React, { useState } from "react";
import TodoItem from "../modules/TodoItem";
import { NewTodoInput } from "../modules/NewTodoInput";
import { generateId } from "../../utilities";
import { useGoogleLogin, CodeResponse } from "@react-oauth/google";

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

type Props = {
  userId?: string;
  handleLogin: (codeResponse: CodeResponse) => void;
  handleLogout: () => void;
};

const Todo = (props: Props) => {
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

  // useGoogleLogin is a hook that returns a function that can be called to start the login flow
  // thus there is no need to define login as a "function"
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: props.handleLogin,
  });

  let todoLists: React.JSX.Element[] = [
    <p className="italic font-semibold">Empty! Add a new TODO now~</p>,
  ];
  if (todos && todos.length > 0) {
    todoLists = todos.map((task: Task, index: number) => (
      <TodoItem
        _id={task._id}
        content={task.content}
        finished={task.finished}
        updateFinished={updateTodo}
        deleteTodo={deleteTodo}
        key={index}
      ></TodoItem>
    ));
  } else {
    todoLists = [<p className="italic font-semibold">Empty! Add a new TODO now~</p>];
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-y-3">
      <h3 className="text-orange-400 py-1 px-5 font-bold text-3xl">Who's To-dos</h3>
      {props.userId ? (
        <button onClick={props.handleLogout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      {todoLists}
      <NewTodoInput addTodo={addNewTodo}></NewTodoInput>
    </div>
  );
};

export default Todo;
