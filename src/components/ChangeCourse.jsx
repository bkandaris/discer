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
  // course info states
  const [formState, setFormState] = useState({
    courseName: '',
    courseAddress: '',
    courseCity: '',
    courseState: '',
    description: '',
  });

  console.log('formState', formState);
  // form error states
  const [nameErr, setNameErr] = useState({});
  const [addressErr, setAddressErr] = useState({});
  const [cityErr, setCityErr] = useState({});
  const [descErr, setDescErr] = useState({});

  console.log('course in change course', course);

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setFormState((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  // validation
  const handleValidation = () => {
    const nameErr = {};
    const addressErr = {};
    const cityErr = {};
    const descErr = {};

    let isValid = true;

    if (formState.courseName.length < 3) {
      nameErr.name_invalid = 'Please enter a valid course name.';
      isValid = false;
    }

    if (formState.courseAddress.length < 3) {
      addressErr.address_invalid = 'Please enter a valid address.';
      isValid = false;
    }

    if (formState.courseCity.length < 3) {
      cityErr.city_invalid = 'Please enter a valid city.';
      isValid = false;
    }
    if (formState.description.length < 10) {
      descErr.desc_invalid = 'Please enter a longer description.';
      isValid = false;
    }

    setNameErr(nameErr);
    setAddressErr(addressErr);
    setCityErr(cityErr);
    setDescErr(descErr);

    return isValid;
  };

  //sets course info
  useEffect(() => {
    axios
      .get(`https://discer.herokuapp.com/api/course/find/${params.courseId}`)
      .then((res) => {
        setCourse(res.data);
        setFormState({
          courseName: res.data.courseName,
          courseAddress: res.data.courseAddress,
          courseCity: res.data.courseCity,
          courseState: res.data.courseState,
          description: res.data.description,
        });
        console.log('course on ChangeCourse', res.data);
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

  const updateCourse = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    // add handle validation here
    if (isValid) {
      const updatedCourse = {
        courseName: formState.courseName,
        courseAddress: formState.courseAddress,
        courseCity: formState.courseCity,
        courseState: formState.courseState,
        description: formState.description,
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
    }
  };

  if (!course) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>ChangeCoursePage</h1>
      <img src={course.coursePicture} alt='course' />
      <form onSubmit={updateCourse}>
        <label>Name: </label>
        <input
          name='courseName'
          type='text'
          placeholder={course.courseName}
          onChange={handleChange}
        />
        {Object.keys(nameErr).map((key) => {
          return <p style={{ color: 'red' }}>{nameErr[key]}</p>;
        })}
        <br />
        <label>Address: </label>
        <input
          name='courseAddress'
          type='text'
          placeholder={course.courseAddress}
          onChange={handleChange}
        />
        {Object.keys(addressErr).map((key) => {
          return <p style={{ color: 'red' }}>{addressErr[key]}</p>;
        })}
        <br />
        <label>City: </label>
        <input
          name='courseCity'
          type='text'
          placeholder={course.courseCity}
          onChange={handleChange}
        />
        {Object.keys(cityErr).map((key) => {
          return <p style={{ color: 'red' }}>{cityErr[key]}</p>;
        })}
        <br />
        <label>State: </label>
        <select
          name='courseState'
          defaultValue={course.courseState}
          onChange={handleChange}>
          {States.map((state) => {
            return <option value={state}>{state}</option>;
          })}
        </select>
        <br />
        <label>Description: </label>
        <textarea
          name='description'
          type='text'
          placeholder={course.description}
          onChange={handleChange}
        />
        {Object.keys(descErr).map((key) => {
          return <p style={{ color: 'red' }}>{descErr[key]}</p>;
        })}
        <button type='submit'>Update Course</button>
      </form>
      <button onClick={deleteCourse}>Delete</button>
    </div>
  );
};

export default ChangeCourse;
