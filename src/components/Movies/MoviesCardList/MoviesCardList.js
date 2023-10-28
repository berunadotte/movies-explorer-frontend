import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import moviePicture from "../../../images/moviePicture.png";

const MoviesCardList = () => {
  const location = useLocation();
  const movie = {
    movieName: "Gimme Danger: История Игги и The Stooges",
    movieDuration: "1ч17м",
    moviePicture,
  };
  const movies = Array.from({ length: 12 }, () => movie);
  const savedMovies = Array.from({ length: 3 }, () => movie);

  const [elseButton, setElseButton] = useState(false);
  useEffect(() => {
    if (location.pathname === "/movies" && movies.length < 12) {
      setElseButton(false);
    } else if (
      location.pathname === "/saved-movies" &&
      savedMovies.length < 12
    ) {
      setElseButton(false);
    } else {
      setElseButton(true);
    }
  }, [location.pathname, movies.length, savedMovies.length]);

  const renderMovies = (movies) => {
    let maxMoviesToShow = 12;
    const screenWidth = window.innerWidth;
    if (screenWidth <= 850) {
      maxMoviesToShow = 8;
    }
    if (screenWidth <= 450) {
      maxMoviesToShow = 5;
    }
    const slicedMovies = movies.slice(0, maxMoviesToShow);
    return slicedMovies.map((movie, index) => (
      <MoviesCard
        key={index}
        movieName={movie.movieName}
        movieDuration={movie.movieDuration}
        moviePicture={movie.moviePicture}
      />
    ));
  };

  return (
    <section className="movies">
      <div className="movies-container">
        {location.pathname === "/movies"
          ? renderMovies(movies)
          : renderMovies(savedMovies)}
      </div>
      <div className="movies-container_button-container">
        <div>
          {elseButton && (
            <button className="movies-container__button" type="button">
              Ещё
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoviesCardList;
