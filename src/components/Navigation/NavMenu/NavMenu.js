import React from "react";
import "./NavMenu.css";
import { useNavigate, useLocation } from "react-router-dom";

const NavMenu = ({ onMenuClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onNavigateMain = () => {
    navigate("/");
  };

  const onNavigateProfile = () => {
    navigate("/profile");
  };

  const onNavigateMovies = () => {
    navigate("/movies");
  };

  const onNavigateSavedMovies = () => {
    navigate("/saved-movies");
  };
  return (
    <div className="nav-menu-container">
      <div className="nav-menu">
        <button
          className="nav-menu__button-close"
          onClick={onMenuClose}
        ></button>

        <a className="nav-menu__text" onClick={onNavigateMain} href="/">
          Главная
        </a>
        <a
          className={
            location.pathname === "/movies"
              ? "nav-menu__text nav-menu__text_active"
              : "nav-menu__text"
          }
          onClick={onNavigateMovies}
          href="/movies"
        >
          Фильмы
        </a>
        <a
          className={
            location.pathname === "/saved-movies"
              ? "nav-menu__text nav-menu__text_active"
              : "nav-menu__text"
          }
          onClick={onNavigateSavedMovies}
          href="/saved-movies"
        >
          Сохранённые фильмы
        </a>
        <a
          className="profile__link_menu"
          onClick={onNavigateProfile}
          href="/profile"
        >
          Аккаунт
        </a>
      </div>
    </div>
  );
};

export default NavMenu;
