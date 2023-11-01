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
  if (location.pathname === "/" &&
  localStorage.getItem('validated') !== 'true') {
    navigationContent = (
      <>
        <p className="header__navigation-link" onClick={onNavigateRegister}>
          Регистрация
        </p>
        <button
          className="header__navigation-button"
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
                ? "header__navigation-link-movies header__navigation-link-movies_active"
                : "header__navigation-link-movies"
            }
            onClick={onNavigateFilms}
            href="/movies"
          >
            Фильмы
          </a>
          <a
            className={
              location.pathname === "/saved-movies"
                ? "header__navigation-link-movies header__navigation-link-movies_active"
                : "header__navigation-link-movies"
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
          <button className="header__navigation-menu_button">
            <img
              className="header__navigation-menu"
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
