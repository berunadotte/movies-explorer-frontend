import React from "react";
import "./AboutMe.css";
import "../AboutProject/AboutProject.css";
import Me from "../../../images/me.jpg";

const AboutMe = () => {
  return (
    <section className="about-me">
      <h3 id="student" className="title">
        Студент
      </h3>
      <div className="line" />
      <img className="about-me__me" src={Me} alt="Моё фото" />
      <h4 className="about-me__title">Виталий</h4>
      <h5 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h5>
      <p className="about-me__text">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <a
        className="about-me__github"
        href="https://github.com/berunadotte"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </section>
  );
};

export default AboutMe;
