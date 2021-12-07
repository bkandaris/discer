import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const UpdateProfile = () => {
  const { username, _id, email, phone, profilePicture, skill } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [profPic, setProfPic] = useState(profilePicture);
  // form state
  const [emailState, setEmailState] = useState(email);
  const [phoneState, setPhoneState] = useState(phone);
  const [skillState, setSkillState] = useState(skill);
  console.log('phoneState', phoneState);
  console.log('emailState', emailState);
  console.log('skillState', skillState);

  // const addImage = (upload) => {
  //   setProfPic(upload);
  // };

  const handleSubmit = (e) => {
    const user = {
      email: emailState,
      phone: phoneState,
      skill: skillState,
    };
    dispatch(
      updateUser({
        email: user.email,
        phone: user.phone,
        skill: user.skill,
      })
    );
    navigate('/home');

    axios
      .put(`https://discer.herokuapp.com/api/user/updateuser/${_id}`, user)
      .then((res) => {
        console.log('profileUpdate call res', res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <h1>{username}</h1>
        <h3>Change or add information to your profile!</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <FileBase64
            multiple={false}
            onDone={(base64) => {
              addImage(base64);
            }}
          />
          <img
            style={{ maxHeight: '100px' }}
            src={
              profPic
                ? profPic.base64
                : 'https://i.gyazo.com/e645f17b9d3ae42a51e3247dd0be8473.png'
            }
            alt='profile pic'
          /> */}
          <label>E-mail</label>
          <p>EMAIL: {email}</p>
          <input
            onChange={(e) => setEmailState(e.target.value)}
            placeholder={email ? email : 'email'}
            type='email'
            name='email'
          />
          <label>Phone Number</label>
          <p>PHONE: {phone}</p>
          <input
            onChange={(e) => setPhoneState(e.target.value)}
            placeholder={phone ? phone : 'phone number'}
            type='tel'
            name='phone'
          />
          <label>Skill Level</label>
          <p>SKILL: {skill}</p>
          <select name='skill' onChange={(e) => setSkillState(e.target.value)}>
            <option value='skill'>{skill ? skill : null}</option>
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Pro'>Pro</option>
          </select>
        </div>
        <button>Update User</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
