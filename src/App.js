import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { userData } from "./api";
import {
  Home,
  LoginSignUp,
  Routines,
  Activities,
  UserRoutines,
  SingleRoutine,
} from "./components";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [allRoutines, setAllRoutines] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    setToken(localStorage.getItem("token"));
  }, [token]);

  useEffect(() => {
    const getUserName = async () => {
      const result = await userData(localStorage.getItem("token"));
      setUsername(result.username);
    };
    getUserName();
  }, [token]);

  return (
    <>
      <h1>Fitness Tracker</h1>
      <div className="navbar">
        <Link to="*">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/routines">Routines</Link>
        <Link to="/activities">Activities</Link>
        {isLoggedIn ? <Link to="/user/routines">My Routines</Link> : null}
      </div>
      <Routes>
        <Route
          exact
          path="*"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
            />
          }
        ></Route>
        <Route
          path="/account"
          element={
            <LoginSignUp
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
              username={username}
            />
          }
        ></Route>
        <Route
          path="/routines/:singleRoutineId"
          element={
            <SingleRoutine
              allRoutines={allRoutines}
              username={username}
              setAllRoutines={setAllRoutines}
              token={token}
            />
          }
        ></Route>
        <Route
          path="/routines"
          element={
            <Routines
              allRoutines={allRoutines}
              setAllRoutines={setAllRoutines}
              username={username}
            />
          }
        ></Route>
        <Route path="/activities" element={<Activities />}></Route>
        <Route
          path="/user/routines"
          element={
            <UserRoutines
              token={token}
              username={username}
              allRoutines={allRoutines}
              setAllRoutines={setAllRoutines}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
