import React, { useState } from "react";
import validator from "validator";
import useForm from "../../../hooks/useForm";
import apiMain from "../../../utils/MainApi";
import { useNavigate, useLocation } from "react-router-dom";
import greenCirle from "../../../images/logo.svg";
import "./Register.css";
import { regexName } from '../../../utils/constants'

function Register({ updateContextValue }) {
  const location = useLocation();

  const [serverErrors, setServerErrors] = useState(null);
  const [errors, setErrors] = useState({});
  const [savedErrorValue, setSavedErrorValue] = useState(null);
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { value, name } = e.target;
    if (location.pathname === "/signin") {
      if (serverErrors) {
        setServerErrors(null);
      }
    }
    if (location.pathname === "/signup") {
      if (serverErrors && name === "email") {
        setServerErrors(null);
      }
      if (savedErrorValue === e.target.value) {
        setServerErrors("Пользователь с таким email уже существует.");
      }
    }
    const newErrors = { ...errors };

    handleChange(e);
    if (!value || value.trim() === " ") {
      newErrors[name] = "Это обязательное поле.";
    } else if (name === "email" && !validator.isEmail(value) && value) {
      newErrors[name] = "Некорректный адрес электронной почты";
    } else if (
      name === "name" &&
      !regexName.test(value) &&
      value
    ) {
      newErrors[name] =
        "Имя может содержать только латиницу, кириллицу, пробел или дефис";
    } else if (
      name === "name" &&
      regexName.test(value) &&
      (value.length < 2 || value.length > 30)
    ) {
      newErrors[name] = "Длина имени от 2 до 30 символов";
    } else {
      delete newErrors[e.target.name];
    }
    setErrors(newErrors);
  };
  const emptyInputReg = Object.values(values).some((value) => value === "");
  const emptyInputLog = Object.values(values).splice(1, Object.values(values).length).some((value) => value === "");
  const noErrors = Object.values(errors).length === 0;

  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate("/");
  };

  let buttonNames = [];
  let title = "";
  let inputs = [];

  if (location.pathname === "/signin") {
    buttonNames = ["Войти", "Еще не зарегистрированы?", " Регистрация"];
    title = "Рады видеть!";
    inputs = [
      { inputTitle: "E-mail", name: "email", type: "email", placeholder: "e-mail" },
      { inputTitle: "Пароль", name: "password", type: "password", placeholder: "пароль" },
    ];
  } else if (location.pathname === "/signup") {
    buttonNames = ["Зарегистрироваться", "Уже зарегистрированы?", " Войти"];
    title = "Добро пожаловать!";
    inputs = [
      { inputTitle: "Имя", name: "name", type: "text", placeholder: "имя" },
      { inputTitle: "E-mail", name: "email", type: "email", placeholder: "e-mail" },
      { inputTitle: "Пароль", name: "password", type: "password", placeholder: "пароль" },
    ];
  }

  const signupOrSignin = (e) => {
    e.preventDefault();
    if (location.pathname === "/signup") {
      apiMain
        .signUp(values)
        .then(() =>
          apiMain
            .signIn(values)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              apiMain.getUser(res.token)
              .then((res) => updateContextValue(res))
              .then(() => {
                localStorage.setItem("validated", true);
                navigate("/movies");
              })
              .catch((err) => {
                console.log(err);
                setServerErrors(
                  "При регистрации пользователя произошла ошибка."
                );
              })
           })
            .catch((err) => {
              setServerErrors("При регистрации пользователя произошла ошибка.");
              console.log(err);
            })
        )
        .catch((err) => {
          setSavedErrorValue(e.target[1].value);
          if (err.statusCode === 409) {
            setServerErrors("Пользователь с таким email уже существует.");
          } else {
            setServerErrors("При регистрации пользователя произошла ошибка.");
          }
        });
    } else if (location.pathname === "/signin") {

      apiMain.signIn(values)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        apiMain.getUser(res.token)
        .then((res) => {
          updateContextValue(res)})
          .then(() => {
            localStorage.setItem("validated", true);
            navigate("/movies")
          })
          .catch((err) => {
            console.log(err);
            setServerErrors(
              "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
            );
          })
      })
        .catch((err) => {
          if (!err.message.includes("авторизация")) {
            setServerErrors("Вы ввели неправильный логин или пароль.");
          } else {
            setServerErrors(
              "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
            );
          }
        });
    }
  };

  const onNavigateLoginOrRegister = () => {
    if (location.pathname === "/signup") {
      navigate("/signin");
    } else if (location.pathname === "/signin") {
      navigate("/signup");
    }
  };

  const checkValidity = () => {
    return (
      (location.pathname === "/signup" && (emptyInputReg || !noErrors)) ||
      (location.pathname === "/signin" && (emptyInputLog || !noErrors)) ||
      serverErrors
    );
  };

  return (
    <section className="register">
      <form
        className="register__form"
        onSubmit={signupOrSignin}
        noValidate
      >
        <img
          className="register__logo"
          src={greenCirle}
          alt="зеленый круг"
          onClick={onNavigateMain}
        />
        <h2 className="register__title">{title}</h2>
        {inputs.map((input, i) => {
          const { type, name, inputTitle } = input;
          return (
            <React.Fragment key={i}>
              <p className="register__input-title">{inputTitle}</p>
              <input
                type={type}
                className={`register__input ${
                  errors[name] && "register__input_type_error"
                }`}
                placeholder={` Введите ${input.placeholder}`}
                value={values[name]}
                onChange={onInputChange}
                name={name}
              />
              <p className="register__error">{errors[name]}</p>
            </React.Fragment>
          );
        })}

        <div className="register__server-error-container">
          <button
            type="submit"
            className={`register__button ${
              checkValidity() && "register__button_type_disabled"
            }`}
            disabled={checkValidity()}
          >
            {buttonNames[0]}
          </button>
          <p className="register__server-error">{serverErrors}</p>
        </div>

        <p className="register__text">
          {buttonNames[1]}
          <span
            className="register__text register__text_color_blue"
            onClick={onNavigateLoginOrRegister}
          >
            {buttonNames[2]}
          </span>
        </p>
      </form>
    </section>
  );
}

export default Register;
