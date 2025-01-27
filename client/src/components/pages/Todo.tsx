import React, { useEffect, useState } from "react";
import { get, post, put, del } from "../../utilities";
import { TaskParent, TaskFile, Task } from "../../../../shared/types";
import TodoCard from "../modules/TodoCard";
import { NewCategoryInput } from "../modules/NewTodoInput";

type Props = {
  userId?: string;
  taskFile?: TaskFile;
};

const Todo = (props: Props) => {
  const [categories, setCategories] = useState<TaskParent[]>([]);
  const [createModel, setCreateModel] = useState<boolean>(false);

  // only update when the taskFile Id is known
  useEffect(() => {
    if (props.taskFile) {
      get(`/api/todos/categories/${props.taskFile!._id}`)
        .then((categories: TaskParent[]) => {
          setCategories(categories);
        })
        .catch((err) => {
          console.log(`Failed to get categories: ${err}`);
        });
    }
  }, [props.taskFile]);

  const addNewCardUI = (category: Task | TaskParent) => {
    if ("description" in category) {
      setCategories([...categories, category as TaskParent]);
      setCreateModel(false);
    }
  };

  const editDone = () => {
    setCreateModel(false);
  };

  const todoCardList = categories.map((category: TaskParent): React.JSX.Element => {
    return (
      <TodoCard
        userId={props.userId}
        categoryId={category._id}
        categoryTitle={category.title}
        key={category._id}
      />
    );
  });

  return (
    <div className="flex min-h-full flex-col space-y-2 pt-24">
      {props.userId && props.taskFile ? (
        <>
          <p className="text-4xl font-semibold">
            {props.taskFile.name.charAt(0).toUpperCase() + props.taskFile.name.slice(1)}
          </p>
          <div className="align-left flex space-x-3 font-medium">
            <button
              disabled={createModel}
              className="h-min rounded-full border border-solid border-gray-300 px-2 py-1 text-green-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setCreateModel(true)}
            >
              Create
            </button>
            <button className="h-min rounded-full border border-solid border-gray-300 px-2 py-1 text-gray-500 transition-colors hover:bg-gray-50">
              Edit
            </button>
          </div>
          {createModel && (
            <NewCategoryInput
              addTodo={addNewCardUI}
              parentId={props.taskFile._id}
              cancelEditModel={editDone}
            />
          )}
          {todoCardList}
        </>
      ) : (
        <p className="font-semibold italic">Login to see your todos~</p>
      )}
    </div>
  );
};

export default Todo;
