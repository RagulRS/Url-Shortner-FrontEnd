import React, { useState } from "react";
import "../App.css";
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate  = useNavigate()

Axios.defaults.withCredentials = true;

  const handleSubmit = (e)=>{
    e.preventDefault();
    Axios.post('https://url-shortner-backend-1-ypf5.onrender.com/auth/login ',{
      
        email,
        password
    }).then(response => {
      if(response.data.status){
        navigate('/home')
      }
    }).catch(err => {
        console.log(err);
    })
  }

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>Don't Have an Account? <Link to ="/signup">Sign up</Link></p> 
      </form>
    </div>
  );
};

export default Login;
