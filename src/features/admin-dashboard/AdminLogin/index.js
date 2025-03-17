import React, { useState } from "react";
import "./index.css";
import SignInForm from "./Components/SignIn";
import { useMediaQuery } from "@mui/material";
// import SignUpForm from "../SignUp";

export default function AdminLogin() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const isMobile = useMediaQuery("(max-width: 768px)");

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App11">
      {/* <h2>Sign in/up Form</h2> */}
      <div className={containerClass} id="container">
        {/* <SignUpForm /> */}
        <SignInForm />
        {!isMobile&& <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
            <img
              alt="logo"
              className="nav-logo"
              src="/assets/img/logo.png"
              style={{ cursor: "pointer" }}
                />
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              {/* <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button> */}
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}