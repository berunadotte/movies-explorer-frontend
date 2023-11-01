import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import apiMovies from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import MoviesError from "../Error/MoviesError/MoviesError";
import apiMain from "../../utils/MainApi";

const serverError =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.";
const keywordError = "Нужно ввести ключевое слово.";
const requestError = "Ничего не найдено.";

const Movies = ({ savedMovies, deleteMovie }) => {
  const savedPrintedString = JSON.parse(localStorage.getItem("printedString"));
  const savedFilteredMovies = JSON.parse(
    localStorage.getItem("filteredMovies")
  );
  const savedTumbValue = JSON.parse(localStorage.getItem("tumbValue"));

  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState(null);
  const [clickCounter, setClickCounter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(false);
  const [needKeyWord, setNeedKeyWord] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [tumbValue, setTumbValue] = useState(false);
  const [currentSearchValue, setCurrentSearchValue] = useState("");

  const filterSearch = (searchValue, res) => {
    let filteredMovies = res.filter(
      (movie) =>
        movie.nameRU.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
    if (tumbValue) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration < 40);
    }
    if (location.pathname === "/movies") {
      localStorage.setItem("printedString", JSON.stringify(searchValue));
      localStorage.setItem("tumbValue", JSON.stringify(tumbValue));
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    }
    return filteredMovies;
  };

  const handleSearch = (searchValue, res) => {
    setError(false);
    setLoading(false);
    setClickCounter(0);
    if (!searchValue) {
      setNeedKeyWord(true);
    } else if (filterSearch(searchValue, res).length === 0) {
      setNeedKeyWord(false);
      setEmptyMessage(true);
    } else {
      setNeedKeyWord(false);
      setEmptyMessage(false);
      if (location.pathname === "/movies") {
        setSearchedMovies(filterSearch(searchValue, res));
      }
      if (location.pathname === "/saved-movies") {
        setIsSearched(true);
        setSearchedSavedMovies(filterSearch(searchValue, res));
      }
    }
  };

  const onSearchedSavedMovies = (value) => {
    console.log(value);
    setSearchedSavedMovies(value);
  };
  const onSetMovie = (movies, savedMovies) => {
    return movies.reduce((arr, movie) => {
      arr.push(movie);
      if (savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)) {
        movie.saved = true;
      } else {
        movie.saved = false;
      }
      return arr;
    }, []);
  };
  const onSubmitSearch = useCallback((searchValue) => {
    if (location.pathname === "/movies") {
      localStorage.removeItem("filteredMovies");
      localStorage.removeItem("tumbValue");
      localStorage.removeItem("printedString");
    }
    if (!movies && location.pathname === "/movies") {
      setLoading(true);
      Promise.all([
        apiMovies.getMovies(),
        apiMain.getMovies(localStorage.getItem("jwt")),
      ])
        .then(([movies, savedMovies]) => {
          setMovies(onSetMovie(movies, savedMovies));
          handleSearch(searchValue, onSetMovie(movies, savedMovies));
        })
        .catch((error) => {
          if (error.statusCode === 401) {
            localStorage.clear();
            navigate("/");
          }
          setError(true);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (location.pathname === "/saved-movies") {
      handleSearch(searchValue, savedMovies);
      console.log(savedMovies);
    } else {
      handleSearch(searchValue, movies);
    }
  });

  const onTumbClick = (searchValue) => {
    setTumbValue(!tumbValue);
    setCurrentSearchValue(searchValue);
    setShouldSubmit(true);
  };

  useEffect(() => {
    if (shouldSubmit) {
      onSubmitSearch(currentSearchValue);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, currentSearchValue, onSubmitSearch]);

  useEffect(() => {
    if (location.pathname === "/movies") {
      setSearchedMovies(savedFilteredMovies);
      setTumbValue(savedTumbValue);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <SearchForm
          onSubmitSearch={onSubmitSearch}
          onTumbClick={onTumbClick}
          tumbValue={tumbValue}
          savedPrintedString={savedPrintedString}
        />
        {loading ? (
          <Preloader />
        ) : error ? (
          <MoviesError message={serverError} />
        ) : needKeyWord ? (
          <MoviesError message={keywordError} />
        ) : emptyMessage ? (
          <MoviesError message={requestError} />
        ) : (
          <MoviesCardList
            deleteMovie={deleteMovie}
            savedFilteredMovies={movies === null ? savedFilteredMovies : movies}
            clickCounter={clickCounter}
            setClickCounter={setClickCounter}
            savedMovies={savedMovies}
            isSearched={isSearched}
            searchedMovies={searchedMovies || ""}
            onSearchedSavedMovies={onSearchedSavedMovies}
            searchedSavedMovies={searchedSavedMovies || ""}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
