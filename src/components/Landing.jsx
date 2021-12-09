import React from 'react';
import { faHome, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className='header-wrapper'>
      <section className='header-content'>
        <div className='header-text'>
          <div className='header-logo'>
            <FontAwesomeIcon className='header-icon' icon={faCompactDisc} />
            <h1>Discer</h1>
          </div>
          <h3>Find people to disc golf with!</h3>
          <p>
            Ever feel like going disc golfing and your friends are all busy?
            Maybe you just moved to a new area? Sign up today and find
            like-minded disc golfers to enjoy the outdoors with!
          </p>
          <button>
            <Link to='/register'>Get Started!</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
