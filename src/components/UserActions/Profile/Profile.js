import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./Profile.css";
import validator from "validator";
import mainApi from "../../../utils/MainApi";
import useForm from "../../../hooks/useForm";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import Popup from "../../Popup/Popup";
import { regexName } from "../../../utils/constants";

const Profile = ({ updateContextValue }) => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [popupMessage, setPopupMessage] = useState("");
  const [resultName, setResultName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitErr, setSubmitErr] = useState("");
  const [popupState, setPopupState] = useState(false);
  const { values, handleChange, setValues } = useForm({ name: "", email: "" });
  const emptyInput = Object.values(values).some((value) => value === "");

  const closePopup = () => {
    setTimeout(() => setPopupState(false), 2000);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    handleChange(e);
    setSubmitErr("");
    if (!value || value.trim() === " ") {
      newErrors[name] = "Это обязательное поле.";
    } else if (name === "email" && !validator.isEmail(value) && value) {
      newErrors[name] = "Некорректный адрес электронной почты.";
    } else if (name === "name" && !regexName.test(value) && value) {
      newErrors[name] =
        "Имя может содержать только латиницу, кириллицу, пробел или дефис.";
    } else if (
      name === "name" &&
      regexName.test(value) &&
      (value.length < 2 || value.length > 30)
    ) {
      newErrors[name] = "Длина имени от 2 до 30 символов.";
    } else {
      delete newErrors[e.target.name];
    }
    setErrors(newErrors);
  };

  const noErrors = Object.values(errors).length === 0;

  const signOut = () => {
      localStorage.clear();
      navigate("/");
  };

  const [saveButton, setSaveButton] = useState(false);
  const onChangeButton = () => {
    setSaveButton(true);
    setValues({ name: resultName, email });
  };
  const onSaveButton = () => {
    setSaveButton(false);
  };

  const onSubmitInfo = (e) => {
    const token = localStorage.getItem('jwt')
    e.preventDefault();
    mainApi
      .changeUserInfo(values.name, values.email, token)
      .then(() => {
        setResultName(values.name);
        setEmail(values.email);
        updateContextValue(values);
        setSaveButton(false);
        setPopupMessage("Данные успешно изменены.");
        setPopupState(true);
        closePopup();
        setValues({ name: "", email: "" });
      })
      .catch((err) => {
        setPopupMessage("Что-то пошло не так");
        setPopupState(true);
        closePopup();
        if (err.statusCode === 400) {
          setSubmitErr(err.message);
        } else if (err.statusCode === 401) {
          localStorage.clear();
          navigate("/");
        } else {
          setSubmitErr("При обновлении профиля произошла ошибка.");
        }
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentUser) {
      setResultName(currentUser.name);
      setEmail(currentUser.email);
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      updateContextValue(user);
      setEmail(user.email);
      setResultName(user.name);
    }
  }, [currentUser, updateContextValue]);

  useEffect(() => {
    if (values.name === resultName && values.email === email) {
      setSubmitErr("Данные не изменены.");
    }
  }, [email, resultName, values.email, values.name]);

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__header ">Привет, {` ${resultName}`}!</h2>
        <form className="profile__form" noValidate onSubmit={onSubmitInfo}>
          <div className="profile__input-container">
            <input
              type="text"
              className="profile__input"
              placeholder="Имя"
              disabled={!saveButton}
              name="name"
              value={values.name}
              onChange={onInputChange}
            />
            <p className="register__error" style={{ margin: 0 }}>
              {errors.name}
            </p>
            <p className="profile__input-result">{resultName}</p>
          </div>
          <div className="profile__line" />
          <div className="profile__input-container">
            <input
              type="text"
              className="profile__input"
              placeholder="E-mail"
              disabled={!saveButton}
              name="email"
              value={values.email}
              onChange={onInputChange}
            />
            <p className="register__error" style={{ margin: 0 }}>
              {errors.email}
            </p>
            <p className="profile__input-result">{email}</p>
          </div>
          {saveButton && (
            <div className="register__server-error-container">
              <button
                type="submit"
                className={`register__button profile__change_margin ${
                  (!noErrors || submitErr || emptyInput) &&
                  "register__button_type_disabled"
                }`}
                disabled={!noErrors || submitErr || emptyInput}
              >
                Сохранить
              </button>
              <p className="register__server-error">{submitErr}</p>
            </div>
          )}
        </form>
          <>
            <button
              type="button"
              className="profile__change"
              onClick={onChangeButton}
            >
              Редактировать
            </button>
              <button type="button" className="profile__exit" onClick={signOut}>
                Выйти из аккаунта
              </button>
          </>
      </section>
      {popupState && <Popup message={popupMessage} />}
    </>
  );
};

export default Profile;
