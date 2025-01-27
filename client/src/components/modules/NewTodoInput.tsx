import React, { forwardRef, useRef, useState } from "react";
import { Document } from "mongoose";
import { Task as TaskDocument, TaskParent } from "../../../../shared/types";
import { post } from "../../utilities";

type TaskData = {
  title: string;
  finished: boolean;
};

type TaskCategoryData = {
  title: string;
  description: string;
  parent: string;
};

/**
 * Component to create a new todo
 * @param {function} addTodo update the todo lists when adding
 */
type NewTodoProps = {
  addTodo: (todo: TaskDocument | TaskParent) => void;
  parentId: string;
  cancelEditModel: () => void;
};
export const NewTodoInput = forwardRef(
  (props: NewTodoProps, ref: React.ForwardedRef<HTMLInputElement | null>) => {
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
    return (
      <NewTextInput
        ref={ref}
        defaultText="Create Todos..."
        onSubmit={postNewTodo}
        onCancel={props.cancelEditModel}
      />
    );
  }
);

export const NewCategoryInput = forwardRef(
  (props: NewTodoProps, ref: React.ForwardedRef<HTMLInputElement | null>) => {
    const postNewCategory = (text: string) => {
      const newCategory: TaskCategoryData = {
        title: text,
        description: "",
        parent: props.parentId,
      };
      post("/api/todo/category", newCategory).then((res: TaskParent) => {
        props.addTodo(res);
      });
    };
    return (
      <NewTextInput
        ref={ref}
        defaultText="Create Category..."
        onSubmit={postNewCategory}
        onCancel={props.cancelEditModel}
      />
    );
  }
);

/**
 * Component to render a new text input
 * @param {string} defaultText of input
 * @param {function} onSubmit function to call when submitting
 */
type Prop = {
  defaultText: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
};
const NewTextInput = forwardRef((props: Prop, ref: React.ForwardedRef<HTMLInputElement | null>) => {
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="">
      <div className="flex h-4 items-center justify-between space-x-1 px-5 py-3">
        <button className="h-4 w-4 rounded-sm border border-dotted border-black hover:cursor-default"></button>
        <input
          className="focus:outline-blue500 grow border-b px-1 text-base placeholder:italic focus:outline-none"
          type="text"
          ref={ref}
          value={value}
          placeholder={props.defaultText}
          onChange={handleChange}
        />
        <button
          className="py-min rounded-full border border-solid border-gray-300 px-2 font-medium text-green-500 hover:bg-gray-50"
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
        <button
          className="py-min rounded-full border border-solid border-gray-300 px-2 font-medium text-red-500 hover:bg-gray-50"
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

export default NewTextInput;
