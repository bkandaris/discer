import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { finishProfile } from '../redux/actions';
import { useNavigate } from 'react-router';

const FinishProfile = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [updateUser, setUpdateUser] = useState(null);
  const { username, _id, email, phone, skill, profilePicture } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form state
  // const [phoneState, setPhoneState] = useState(phone);
  // const [skillState, setSkillState] = useState(skill);
  const [phoneErr, setPhoneErr] = useState({});
  const [skillErr, setSkillErr] = useState({});

  const [formState, setFormState] = useState({
    phone: '',
    skill: '',
  });
  console.log('formstate', formState);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };
  console.log('imageSelected', imageSelected);
  // useEffect(() => {
  //   axios
  //     .get(`https://discer.herokuapp.com/api/user/find/${_id}`)
  //     .then((res) => {
  //       console.log('get user res', res);
  //       setUserInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [_id]);

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
  console.log(profilePic);
  //
  const handleValidation = () => {
    const phoneErr = {};
    const skillErr = {};
    let isValid = true;
    console.log('handleValidation', isValid);
    if (formState.phone.length < 7) {
      phoneErr.phone_numberInvalid = 'Please enter a valid phone number.';
      isValid = false;
    }

    if (formState.skill.length < 2) {
      skillErr.skillInvalid = 'Please enter a skill level.';
      isValid = false;
    }

    setPhoneErr(phoneErr);
    setSkillErr(skillErr);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    console.log('handleSubmit isValid', isValid);
    if (isValid) {
      const user = {
        phone: formState.phone,
        skill: formState.skill,
        profilePicture: profilePic,
      };
      dispatch(
        finishProfile({
          phone: user.phone,
          skill: user.skill,
          profilePicture: profilePic,
        })
      );

      axios
        .put(`https://discer.herokuapp.com/api/user/updateuser/${_id}`, user)
        .then((res) => {
          console.log('profileUpdate call res', res);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate('/login');
    }
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
          alt='users profile'
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
              // onChange={(e) => setPhoneState(e.target.value)}
              onChange={handleChange}
              placeholder='555-555-5555'
              type='tel'
              name='phone'
            />
            {Object.keys(phoneErr).map((key) => {
              return <p style={{ color: 'red' }}>{phoneErr[key]}</p>;
            })}
            <label>Skill Level</label>
            <select
              name='skill'
              // onChange={(e) => setSkillState(e.target.value)}
              onChange={handleChange}>
              <option value='skill'>Skill level</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Pro'>Pro</option>
            </select>
            {Object.keys(skillErr).map((key) => {
              return <p style={{ color: 'red' }}>{skillErr[key]}</p>;
            })}
          </div>
          <button>Finish</button>
        </form>
      </div>
    </div>
  );
};

export default FinishProfile;
