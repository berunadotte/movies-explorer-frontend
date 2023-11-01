import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import saveButton from "../../../images/save-button.svg";
import cross from "../../../images/cross.svg";
import apiMain from "../../../utils/MainApi";
import savedMovie from "../../../images/saved.svg";

const MoviesCard = ({
  movieName,
  movieDuration,
  moviePicture,
  trailerLink,
  movieId,
  deleteMovie,
  savedMovies,
  isSaved,
  onSearchedSavedMovies,
  searchedSavedMovies,
}) => {
  const location = useLocation();

  const onClickSave = (e) => {
    const token = localStorage.getItem("jwt");
    const chosenMovie = e.target.closest("div");
    if (location.pathname === "/movies") {
      const savedFilteredMovies = JSON.parse(
        localStorage.getItem("filteredMovies")
      );
      if (e.target.src.includes("save-button")) {
        const savedMovie = savedFilteredMovies.filter(
          (movie) => movie.id === Number(chosenMovie.id)
        );
        apiMain
          .addMovie(savedMovie[0], token)
          .then(() => {
            localStorage.setItem(
              "filteredMovies",
              JSON.stringify(
                savedFilteredMovies.reduce((arr, movie, i) => {
                  arr.push(movie);
                  if (movie.id === Number(chosenMovie.id)) {
                    arr[i].saved = true;
                  }
                  return arr;
                }, [])
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (e.target.src.includes("saved")) {
        apiMain
          .getMovies(token)
          .then((res) => {
            const savedMovie = res.filter(
              (movie) => movie.movieId === Number(chosenMovie.id)
            )[0];
            apiMain
              .deleteCardFromServer(savedMovie._id, token)
              .then(() => {
                localStorage.setItem(
                  "filteredMovies",
                  JSON.stringify(
                    savedFilteredMovies.reduce((arr, movie, i) => {
                      arr.push(movie);
                      if (movie.id === savedMovie.movieId) {
                        arr[i].saved = false;
                      }
                      return arr;
                    }, [])
                  )
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    } else if (location.pathname === "/saved-movies") {
      apiMain
        .deleteCardFromServer(
          savedMovies.filter(
            (movie) => movie.movieId === Number(chosenMovie.id)
          )[0]._id,
          token
        )
        .then(() => {
          deleteMovie(
            savedMovies.filter(
              (movie) => movie.movieId !== Number(chosenMovie.id)
            )
          );
          const filteredMovies = JSON.parse(
            localStorage.getItem("filteredMovies")
          );
          const updatedMovies = filteredMovies.map((movie) => {
            if (movie.id === Number(chosenMovie.id)) {
              movie.saved = false;
            }
            return movie;
          });
          if (searchedSavedMovies) {
            console.log(
              searchedSavedMovies.filter(
                (movie) => movie.movieId !== Number(chosenMovie.id)
              )
            );
            console.log(1);
            onSearchedSavedMovies(
              searchedSavedMovies.filter(
                (movie) => movie.movieId !== Number(chosenMovie.id)
              )
            );
          }
          localStorage.setItem("filteredMovies", JSON.stringify(updatedMovies));
        })
        .catch((err) => console.log(err));
      isSaved = false;
    }
  };

  return (
    <div className="movie-card" id={movieId}>
      <a
        href={trailerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="movie-card__link"
      >
        <img
          className="movie-card__pic"
          alt="постер фильма"
          src={moviePicture}
        />
      </a>
      <img
        className={
          location.pathname === "/saved-movies"
            ? "movie-card__icon icon_delete"
            : isSaved
            ? "icon_saved"
            : "movie-card__icon"
        }
        alt="кнопка сохранить"
        src={
          location.pathname === "/saved-movies"
            ? cross
            : isSaved
            ? savedMovie
            : saveButton
        }
        onClick={onClickSave}
      />
      <div className="movie-card__description-container">
        <p className="movie-card__description">{movieName}</p>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
    </div>
  );
};

export default MoviesCard;
