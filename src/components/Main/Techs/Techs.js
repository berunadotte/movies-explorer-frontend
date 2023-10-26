import React from 'react';
import './Techs.css';
import '../AboutProject/AboutProject.css';

const Techs = () => {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB']

  return (
    <section className="techs">
      <h3 id="technologies" className="techs__section-title">
        Технологии
      </h3>
      <div className="line" />
      <h4 className="techs__title">7 технологий</h4>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__container">
        {techs.map((tech) => {
          return <div className="techs__name">{tech}</div>;
        }
        )}
      </div>
    </section>
  );
};

export default Techs;
