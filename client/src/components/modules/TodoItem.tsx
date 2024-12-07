import React from "react";
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
  editing: boolean;
};

const TodoItem = (props: Props) => {
  const handleDeleteEvent = () => {
    props.deleteTodo(props.task._id);
  };

  return (
    <div className="flex space-x-1 px-5 py-1">
      <input
        className="h-4 w-4 place-self-center"
        type="checkbox"
        checked={props.task.finished}
        onChange={(e) => props.updateFinished(props.task._id, e.target.checked)}
      />
      <label className={`${props.task.finished ? "line-through" : ""} min-w-52 grow px-1`}>
        {props.task.title}
      </label>
      {props.editing && (
        <button className="w-6" onClick={handleDeleteEvent}>
          🗑️
        </button>
      )}
    </div>
  );
};

export default TodoItem;
