import React, { createContext, useReducer } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error"
import Logout from "./components/Logout"
import Profile from "./components/Profile"
import Pending from "./components/Pending"
import New from "./components/New"
import Donor from "./components/Donor"
//import "./App.css"
import { initialState, reducer } from "../src/reducer/useReducer";
export const UserContext = createContext();
const Routing = () => {
  return (
    <switch>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/New" element={<New />} />
        <Route path="/Pending" element={<Pending />} />
        <Route path="/Donor" element={<Donor />} />
        <Route path="*" element={<Error />} />
      </Routes>

    </switch>
  )
}
const App = () => {
  const [state, dispatch ] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App









