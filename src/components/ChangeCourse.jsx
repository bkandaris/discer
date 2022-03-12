import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

const ChangeCourse = () => {
  const [course, setCourse] = useState(null);
  const [imageSelected, setImageSelected] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  //sets course info
  useEffect(() => {
    axios
      .get(`https://discer.herokuapp.com/api/course/find/${params.courseId}`)
      .then((res) => {
        setCourse(res.data);
        console.log('course on ChangeCourse', course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!course) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>ChangeCoursePage</h1>
      <img src={course.coursePicture} alt='course' />
      <form>
        <label>Name: </label>
        <input type='text' placeholder={course.courseName} />
        <br />
        <label>Address: </label>
        <input type='text' placeholder={course.courseAddress} />
        <br />
        <label>City: </label>
        <input type='text' placeholder={course.courseCity} />
        <br />
        <label>State: </label>
        <input type='text' placeholder={course.courseState} />
        <br />
        <label>Description: </label>
        <input type='text' placeholder={course.description} />
      </form>
    </div>
  );
};

export default ChangeCourse;
