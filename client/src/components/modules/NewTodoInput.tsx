import React, { useState } from "react";

const NewTodo = () => {};

const NewTextInput = () => {
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setValue("");
  };

  return (
    <div className="space-x-2 p-2">
      <input
        className="rounded-md py-1 border-2 focus:outline-blue500 border-gray-400 bg-gray-100 focus:outline-none focus:ring"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button
        className="rounded-md border-2 border-solid border-black border-opacity-40 py-1 px-3"
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
