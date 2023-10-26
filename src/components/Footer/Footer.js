import React from "react";
import "./Footer.css";
import "../Main/AboutMe/AboutMe.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text footer__text_color_grey">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line" />
      <div className="footer__container">
        <p className="footer__text footer__text_type_year">©2023</p>
        <a
          className="footer__text footer__text_type_link"
          href="https://practicum.yandex.ru/"
          target="_blank"
          rel="noreferrer"
        >
          Яндекс.Практикум
        </a>
        <a
          className="footer__github"
          href="https://github.com/berunadotte"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
