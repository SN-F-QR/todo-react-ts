import React, { useState } from "react";

/**
 * Component to render a todo item
 * @param {string} _id of todo
 * @param {string} content of todo
 * @param {boolean} finished state of todo
 */
type Props = {
  _id: string;
  content: string;
  finished: boolean;
  deleteTodo: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const [finished, setFinished] = useState<boolean | undefined>(props.finished);
  const handleEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.deleteTodo(props._id);
  };

  return (
    <div className="py-1 px-5 space-x-1">
      <input type="checkbox" checked={finished} onChange={(e) => setFinished(e.target.checked)} />
      <label>{props.content}</label>
      <button onClick={handleEvent}>X</button>
    </div>
  );
};

export default TodoItem;
