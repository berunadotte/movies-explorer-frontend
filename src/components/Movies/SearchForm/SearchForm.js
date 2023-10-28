import React from "react";
import "./SearchForm.css";
import "../../Main/AboutMe/AboutMe.css";
import "../../Main/AboutProject/AboutProject.css";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input type="text" placeholder="Фильм" className="search__input" />
        <button type="button" className="search__button"></button>
      </form>
      <div className="search__tumb-container">
        <button className="search__tumb_button"/>
        <p className="search__text">Короткометражки</p>
      </div>
      <div className="search__line" />
    </section>
  );
}

export default SearchForm;
