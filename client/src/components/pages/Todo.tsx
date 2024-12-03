import React, { useEffect, useState } from "react";
import TodoItem from "../modules/TodoItem";
import { NewTodoInput } from "../modules/NewTodoInput";
import { get, post, put, del } from "../../utilities";
import { Task as TaskDocument } from "../../../../shared/types";

type Tasks = Array<TaskDocument>; // remember the TaskDocument extends from Document of mongoose

type Props = {
  userId?: string;
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
        key={task._id}
      ></TodoItem>
    ));
  } else {
    todoLists = [emptyList];
  }

  return (
    <div className="min-h-full p-1 flex flex-col">
      {props.userId ? (
        <>
          <div className="flex-col">
            <h3 className="text-wrap py-1 px-5 mt-1 text-lg font-semibold text-blue-300">Study</h3>
            <div className="mx-5 h-[1px]  bg-gray-300"></div>
            <div className="pb-2"></div>
            {todoLists}
          </div>
          <NewTodoInput addTodo={addNewTodo}></NewTodoInput>
        </>
      ) : (
        <p className="italic font-semibold">Login to see your todos~</p>
      )}
    </div>
  );
};

export default Todo;
