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
    <div className="space-x-2">
      <input
        className="bg-gray-100 rounded-2xl border-5 border-gray-400 focus:outline-none focus:ring focus:border-blue500 "
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button
        className="rounded-2xl border-3 border-solid border-slate-300 "
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
