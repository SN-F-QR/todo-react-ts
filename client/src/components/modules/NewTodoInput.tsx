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
    <div className="">
      <div className="flex px-5 py-3 justify-between space-x-1 items-center h-4">
        <button className="border border-dotted border-black h-4 w-4 hover:cursor-default"></button>
        <input
          className="px-1 grow border-b focus:outline-blue500 focus:outline-none placeholder:italic text-base"
          type="text"
          value={value}
          placeholder={props.defaultText}
          onChange={handleChange}
        />
        <button
          className="h-6 border rounded-lg border-solid border-gray-300 px-2 shadow-md text-green-400 hover:text-green-600"
          type="submit"
          onClick={handleSubmit}
          value="Add"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NewTextInput;
