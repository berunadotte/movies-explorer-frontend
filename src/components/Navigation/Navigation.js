import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu/NavMenu";
import menu from "../../images/burger-menu.svg";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onNavigateRegister = () => {
    navigate("/signup");
  };
  const onNavigateLogin = () => {
    navigate("/signin");
  };
  const onNavigateFilms = () => {
    navigate("/movies");
  };
  const onNavigateSavedFilms = () => {
    navigate("/saved-movies");
  };
  const onNavigateProfile = () => {
    navigate("/profile");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const onMenuOpen = () => {
    setMenuOpen(true);
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

  let navigationContent;
  if (location.pathname === "/") {
    navigationContent = (
      <>
        <p className="navigation__link" onClick={onNavigateRegister}>
          Регистрация
        </p>
        <button
          className="navigation__button"
          type="button"
          onClick={onNavigateLogin}
        >
          Войти
        </button>
      </>
    );
  } else {
    navigationContent = (
      <>
        <div className="link__container">
          <a
            className={
              location.pathname === "/movies"
                ? "navigation__link-movies navigation__link-movies_active"
                : "navigation__link-movies"
            }
            onClick={onNavigateFilms}
            href="/movies"
          >
            Фильмы
          </a>
          <a
            className={
              location.pathname === "/saved-movies"
                ? "navigation__link-movies navigation__link-movies_active"
                : "navigation__link-movies"
            }
            onClick={onNavigateSavedFilms}
            href="/saved-movies"
          >
            Сохранённые фильмы
          </a>
        </div>
        <a
          className="profile__link"
          onClick={onNavigateProfile}
          href="/profile"
        >
          Аккаунт
        </a>

        {!menuOpen ? (
          <button className="navigation__menu_button">
            <img
              className="navigation__menu"
              src={menu}
              alt="меню"
              onClick={onMenuOpen}
            />
          </button>
        ) : (
          <NavMenu onMenuClose={onMenuClose} />
        )}
      </>
    );
  }
  return navigationContent;
};

export default Navigation;
