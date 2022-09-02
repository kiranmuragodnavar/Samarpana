import React, { useState, useEffect } from 'react'

const Pending = () => {
    const [userData, setUserData] = useState([]);
    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            setUserData(data.messages);
            console.log(userData)
        }
        catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        userHomePage();
    }, []);
    return (
        <>
            <p>{userData.phone}</p>
            {userData.map((data, index) => (
                    <li key={index}>
                        <span>Type: {data.type}</span> 
                        <br></br>
                        {" "}
                        <span>Description: {data.description}</span>
                    </li>
                ))}
        </>
    )
}
export default Pending