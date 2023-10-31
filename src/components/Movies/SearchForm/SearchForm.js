import React from "react";
import { useLocation } from "react-router-dom";
import useFormValidation from "../../../hooks/useForm";
import "./SearchForm.css";
import "../../Main/AboutMe/AboutMe.css";
import "../../Main/AboutProject/AboutProject.css";

function SearchForm({
  onSubmitSearch,
  onTumbClick,
  tumbValue,
  savedPrintedString,
}) {
  const location = useLocation();
  const { values, handleChange } = useFormValidation({
    searchForm: location.pathname === "/movies" ? savedPrintedString : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(values.searchForm);
  };

  const handleClick = () => {
    onTumbClick(values.searchForm);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фильм"
          className="search__input"
          onChange={handleChange}
          value={values.searchForm ? values.searchForm : ""}
          name="searchForm"
        />
        <button type="submit" className="search__button"></button>
      </form>
      <div className="search__tumb-container">
        <button
          className={`search__tumb_button ${
            tumbValue
              ? "search__tumb_button_type_on"
              : "search__tumb_button_type_off"
          }`}
          onClick={handleClick}
          alt="переключатель"
        />
        <p className="search__text">Короткометражки</p>
      </div>
      <div className="search__line" />
    </section>
  );
}

export default SearchForm;
