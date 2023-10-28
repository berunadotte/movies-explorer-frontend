import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
  };

  const [saveButton, setSaveButton] = useState(false);
  const onChangeButton = () => {
    setSaveButton(true);
  };
  const onSaveButton = () => {
    setSaveButton(false);
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__header ">Привет, Виталий!</h2>
        <form className="profile__form">
          <div className="profile__input-container">
            <input type="text" className="profile__input" placeholder="Имя" />
            <p className="profile__input-result">Виталий</p>
          </div>
          <div className="profile__line" />
          <div className="profile__input-container">
            <input
              type="text"
              className="profile__input"
              placeholder="E-mail"
            />
            <p className="profile__input-result">pochta@yandex.ru</p>
          </div>
        </form>
        {!saveButton ? (
          <>
            <button
              type="button"
              className="profile__change"
              onClick={onChangeButton}
            >
              Редактировать
            </button>
            <a className="profile__exit_link" href="/">
              <button type="button" className="profile__exit" onClick={logOut}>
                Выйти из аккаунта
              </button>
            </a>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onSaveButton}
              className="profile__save-button"
            >
              Сохранить
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default Profile;
