import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
const Menu = () => {
  const histor = useNavigate();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {

        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch (err) {
      console.log(err.message);
      histor('/login');
    }
  }
  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <span>
        <NavLink to="/Profile">Profile</NavLink>
        <br></br>
        <NavLink to="/New">New Request</NavLink>
        <br></br>
        <NavLink to="/Pending">Previous Requests</NavLink>
      </span>
    </>
  )
}


export default Menu