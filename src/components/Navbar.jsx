import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, username, _id, profilePicture } = useSelector(
    (state) => state
  );
  const [user, setUser] = useState({
    username: username || null,
    profilePicture: profilePicture || null,
  });

  // useEffect(() => {
  //   axios
  //     .get(`https://discer.herokuapp.com/api/user/find/${_id}`)
  //     .then((res) => {
  //       setUser({
  //         username: res.data.username,
  //         profilePicture: res.data.profilePicture,
  //       }).catch((err) => {
  //         console.log(err);
  //       });
  //     });
  // }, []);

  return (
    <nav>
      <Link className='navlink' to='/home'>
        <div className='logo'>
          <FontAwesomeIcon className='logo-icon' icon={faCompactDisc} />
          <h3>Discer</h3>
        </div>
      </Link>
      {isLoggedIn ? (
        <div>
          <h3>Hi, {username}!</h3>
          <img src={profilePicture} href='profile' />
          <button>
            Logout
          </button>
        </div>
      ) : (
        <ul>
          <Link to='login'>
            <li>Login</li>
          </Link>
          <Link to='/register'>
            <li className='register'>Register</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
