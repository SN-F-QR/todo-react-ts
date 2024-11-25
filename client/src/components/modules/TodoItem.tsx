import React, { useState } from "react";

/**
 * Component to render a todo item
 * @param _id of todo
 * @param content of todo
 * @param finished state of todo
 * @param deleteTodo
 */
type Props = {
  _id: string;
  content: string;
  finished: boolean;
  updateFinished: (id: string, finished: boolean) => void;
  deleteTodo: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const handleEvent = () => {
    props.deleteTodo(props._id);
  };

  return (
    <div className="py-2 px-5 space-x-1 border rounded-full bg-gray-100 border-gray-400 flex shadow-md">
      <input
        className="w-4 h-4 place-self-center"
        type="checkbox"
        checked={props.finished}
        onChange={(e) => props.updateFinished(props._id, e.target.checked)}
      />
      <label className={`${props.finished ? "line-through" : ""} min-w-52 place-self-center px-1 `}>
        {props.content}
      </label>
      <button className="border rounded-full w-6" onClick={handleEvent}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
