import React from "react";
import Register from "../Register/Register";

function Login({ updateContextValue }) {
  return (
    <Register updateContextValue={updateContextValue} />
  );
}

export default Login;
