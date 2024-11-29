import React, { useState } from "react";
import { Task as TaskDocument } from "../../../../shared/types";
import { post } from "../../utilities";

type TaskData = {
  title: string;
  finished: boolean;
};

/**
 * Component to create a new todo
 * @param {function} addTodo update the todo lists when adding
 */
type NewTodoProps = {
  addTodo: (todo: TaskDocument) => void;
};
export const NewTodoInput = (props: NewTodoProps) => {
  const postNewTodo = (text: string) => {
    const newTodo: TaskData = {
      title: text,
      finished: false,
    };
    const postTodo = async (newTodo: TaskData) => {
      const newTodoDocument: TaskDocument = await post("/api/todo", newTodo);
      props.addTodo(newTodoDocument);
    };
    postTodo(newTodo);
  };
  return <NewTextInput defaultText="Create Todos..." onSubmit={postNewTodo} />;
};

/**
 * Component to render a new text input
 * @param {string} defaultText of input
 * @param {function} onSubmit function to call when submitting
 */
type Prop = {
  defaultText: string;
  onSubmit: (text: string) => void;
};
const NewTextInput = (props: Prop) => {
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="space-x-9 p-3">
      <input
        className="py-2 px-3 border-2 focus:outline-blue500 rounded-full border-gray-400 bg-gray-100 focus:outline-none focus:ring placeholder:italic text-base shadow-md"
        type="text"
        value={value}
        placeholder={props.defaultText}
        onChange={handleChange}
      />
      <button
        className="border-2 rounded-full border-solid border-black border-opacity-40 py-2 px-5 shadow-md"
        type="submit"
        onClick={handleSubmit}
        value="Add"
      >
        Add
      </button>
    </div>
  );
};

export default NewTextInput;
