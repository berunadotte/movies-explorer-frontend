import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import greenCirle from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <a className="header__link" href="/">
      <img
        className="header__image"
        src={greenCirle}
        alt="зеленый круг"
        onClick={onNavigateMain}
      />
      </a>
      <Navigation />
    </header>
  );
}

export default Header;
