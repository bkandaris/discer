import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import States from '../Data/States';

const ChangeCourse = () => {
  const [course, setCourse] = useState(null);
  const [imageSelected, setImageSelected] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  // setting state for the update and error handling
  const [courseName, setCourseName] = useState();
  const [courseAddress, setCourseAddress] = useState();
  const [courseCity, setCourseCity] = useState();
  const [courseState, setCourseState] = useState();
  const [courseDesc, setCourseDesc] = useState();

  console.log(States);

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

  const deleteCourse = () => {
    axios
      .delete(`https://discer.herokuapp.com/api/course/${params.courseId}`)
      .then((res) => {
        console.log(res);
      });
  };

  const updateCourse = () => {
    // add handle validation here

    const updatedCourse = {
      courseName: courseName,
      courseAddress: courseAddress,
      courseCity: courseCity,
      courseState: courseState,
      description: courseDesc,
    };
    console.log('put reqqqq object', updatedCourse);

    navigate('/updatecourse');
    axios
      .put(
        `https://discer.herokuapp.com/api/course/${params.courseId}`,
        updatedCourse
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!course) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>ChangeCoursePage</h1>
      <img src={course.coursePicture} alt='course' />
      <form>
        <label>Name: </label>
        <input
          type='text'
          placeholder={course.courseName}
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
        />
        <br />
        <label>Address: </label>
        <input
          type='text'
          placeholder={course.courseAddress}
          onChange={(e) => {
            setCourseAddress(e.target.value);
          }}
        />
        <br />
        <label>City: </label>
        <input
          type='text'
          placeholder={course.courseCity}
          onChange={(e) => {
            setCourseCity(e.target.value);
          }}
        />
        <br />
        <label>State: </label>
        <select
          onChange={(e) => {
            setCourseState(e.target.value);
          }}>
          {States.map((state) => {
            return <option value={state}>{state}</option>;
          })}
        </select>
        <br />
        <label>Description: </label>
        <textarea
          type='text'
          placeholder={course.description}
          onChange={(e) => {
            setCourseDesc(e.target.value);
          }}
        />
        <button onClick={updateCourse}>Update Course</button>
      </form>
      <button onClick={deleteCourse}>Delete</button>
    </div>
  );
};

export default ChangeCourse;
