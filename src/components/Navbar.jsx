import React from 'react';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  return (
    <nav>
      <div>
        <FontAwesomeIcon className='header-icon' icon={faCompactDisc} />
        <h3>Discer</h3>
      </div>
      <ul>
        <li>Login</li>
        <li>Register</li>
      </ul>
    </nav>
  );
};

export default Navbar;
