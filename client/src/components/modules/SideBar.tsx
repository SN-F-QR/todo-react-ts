import React from "react";
import { useGoogleLogin, CodeResponse } from "@react-oauth/google";

type Props = {
  userId?: string;
  handleLogin: (codeResponse: CodeResponse) => void;
  handleLogout: () => void;
};

const SideBar = (props: Props) => {
  // useGoogleLogin is a hook that returns a function that can be called to start the login flow
  // thus there is no need to define login as a "function"
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: props.handleLogin,
  });

  return (
    <div className="fixed flex min-h-screen w-48 shrink-0 flex-col place-content-center border-r bg-white">
      <h1 className="place-self-center py-1 text-2xl font-bold text-orange-400">My Todos</h1>
      {props.userId ? (
        <button className="pb-1" onClick={props.handleLogout}>
          Logout
        </button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default SideBar;
