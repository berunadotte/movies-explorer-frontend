import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import apiMain from '../../utils/MainApi';

const SavedMovies = () => {
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = useState([]);
  const location = useLocation();
  const deleteMovie = (movies) => {
    setSavedMovies(movies);
  };
  useEffect(() => {
    apiMain
      .getMovies(localStorage.getItem('jwt'))
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.statusCode === 401) {
          localStorage.clear();
          navigate('/');
        }
      });
  }, [location.pathname, setSavedMovies]);

  return <Movies savedMovies={savedMovies} deleteMovie={deleteMovie} />;
};

export default SavedMovies;
