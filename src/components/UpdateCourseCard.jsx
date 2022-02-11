import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

const UpdateCourseCard = ({
  courseName,
  courseAddress,
  courseCity,
  courseState,
  description,
  coursePicture,
  _id,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  console.log('parammmmms', params.courseId);

  useEffect(() => {
    axios
      .get(`https://discer.herokuapp.com/api/course/find/${params.courseId}`)
      .then((res) => {
        console.log('res for update', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>UpdateCourseCard</h1>
      <h3>{courseName}</h3>
      <img src={coursePicture} alt='disc course' />
      <p>{description}</p>
      <p>{courseAddress}</p>
      <p>{courseCity}</p>
      <p>{courseState}</p>
    </div>
  );
};

export default UpdateCourseCard;
