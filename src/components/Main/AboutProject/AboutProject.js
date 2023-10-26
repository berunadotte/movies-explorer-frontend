import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="about-project">
      <h3 id="project" className="section__title">
        О проекте
      </h3>
      <div className="line" />
      <div className="about-project__grid-description">
        <div>
          <h4 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div>
          <h4 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__grid-duration">
        <p className="about-project__back-duration">1 неделя</p>
        <p className="about-project__front-duration">4 недели</p>
        <p className="about-project__work-type">Back-end</p>
        <p className="about-project__work-type">Front-end</p>
      </div>
    </section>
  );
};
export default AboutProject;
