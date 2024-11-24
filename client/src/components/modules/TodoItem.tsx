import React, { useState } from "react";

/**
 * Component to render a todo item
 * @param {string} _id of todo
 * @param {string} content of todo
 * @param {boolean} finished state of todo
 */
type Props = {
  _id?: string;
  content: string;
  finished: boolean;
};

const TodoItem = (props: Props) => {
  const [finished, setFinished] = useState<boolean | undefined>(props.finished);
  return (
    <div>
      <input type="checkbox" checked={finished} onChange={(e) => setFinished(e.target.checked)} />
      <label>{props.content}</label>
      <div>Delete</div>
    </div>
  );
};

export default TodoItem;
