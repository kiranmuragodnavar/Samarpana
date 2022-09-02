import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

const Home = () => {
  // const [userName, setUserName] = useState('');
  // const [show, setShow] = useState(false);

  // const userHomePage = async () => {
  //   try {
  //     const res = await fetch('/getdata', {

  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },

  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     setUserName(data.name);
  //     setShow(true);

  //   }
  //   catch (err) {
  //     console.log(err.message);
  //   }

  // }
  // useEffect(() => {
  //   userHomePage();
  // }, []);
  return (
    <>
      <div>

       
        <NavLink to="/Login">NGO</NavLink>
        <br></br>
        <NavLink to="/Donor">Donor</NavLink>




      </div>
    </>
  )
}

export default Home