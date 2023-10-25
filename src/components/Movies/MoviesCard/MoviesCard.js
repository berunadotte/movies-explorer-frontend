import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import saveButton from "../../../images/save-button.svg";
import cross from "../../../images/cross.svg";

const MoviesCard = ({ movieName, movieDuration, moviePicture }) => {
  const location = useLocation();
  return (
    <div className="movie-card">
      <img className="movie-card__pic" alt="постер фильма" src={moviePicture} />
      <img
        className={
          location.pathname === "/saved-movies"
            ? "movie-card__icon icon_delete"
            : "movie-card__icon icon_save"
        }
        alt="кнопка сохранить"
        src={location.pathname === "/saved-movies" ? cross : saveButton}
      />
      <div className="movie-card__description-container">
        <p className="movie-card__description">{movieName}</p>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
    </div>
  );
};

export default MoviesCard;
