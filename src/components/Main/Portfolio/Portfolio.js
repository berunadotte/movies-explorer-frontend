import React from "react";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <div className="portfolio__link-container">
        <a
          className="portfolio__link"
          href="https://berunadotte.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
        </a>
        <a
          className="portfolio__link-arrow"
          href="https://berunadotte.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
        >
          ↗
        </a>
      </div>
      <div className="portfolio__line" />
      <div className="portfolio__link-container">
        <a
          className="portfolio__link"
          href="https://berunadotte.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
        </a>
        <a
          className="portfolio__link-arrow"
          href="https://berunadotte.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
        >
          ↗
        </a>
      </div>
      <div className="portfolio__line" />
      <div className="portfolio__link-container">
        <a
          className="portfolio__link"
          href="https://berunadotte.github.io/mesto/"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
        </a>
        <a
          className="portfolio__link-arrow"
          href="https://berunadotte.github.io/mesto/"
          target="_blank"
          rel="noreferrer"
        >
          ↗
        </a>
      </div>
      <div className="portfolio__line" />
    </section>
  );
};

export default Portfolio;
