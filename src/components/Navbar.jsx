import React, { useState } from 'react';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const [loggedIn, setIsLoggedIn] = useState(true);
  const [username, setuserName] = useState('Benjammin');

  return (
    <nav>
      <div className='logo'>
        <FontAwesomeIcon className='logo-icon' icon={faCompactDisc} />
        <h3>Discer</h3>
      </div>
      {loggedIn ? (
        <h3>Logged in</h3>
      ) : (
        <ul>
          <li>Login</li>
          <li className='register'>Register</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
