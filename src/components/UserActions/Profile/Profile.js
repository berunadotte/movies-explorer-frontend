import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
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
        <button type="button" className="profile__change">
          Редактировать
        </button>
        <button type="button" className="profile__exit" onClick={logOut}>
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
};

export default Profile;
