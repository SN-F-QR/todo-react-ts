import React, { useState, useEffect } from "react";
import { CodeResponse, CredentialResponse, useGoogleLogin } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Skeleton from "./pages/Skeleton";
import Todo from "./pages/Todo";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // TRhey are registed in the database and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

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
    console.log(`Logged in as `);
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Todo userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} />}
          path="/"
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
