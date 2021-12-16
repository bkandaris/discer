import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';

const FinishProfile = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [updateUser, setUpdateUser] = useState(null);
  const { username, _id, email, phone, skill, isLoggedIn, profilePicture } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form state
  const [phoneState, setPhoneState] = useState(phone);
  const [skillState, setSkillState] = useState(skill);

  console.log(imageSelected);

  useEffect(() => {
    axios
      .get(`https://discer.herokuapp.com/api/user/find/${_id}`)
      .then((res) => {
        console.log('get user res', res);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);
  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'discer');

    axios
      .post('https://api.cloudinary.com/v1_1/dstpsp6l4/image/upload', formData)
      .then((res) => {
        let ourPic = res.data.secure_url;
        console.log('ourPic', ourPic);
        setProfilePic(ourPic);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    const user = {
      phone: phoneState,
      skill: skillState,
      profilePicture: profilePic,
    };
    console.log('user object', user);
    dispatch(
      updateUser({
        phone: user.phone,
        skill: user.skill,
        profilePicture: user.profilePicture,
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
      <h1>Finish Profile</h1>
      <div>
        <img
          src={
            profilePic
              ? profilePic
              : 'https://i.gyazo.com/ee20fb12aa6d4b721c8fccc5baed44f5.png'
          }
          alt='profile'
        />
        <input
          type='file'
          onChange={(e) => {
            setImageSelected(e.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload Image</button>
        <h3>Username: {username}</h3>
        <h3>E-mail: {email}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Phone Number</label>
            <input
              onChange={(e) => setPhoneState(e.target.value)}
              placeholder='555-555-5555'
              type='tel'
              name='phone'
            />
            <label>Skill Level</label>
            <select
              name='skill'
              onChange={(e) => setSkillState(e.target.value)}>
              <option value='skill'>Skill level</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Pro'>Pro</option>
            </select>
          </div>
          <button>Update User</button>
        </form>
      </div>
    </div>
  );
};

export default FinishProfile;
