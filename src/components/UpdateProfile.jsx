import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import { profileUpdate } from '../redux/actions';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [profPic, setProfPic] = useState();
  const [profileInfo, setProfileInfo] = useState();
  console.log('profileInfo State', profileInfo);

  const { email, phone, profilePicture, skill } = useSelector((state) => state);

  const addImage = (upload) => {
    setProfPic(upload);
  };

  const handleChange = () => {
    console.log('handle');
  };

  useEffect(() => {
    axios
      .get(`https://discer.herokuapp.com/api/user/find/${params.userId}`)
      .then((res) => {
        setProfileInfo(res.data);
      })
      .catch();
  }, [params.userId]);

  return (
    <div>
      <div>
        <h1>Profile</h1>
        <h3>Change or add information to your profile!</h3>
      </div>
      <form>
        <div>
          <FileBase64
            multiple={false}
            onDone={(base64) => {
              addImage(base64);
            }}
          />
          <img
            src={
              profPic
                ? profPic.base64
                : 'https://i.gyazo.com/e645f17b9d3ae42a51e3247dd0be8473.png'
            }
            alt='profile pic'
          />
          <label>E-mail</label>
          <input
            placeholder={profileInfo ? profileInfo.email : 'email'}
            type='email'
            name='email'
          />
          <label>Phone Number</label>
          <input
            placeholder={profileInfo ? profileInfo.phone : 'phone number'}
            type='tel'
            name='phoneNumber'
          />
          <label>Skill Level</label>
          <select>
            <option value='skill'>
              {profileInfo ? profileInfo.skill : null}
            </option>
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Pro'>Pro</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
