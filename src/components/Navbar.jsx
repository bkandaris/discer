import React from 'react';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <FontAwesomeIcon className='logo-icon' icon={faCompactDisc} />
        <h3>Discer</h3>
      </div>
      <ul>
        <li>Login</li>
        <li className="register">Register</li>
      </ul>
    </nav>
  );
};

export default Navbar;
