import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Error from "../Error/Error";
import Login from "../UserActions/Login/Login";
import Profile from "../UserActions/Profile/Profile";
import Register from "../UserActions/Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedin] = useState(false);
  const onLoggedIn = () => {
    setLoggedin(true);
  };
  const updateContextValue = (value) => {
    setCurrentUser(value);
    localStorage.setItem("user", JSON.stringify(value));
  };

  if (location.pathname === "/movies") {
    localStorage.setItem("location", "/movies");
  } else if (location.pathname === "/profile") {
    localStorage.setItem("location", "/profile");
  } else if (location.pathname === "/saved-movies") {
    localStorage.setItem("location", "/saved-movies");
  }

  useEffect(() => {
    if (localStorage.getItem("validated") === "true") {
      setLoggedin(true);
      navigate(`${localStorage.getItem("location")}`);
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <Register
              updateContextValue={updateContextValue}
              onLoggedIn={onLoggedIn}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              updateContextValue={updateContextValue}
              onLoggedIn={onLoggedIn}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement component={<Movies />} loggedIn={loggedIn} />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteElement
              component={<SavedMovies />}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement
              component={
                <CurrentUserContext.Provider value={currentUser}>
                  <Profile updateContextValue={updateContextValue} />
                </CurrentUserContext.Provider>
              }
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
