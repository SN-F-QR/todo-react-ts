import React, { useState, useEffect } from "react";
import { CodeResponse, CredentialResponse, useGoogleLogin } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Todo from "./pages/Todo";
import SideBar from "./modules/SideBar";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import { TaskFile } from "../../../shared/types";
import "../utilities.css";

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [taskFiles, setTaskFiles] = useState<TaskFile[] | undefined>([]);

  // useEffect executes from bottom to top!
  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // They are registed in the database and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  useEffect(() => {
    get("/api/taskfiles")
      .then((taskFiles: TaskFile[]) => {
        setTaskFiles(taskFiles);
        console.log(`Loaded Task files`);
      })
      .catch((err) => {
        console.log(`Failed to get task files with err info: ${err}`);
      });
  }, [userId]);

  /**
   * Get user's code from Google OAuth and send to server for exchange of token
   * Called by useGoogleLogin
   * @param codeResponse response from Google OAuth containing user's code
   */
  const handleLogin = (codeResponse: CodeResponse) => {
    const userCode = codeResponse.code;
    post("/api/login", { code: userCode }).then((user: User) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <SideBar
          userId={userId}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          fileName={taskFiles!.length > 0 ? taskFiles![0].name : "Loading"}
        />
        <div className="ml-48 w-full flex-auto flex-col gap-3 overflow-y-auto px-20 pt-5">
          <Routes>
            <Route element={<Todo userId={userId} taskFile={taskFiles![0]} />} path="/" />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
