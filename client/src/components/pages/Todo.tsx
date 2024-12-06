import React, { useEffect, useState } from "react";
import { NewTodoInput } from "../modules/NewTodoInput";
import { get, post, put, del } from "../../utilities";
import { Task as TaskDocument } from "../../../../shared/types";
import TodoCard from "../modules/TodoCard";

type Props = {
  userId?: string;
};

const Todo = (props: Props) => {
  return (
    <div className="min-h-full p-1 flex flex-col">
      {props.userId ? (
        <>
          <TodoCard userId={props.userId} mainTaskId="Study" />
        </>
      ) : (
        <p className="italic font-semibold">Login to see your todos~</p>
      )}
    </div>
  );
};

export default Todo;
