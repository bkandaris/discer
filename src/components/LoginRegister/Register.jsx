import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions';

const Register = () => {
  const dispatch = useDispatch();
  const { username, _id, email, phone } = useSelector((state) => state);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [errorHandler, setErrorHandler] = useState(false);
  const [userNameErr, setUserNameError] = useState({});
  const [emailErr, setEmailError] = useState({});
  const [passwordErr, setPasswordError] = useState({});

  const handleValidation = () => {
    const userNameErr = {};
    const emailErr = {};
    const passwordErr = {};
    let isValid = true;

    if (usernameRef.current.value.trim().length < 5) {
      userNameErr.user_nameInvalid = 'Please enter a valid username.';
      isValid = false;
    }

    if (!emailRef.current.value.includes('@')) {
      emailErr.user_emailInvalid = 'Please enter a valid e-mail.';
      isValid = false;
    }

    if (passwordRef.current.value.trim().length < 5) {
      passwordErr.messageInvalid = 'Please enter a longer password.';
      isValid = false;
    }

    setUserNameError(userNameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };
    const isValid = handleValidation();
    if (isValid) {
      axios
        .post('https://discer.herokuapp.com/api/user/register', user)
        .then((res) => {
          dispatch(
            registerUser({
              username: res.data.username,
              _id: res.data._id,
              email: res.data.email,
            })
          );
          navigate(`/finishprofile`);
        })
        .catch((err) => {
          setErrorHandler(true);
        });
    }
  };

  console.log('usernameRef', usernameRef);

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
              <input type='text' placeholder='Username' ref={usernameRef} />
              {Object.keys(userNameErr).map((key) => {
                return <p style={{ color: 'red' }}>{userNameErr[key]}</p>;
              })}
              <label>E-mail</label>
              <input type='email' placeholder='E-mail address' ref={emailRef} />
              {Object.keys(emailErr).map((key) => {
                return <p style={{ color: 'red' }}>{emailErr[key]}</p>;
              })}
              <label>Password</label>
              <input type='password' placeholder='Password' ref={passwordRef} />
              {Object.keys(passwordErr).map((key) => {
                return <p style={{ color: 'red' }}>{passwordErr[key]}</p>;
              })}
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
