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
        <p className="footer__text">Яндекс.Практикум</p>
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
