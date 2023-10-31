import React from "react";
import Register from "../Register/Register";

function Login({ updateContextValue, onLoggedIn }) {
  return (
    <Register updateContextValue={updateContextValue} onLoggedIn={onLoggedIn} />
  );
}

export default Login;
