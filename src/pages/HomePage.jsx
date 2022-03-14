import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profileUpdate } from '../redux/actions';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state);

  console.log('homepage id', _id);

  return (
    <section>
      <div>
        <h1>Home Page</h1>
        <h3>Some description</h3>
        <p>
          here is some lengthier description about the application where users
          can find out more aobut disc golfing and find out more about meeting
          people here is some lengthier description about the application where
          users can find out more aobut disc golfing and find out more about
          meeting people
        </p>
        <button
          onClick={() => {
            navigate(`/updatecourse`);
          }}>
          Tester for update
        </button>
      </div>
    </section>
  );
};

export default HomePage;
