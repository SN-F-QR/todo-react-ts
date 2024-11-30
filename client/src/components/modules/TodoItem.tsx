import React, { useState } from "react";
import { Task as TaskDocument } from "../../../../shared/types";
/**
 * Component to render a todo item
 * @param task data for the todo item
 * @param updateFinished when user checks/unchecks the checkbox
 * @param deleteTodo
 */
type Props = {
  task: TaskDocument;
  updateFinished: (id: string, finished: boolean) => void;
  deleteTodo: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const handleDeleteEvent = () => {
    props.deleteTodo(props.task._id);
  };

  return (
    <div className="py-2 px-5 space-x-1 border rounded-full bg-gray-100 border-gray-400 flex shadow-md">
      <input
        className="w-4 h-4 place-self-center"
        type="checkbox"
        checked={props.task.finished}
        onChange={(e) => props.updateFinished(props.task._id, e.target.checked)}
      />
      <label
        className={`${props.task.finished ? "line-through" : ""} min-w-52 place-self-center px-1 `}
      >
        {props.task.title}
      </label>
      <button className="border rounded-full w-6" onClick={handleDeleteEvent}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
