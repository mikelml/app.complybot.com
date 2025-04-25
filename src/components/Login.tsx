"use client";
import React from "react";
import "../app/login.css";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="login-body">
      <div className="ring">
        <i style={{ "--clr": "#00ff0a" } as React.CSSProperties}></i>
        <i style={{ "--clr": "#ff0057" } as React.CSSProperties}></i>
        <i style={{ "--clr": "#fffd44" } as React.CSSProperties}></i>
        <div className="login">
          <h2>Login</h2>
          <div className="inputBx">
            <input
              type="submit"
              onClick={() => signIn("github")}
              value="Github Access"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
