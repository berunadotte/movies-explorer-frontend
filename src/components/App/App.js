import "./App.css";
import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
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
  const [currentUser, setCurrentUser] = useState(null);
  const updateContextValue = (value) => {
    setCurrentUser(value);
    localStorage.setItem("user", JSON.stringify(value));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
        <Route
          path="/signup"
          element={
            <Register
              updateContextValue={updateContextValue}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              updateContextValue={updateContextValue}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement component={<Movies />}/>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteElement
              component={<SavedMovies />}
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
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
