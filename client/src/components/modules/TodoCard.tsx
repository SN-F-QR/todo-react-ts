import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { NewTodoInput } from "./NewTodoInput";
import { Task as TaskDocument } from "../../../../shared/types";
import { get, post, put, del } from "../../utilities";
import TodoItem from "./TodoItem";

type Tasks = Array<TaskDocument>; // remember the TaskDocument extends from Document of mongoose

type Props = {
  userId?: string;
  mainTaskId: string;
};

const TodoCard = (props: Props) => {
  const [todos, setTodos] = useState<Tasks | undefined>([]);

  const [creatingNewTodo, setCreatingNewTodo] = useState<boolean>(false);
  const newTodoInputRef = useRef<HTMLInputElement>(null); // a reference to the create Todo field
  const switchCreating = () => {
    if (editing) {
      return;
    }
    // !!important!! use flushSync to update the DOM immediately
    flushSync(() => {
      setCreatingNewTodo(!creatingNewTodo);
    });
    if (!creatingNewTodo && newTodoInputRef.current) {
      newTodoInputRef.current.focus();
    }
  };

  const [editing, setEditing] = useState<boolean>(false);
  const switchEditing = () => {
    if (creatingNewTodo) {
      return;
    }
    setEditing(!editing);
  };

  const editDone = () => {
    setEditing(false);
    setCreatingNewTodo(false);
  };

  const addNewTodo = (newTodo: TaskDocument) => {
    todos ? setTodos([...todos, newTodo]) : setTodos([newTodo]);
    if (newTodoInputRef.current) {
      newTodoInputRef.current.focus();
    }
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

  const deleteTodo = async (id: string) => {
    if (!todos) {
      return;
    }
    const savedTasks: Tasks = [...todos];
    try {
      setTodos(todos.filter((task) => task._id !== id));
      await del(`/api/todo/${id}`);
    } catch (err) {
      setTodos(savedTasks);
      console.error(`Failed to delete todo with the following error: ${err}`);
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
        editing={editing}
        key={task._id}
      ></TodoItem>
    ));
  } else {
    todoLists = [emptyList];
  }

  return (
    <div className="flex-col">
      <div className="flex py-1 px-5 mt-1 text-lg font-semibold text-blue-300">
        <h3 className="text-wrap ">Study</h3>
        <div className="flex ml-auto mr-1 space-x-3 items-center text-nowrap content-center">
          {!creatingNewTodo && !editing && (
            <>
              <button onClick={switchCreating}>+</button>{" "}
              <button onClick={switchEditing}>...</button>
            </>
          )}
          {(creatingNewTodo || editing) && (
            <button
              className="text-sm border rounded-lg border-solid border-gray-300 px-1  text-blue-300 hover:text-blue-500 shadow-sm"
              onClick={editDone}
            >
              Done
            </button>
          )}
        </div>
      </div>
      <div className="mx-5 h-[1px] bg-gray-300"></div>
      <div className="pb-2"></div>
      {todoLists}
      {creatingNewTodo && <NewTodoInput ref={newTodoInputRef} addTodo={addNewTodo}></NewTodoInput>}
    </div>
  );
};

export default TodoCard;
