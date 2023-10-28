import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Error from "../Error/Error";
import Login from "../UserActions/Login/Login";
import Profile from "../UserActions/Profile/Profile";
import Register from "../UserActions/Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
