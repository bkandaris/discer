import React, { useState } from 'react';
import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { finishProfile } from '../redux/actions';
import { useNavigate } from 'react-router';

const AddCourse = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [courseName, setCourseName] = useState('');

  const [courseAddress, setCourseAddress] = useState('');
  console.log('courseAddress State', courseAddress);
  const [courseState, setCourseState] = useState('');
  console.log('courseState state', courseState);
  const [courseCity, setCourseCity] = useState('');
  console.log('courseCity state', courseCity);
  const [courseDescription, setCourseDescription] = useState('');
  console.log('courseDescription State', courseDescription);

  const [coursePic, setCoursePic] = useState(null);
  const navigate = useNavigate();

  const [nameErr, setNameErr] = useState({});
  const [addressErr, setAddressErr] = useState({});
  const [cityErr, setCityErr] = useState({});
  const [stateErr, setStateErr] = useState({});

  console.log('imageSelected', imageSelected);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'discer');

    axios
      .post('https://api.cloudinary.com/v1_1/dstpsp6l4/image/upload', formData)
      .then((res) => {
        let ourPic = res.data.secure_url;
        console.log('ourPic', ourPic);
        setCoursePic(ourPic);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(coursePic);

  const handleValidation = () => {
    const nameErr = {};
    const addressErr = {};
    const cityErr = {};
    const stateErr = {};

    let isValid = true;
    console.log('handleValidation', isValid);
    if (courseName.length < 4) {
      nameErr.course_nameInvalid = 'Please enter a valid course name.';
      isValid = false;
    }

    if (courseAddress.length < 6) {
      addressErr.addressInvalid = 'Please enter a valid address.';
      isValid = false;
    }
    if (courseCity.length < 3) {
      cityErr.city_Invalid = 'Please enter a valid city.';
      isValid = false;
    }

    if (courseState.length < 2) {
      stateErr.course_StateInvalid = 'Please choose a state.';
      isValid = false;
    }

    setNameErr(nameErr);
    setAddressErr(addressErr);
    setCityErr(cityErr);
    setStateErr(stateErr);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    console.log('handleSubmit isValid', isValid);
    if (isValid) {
      const newCourse = {
        courseName: courseName,
        courseAddress: courseAddress,
        courseCity: courseCity,
        courseState: courseState,
        description: courseDescription,
        coursePicture: coursePic,
      };
      console.log('newCourse', newCourse);

      axios
        .post(`https://discer.herokuapp.com/api/course`, newCourse)
        .then((res) => {
          console.log('profileUpdate call res', res);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate('/home');
    }
  };
  return (
    <div>
      <h1>Add Course</h1>
      <label>Course Name:</label>
      <input
        onChange={(e) => {
          setCourseName(e.target.value);
        }}
        type='text'
        name='courseName'
      />
      {Object.keys(nameErr).map((key) => {
        return <p style={{ color: 'red' }}>{nameErr[key]}</p>;
      })}
      <div>
        <img
          src={
            coursePic
              ? coursePic
              : 'https://i.gyazo.com/284159713ac83ccfee47ff77d636ac49.jpg'
          }
          alt='users profile'
        />
        <input
          type='file'
          onChange={(e) => {
            setImageSelected(e.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload Image</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Course Address:</label>
            <input
              onChange={(e) => setCourseAddress(e.target.value)}
              type='text'
              name='courseAddress'
            />
            {Object.keys(addressErr).map((key) => {
              return <p style={{ color: 'red' }}>{addressErr[key]}</p>;
            })}
            <label>Course City:</label>
            <input
              onChange={(e) => setCourseCity(e.target.value)}
              type='text'
              name='courseCity'
            />
            {Object.keys(cityErr).map((key) => {
              return <p style={{ color: 'red' }}>{cityErr[key]}</p>;
            })}
            <label>City State:</label>
            <select
              name='stateName'
              onChange={(e) => setCourseState(e.target.value)}>
              <option value='skill'>Skill level</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Pro'>Pro</option>
            </select>
            {Object.keys(stateErr).map((key) => {
              return <p style={{ color: 'red' }}>{stateErr[key]}</p>;
            })}
            <label>Course Description:</label>
            <br />
            <textarea
              onChange={(e) => setCourseDescription(e.target.value)}
              type='text'
              name='courseDescription'
            />
          </div>
          <button>Finish</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
