import React, { useState,useEffect,useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

const Login = () => {
  const {state,dispatch} = useContext(UserContext);

  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials")
    }
    else {
      dispatch({type:"USER",payload:true})
      window.alert("Login Done")
      history("/Menu")
    }
  }
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form method="POST">
        <div className="user-box">
          <input type="text" name="email" required="" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" required="" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
          <label>Password</label>
        </div>
        <a href="#" onClick={loginUser}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
        <p>New User?</p>
        <NavLink to="/signup">Register</NavLink>
      </form>
    </div>





  )
}

export default Login