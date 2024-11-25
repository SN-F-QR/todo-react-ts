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
    <div className="py-1 px-5 space-x-1">
      <input
        type="checkbox"
        checked={props.finished}
        onChange={(e) => props.updateFinished(props._id, e.target.checked)}
      />
      <label className={props.finished ? "line-through" : ""}>{props.content}</label>
      <button onClick={handleEvent}>X</button>
    </div>
  );
};

export default TodoItem;
