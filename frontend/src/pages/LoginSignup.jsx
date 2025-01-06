import React, { useState } from 'react'
import './CSS/LoginSignup.css'

function LoginSignup() {
  const [state, setState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  });
  
  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const toggleState = () => {
    setState((prevState) => (prevState === 'Sign Up' ? 'Login' : 'Sign Up'));
  };
  //*****Sign Up Functtion*******
  const signup=async ()=>{
    console.log("signup Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json())
    .then((data)=>{
      responseData=data;
    })

    if(responseData.success)
    {
localStorage.setItem("auth-token",responseData.token);
window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }
//Login function
  const login=async ()=>{
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json())
    .then((data)=>{
      responseData=data;
    })
    if(responseData.success)
      {
  localStorage.setItem("auth-token",responseData.token);
  window.location.replace("/");
      }
      else{
        alert(responseData.errors);
      }
    
  }

 

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input onChange={changeHandler} value={formData.username} name="username" type="text" placeholder='Your Name' /> : <></>}
          <input onChange={changeHandler} value={formData.email} name="email"  type="email" placeholder='Email Adrress' />
          <input onChange={changeHandler} value={formData.password} name="password"  type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>{state==="Sign Up"?"Sign up":"Login"}</button>
        <p className="loginsignup-login">{state ==='Sign Up'?"Already have  an account ?":"Create an account ?"} <span onClick={toggleState}>{state==='Sign Up'?'Log In':'Sign Up'} Here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' />
          <p>By Continung,I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>)
}

export default LoginSignup;