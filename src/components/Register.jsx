import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions';

const Register = () => {
  const dispatch = useDispatch();
  const { username, _id, email, phone } = useSelector((state) => state);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [errorHandler, setErrorHandler] = useState(false);
  console.log(errorHandler);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };

    axios
      .post('https://discer.herokuapp.com/api/user/register', user)
      .then((res) => {
        dispatch(
          registerUser({
            username: res.data.username,
            _id: res.data._id,
            email: res.data.email,
            isLoggedIn: true,
          })
        );
        console.log('response from registering', res);
        // need to change to login
        navigate(`/updateprofile/${_id}`);
      })
      .catch((err) => {
        setErrorHandler(true);
      });
  };

  return (
    <div className='login-wrapper'>
      <div className='secondary-wrapper'>
        <div className='login-left-wrapper'>
          <div className='login-form'>
            <h2>Register</h2>
            <div className='noaccount'>
              <p>Already have an account?</p>
              <Link to='/login'>
                <p>Login</p>
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type='text'
                placeholder='Username'
                ref={usernameRef}></input>
              <label>E-mail</label>
              <input
                type='email'
                placeholder='E-mail address'
                ref={emailRef}></input>
              <label>Password</label>
              <input
                type='password'
                placeholder='Password'
                ref={passwordRef}></input>
              <button>Register</button>
            </form>
          </div>
        </div>
        <div className='login-right-wrapper'>
          <img
            src='https://i.gyazo.com/f5a70928e1027224748a008141422692.png'
            alt='disc golf basket'
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
