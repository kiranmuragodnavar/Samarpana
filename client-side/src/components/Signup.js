import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();
  const [user, setUser] = useState(
    {
      name: "", phone: "", email: "", address: "", password: ""
    }
  );
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }


  const Postdata = async (e) => {
    e.preventDefault();
    const { name, phone, email, address, password } = user;
    const res = await fetch('/register', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, phone, email, address, password
      })
    });
    const res1 = await res.json();
    if (res1.status === 422 || !res1) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }
    else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history('/login')
    }
  }
  return (
    <div className="login-box login-box2">
      <h2>SignUp</h2>
      <form>
        <div className="user-box">
          <input type="text" name="name" required="" autoComplete='off' onChange={handleInputs} value={user.name} />
          <label>Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="phone" required="" autoComplete='off' onChange={handleInputs} value={user.phone} />
          <label>Phone</label>
        </div>
        <div className="user-box">
          <input type="text" name="email" required="" autoComplete='off' onChange={handleInputs} value={user.email} />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="text" name="address" required="" autoComplete='off' onChange={handleInputs} value={user.address} />
          <label>Address</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" required="" autoComplete='off' onChange={handleInputs} value={user.password} />
          <label>Password</label>
        </div>

        <a href="#" onClick={Postdata}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
  )
}

export default Signup