import React from "react";
import "./NavMenu.css";
import { useNavigate, useLocation } from "react-router-dom";
import cross from "../../../images/cross_menu.svg";

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
        <img
          src={cross}
          alt="закрыть"
          className="nav-menu__cross"
          onClick={onMenuClose}
        />
        <p className="nav-menu__text" onClick={onNavigateMain}>
          Главная
        </p>
        <p
          className={
            location.pathname === "/movies"
              ? "nav-menu__text nav-menu__text_active"
              : "nav-menu__text"
          }
          onClick={onNavigateMovies}
        >
          Фильмы
        </p>
        <p
          className={
            location.pathname === "/saved-movies"
              ? "nav-menu__text nav-menu__text_active"
              : "nav-menu__text"
          }
          onClick={onNavigateSavedMovies}
        >
          Сохранённые фильмы
        </p>
        <p
          className="profile__link profile__link_menu"
          onClick={onNavigateProfile}
        >
          Аккаунт
        </p>
      </div>
    </div>
  );
};

export default NavMenu;
