import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import greenCirle from "../../../images/logo.svg";
import "./Register.css";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate("/");
  };

  let loginOrRegisterButton = "";
  let buttonNames = [];
  let title = "";
  let inputs = [];

  if (location.pathname === "/signin") {
    loginOrRegisterButton = "register__button login__button_margin";
    buttonNames = ["Войти", "Еще не зарегистрированы?", " Регистрация"];
    title = "Рады видеть!";
    inputs = [
      { title: "E-mail", type: "email" },
      { title: "Пароль", type: "password" },
    ];
  } else if (location.pathname === "/signup") {
    loginOrRegisterButton = "register__button";
    buttonNames = ["Зарегистрироваться", "Уже зарегистрированы?", " Войти"];
    title = "Добро пожаловать!";
    inputs = [
      { title: "Имя", type: "text" },
      { title: "E-mail", type: "email" },
      { title: "Пароль", type: "password" },
    ];
  }

  const onNavigateFilmsOrLogin = () => {
    if (location.pathname === "/signup") {
      navigate("/signin");
    } else if (location.pathname === "/signin") {
      navigate("/movies");
    }
  };
  const onNavigateLoginOrRegister = () => {
    if (location.pathname === "/signup") {
      navigate("/signin");
    } else if (location.pathname === "/signin") {
      navigate("/signup");
    }
  };

  return (
    <section className="register">
      <div className="register__container">
        <img
          className="register__logo"
          src={greenCirle}
          alt="зеленый круг"
          onClick={onNavigateMain}
        />
        <h2 className="register__title">{title}</h2>
        {inputs.map((input, i) => {
          return (
            <React.Fragment key={i}>
              <p className="register__input-title">{input.title}</p>
              <input type={input.type} className="register__input" required min="2" max="30" />
            </React.Fragment>
          );
        })}
        <button
          type="button"
          onClick={onNavigateFilmsOrLogin}
          className={`${loginOrRegisterButton}`}
        >
          {buttonNames[0]}
        </button>
        <p className="register__text">
          {buttonNames[1]}
          <span
            className="register__text register__text_color_blue"
            onClick={onNavigateLoginOrRegister}
          >
            {buttonNames[2]}
          </span>
        </p>
      </div>
    </section>
  );
}

export default Register;
