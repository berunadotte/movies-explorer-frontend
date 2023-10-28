import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate("/");
  };
  return (
    <section className="error">
      <h2 className="error__title">404</h2>
      <p className="error__text">Страница не найдена</p>
      <a className="error__link" onClick={onNavigateMain} href="/" >
        Назад
      </a>
    </section>
  );
};

export default Error;
