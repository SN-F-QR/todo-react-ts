import React, { useEffect, useState } from "react";
import { get, post, put, del } from "../../utilities";
import { TaskParent, TaskFile } from "../../../../shared/types";
import TodoCard from "../modules/TodoCard";

type Props = {
  userId?: string;
  taskFile?: TaskFile;
};

const Todo = (props: Props) => {
  const [categories, setCategories] = useState<TaskParent[]>([]);

  useEffect(() => {
    if (props.userId) {
      get(`/api/todos/categories/${props.taskFile!._id}`)
        .then((categories: TaskParent[]) => {
          setCategories(categories);
        })
        .catch((err) => {
          console.log(`Failed to get categories: ${err}`);
        });
    }
  }, []);

  const todoCardList = categories.map((category: TaskParent): React.JSX.Element => {
    return (
      <TodoCard
        userId={props.userId}
        mainTaskId={category._id}
        mainTaskTitle={category.title}
        key={category._id}
      />
    );
  });

  return (
    <div className="min-h-full p-1 flex flex-col">
      {props.userId && props.taskFile ? (
        <>
          <p className="text-2xl">
            {props.taskFile.name.charAt(0).toUpperCase() + props.taskFile.name.slice(1)}
          </p>
          {todoCardList}
        </>
      ) : (
        <p className="italic font-semibold">Login to see your todos~</p>
      )}
    </div>
  );
};

export default Todo;
