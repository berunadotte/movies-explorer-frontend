import React from 'react';
import './MoviesError.css';

const MoviesError = ({ message }) => {
  return (
    <div className="movies__error">
      <p className="movies__error_message">{message}</p>
    </div>
  );
};

export default MoviesError;