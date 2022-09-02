import React, { useState, useEffect } from 'react'

const New = () => {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
    }
    catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    userHomePage();
  }, []);
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email,phone, type, description } = userData;
    const res = await fetch('/contact', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone,type, description
      })
    });
    const data = await res.json();
    if (!data) {
      console.log("Error")
    }
    else {
      alert("Sent");
      setUserData({ ...userData, type: "", description: "" });
    }
  }

  return (
    <>
      <form method="POST">
        <p>Name</p>
        <textarea rows="1" id="code" name="name" spellCheck="false" onChange={handleInputs} value={userData.name}></textarea>
        <p>Email</p>
        <textarea rows="1" id="code" name="email" spellCheck="false" onChange={handleInputs} value={userData.email}></textarea>
        <p>Phone</p>
        <textarea rows="1" id="code" name="phone" spellCheck="false" onChange={handleInputs} value={userData.phone}></textarea>

        <p>Type</p>
        <textarea columns="1" id="code" name="type" spellCheck="false" placeholder="Type of the Query" onChange={handleInputs} ></textarea>
        <p>Description</p>
        <textarea rows="7" id="code" name="description" spellCheck="false" placeholder="Relevant Details of the Query" onChange={handleInputs} ></textarea>
        <br></br>
        <button type="submit" onClick={contactForm}>Submit</button>
      </form>

    </>
  )
}

export default New