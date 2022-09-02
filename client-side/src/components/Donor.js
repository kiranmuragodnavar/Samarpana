import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const Donor = () => {
  const histor = useNavigate();
  const [userData, setUserData] = useState([]);
  const callAboutPage = async () => {
    try {
      const res = await fetch('/data1', {

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
    }
  }
  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      {userData.map((data) => (
        <ul>
          {data.messages.map((subdata) => (
            <li>
              <span>Name: {data.name}</span>{" "}
              <br></br>
              <span>Details: {subdata.type}</span> <br></br>
              {subdata.description}</li>
          ))}
        </ul>

      ))}
    </>
  )
}


export default Donor