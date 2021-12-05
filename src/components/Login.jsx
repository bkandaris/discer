import React, { useState, useRef } from 'react';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle later');
  };

  return (
    <div className='login-wrapper'>
      <div className='secondary-wrapper'>
        <div className='login-left-wrapper'>
          <div className='login-form'>
            <h2>Login</h2>
            <div className="noaccount">
              <p>Don't have an account yet?</p>
              <p>Sign Up</p>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type='text'
                placeholder='Username'
                ref={usernameRef}></input>
              <label>Password</label>
              <input
                type='password'
                placeholder='Password'
                ref={passwordRef}></input>
              <button>LOGIN</button>
            </form>
          </div>
        </div>
        <div className='login-right-wrapper'>
          <img
            src='https://i.gyazo.com/08c14ce8d9f9b1e5a45e68559035ac5f.png'
            alt='disc golf basket'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
