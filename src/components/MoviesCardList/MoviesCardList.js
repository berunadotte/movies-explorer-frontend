import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = ({
  searchedMovies,
  clickCounter,
  setClickCounter,
  savedMovies,
  savedFilteredMovies,
  searchedSavedMovies,
  isSearched,
  deleteMovie,
  onSearchedSavedMovies,
}) => {
  const location = useLocation();

  const [maxMoviesToShow, setMaxMoviesToShow] = useState(null);
  let screenWidth = window.innerWidth;
  const updateMaxMoviesToShow = (screenWidth) => {
    if (screenWidth > 1275) {
      setMaxMoviesToShow(12);
    } else if (screenWidth > 768) {
      setMaxMoviesToShow(8);
    } else if (screenWidth > 450) {
      setMaxMoviesToShow(5);
    } else {
      setMaxMoviesToShow(5);
    }
  };

  const [elseButton, setElseButton] = useState(false);

  const renderElseButton = useCallback(
    (moviesList) => {
      const slicedMovies = moviesList.slice(0, maxMoviesToShow);
      if (maxMoviesToShow > slicedMovies.length) {
        setElseButton(false);
      } else if (location.pathname === "/movies") setElseButton(true);
    },
    [maxMoviesToShow, location.pathname]
  );

  const onClickElseButton = () => {
    setClickCounter((prevClickCounter) => prevClickCounter + 1);
    if (screenWidth > 1275) {
      setMaxMoviesToShow((prevMaxMoviesToShow) => prevMaxMoviesToShow + 3);
    } else if (screenWidth > 768) {
      setMaxMoviesToShow((prevMaxMoviesToShow) => prevMaxMoviesToShow + 2);
    } else {
      setMaxMoviesToShow((prevMaxMoviesToShow) => prevMaxMoviesToShow + 1);
    }
  };

  useEffect(() => {
    if (location.pathname === "/movies" && searchedMovies !== "") {
      renderElseButton(searchedMovies);
    }
  }, [searchedMovies, maxMoviesToShow, location.pathname, renderElseButton]);

  useEffect(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
      if (!clickCounter) {
        setTimeout(() => updateMaxMoviesToShow(screenWidth), 100);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [clickCounter, screenWidth]);

  // const reRenderCard = {

  // }

  const renderMovies = (movies, maxMoviesToShow, savedFilteredMovies) => {
    if (movies !== "" && Array.isArray(movies)) {
      const slicedMovies =
        location.pathname === "/movies"
          ? movies.slice(0, maxMoviesToShow)
          : movies;
      return slicedMovies.map((movie, index) => (
        <MoviesCard
          searchedSavedMovies={searchedSavedMovies}
          onSearchedSavedMovies={onSearchedSavedMovies}
          isSaved={movie.saved}
          savedMovies={savedMovies}
          deleteMovie={deleteMovie}
          movieId={location.pathname === "/movies" ? movie.id : movie.movieId}
          savedFilteredMovies={savedFilteredMovies}
          key={index}
          movieName={movie.nameRU}
          movieDuration={`${Math.floor(movie.duration / 60)}ч ${
            movie.duration - Math.floor(movie.duration / 60) * 60
          }м`}
          moviePicture={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : movie.image
          }
          trailerLink={movie.trailerLink}
          // reRenderCard={reRenderCard}
        />
      ));
    }
  };

  return (
    <section className="movies">
      <div className="movies-container">
        {location.pathname === "/movies"
          ? renderMovies(searchedMovies, maxMoviesToShow, savedFilteredMovies)
          : !isSearched
          ? renderMovies(savedMovies, maxMoviesToShow)
          : renderMovies(searchedSavedMovies, maxMoviesToShow)}
      </div>
      <div className="movies-container_button-container">
        <div>
          {elseButton && (
            <button
              className="movies-container__button"
              type="button"
              onClick={onClickElseButton}
            >
              Ещё
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoviesCardList;
