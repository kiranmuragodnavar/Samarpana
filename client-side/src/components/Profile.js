import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [show, setShow] = useState(false);
  const h=useNavigate();
  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {

        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },

      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setUserPhone(data.phone);
      setUserEmail(data.email);
      setUserAddress(data.address);
      setShow(true);

    }
    catch (err) {
      console.log(err.message);
      h('/login');

    }

  }
  useEffect(() => {
    userHomePage();
  }, []);
  return (
    <>
      <div>

       
        <p>Name : {userName}</p>
        <p>Phone : {userPhone}</p>
        <p>Email : {userEmail}</p>
        <p>Address : {userAddress}</p>




      </div>
    </>
  )
}

export default Profile