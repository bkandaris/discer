import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions';

const Login = () => {
  const dispatch = useDispatch();
  const { username, _id, isAdmin, email, phone, profilePicture, skill } =
    useSelector((state) => state);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [errorHandler, setErrorHandler] = useState(false);
  console.log(errorHandler);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post('https://discer.herokuapp.com/api/user/login', user)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem('token', res.data.token);
        dispatch(
          updateUser({ username: res.data.username, _id: res.data._id })
        );
        navigate('/home');
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
            <h2>Login</h2>
            <div className='noaccount'>
              <p>Don't have an account yet?</p>
              <Link to='/register'>
                <p>Register</p>
              </Link>
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
              {errorHandler ? <p className='error'>Wrong credentials</p> : null}
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
