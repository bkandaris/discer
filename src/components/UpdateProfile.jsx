import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions';
// import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const UpdateProfile = () => {
  const { username, _id, email, phone, skill, isAdmin, isLoggedIn } =
    useSelector((state) => state);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [imageSelected, setImageSelected] = useState('');
  const [profilePic, setProfilePic] = useState();
  const [userInfo, setuserInfo] = useState(null);
  console.log('userInfo State', userInfo);

  // form state
  const [emailState, setEmailState] = useState(email);
  const [phoneState, setPhoneState] = useState(phone);
  const [skillState, setSkillState] = useState(skill);

  useEffect(() => {
    axios
      .get(`https://discer.herokuapp.com/api/user/find/${_id}`)
      .then((res) => {
        console.log('get user res', res);
        setuserInfo(res.data);
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
  console.log('profilePic', profilePic);
  console.log('imageSelected', imageSelected);
  const handleSubmit = () => {
    const user = {
      email: emailState,
      phone: phoneState,
      skill: skillState,
      profilePicture: profilePic,
    };
    console.log('user object', user);
    dispatch(
      updateUser({
        username: username,
        _id: _id,
        isAdmin: isAdmin,
        isLoggedIn: isLoggedIn,
        email: user.email,
        phone: user.phone,
        skill: user.skill,
        profilePicture: profilePic,
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

  if (!userInfo) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div>
        <h1>{userInfo.username}</h1>
        <h3>Change or add information to your profile!</h3>
      </div>
      <input
        type='file'
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
      {userInfo.profilePicture && !profilePic ? (
        <img
          style={{ height: 100 }}
          src={userInfo.profilePicture}
          alt='profile'
        />
      ) : (
        <img style={{ height: 100 }} src={profilePic} alt='profile' />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail</label>
          <p>EMAIL: {userInfo.email}</p>
          <input
            onChange={(e) => setEmailState(e.target.value)}
            placeholder={userInfo.email ? userInfo.email : 'email'}
            type='email'
            name='email'
          />
          <label>Phone Number</label>
          <p>PHONE: {phone}</p>
          <input
            onChange={(e) => setPhoneState(e.target.value)}
            placeholder={userInfo.phone ? userInfo.phone : 'phone number'}
            type='tel'
            name='phone'
          />
          <label>Skill Level</label>
          <p>SKILL: {skill}</p>
          <select
            selected={userInfo.skill}
            name='skill'
            onChange={(e) => setSkillState(e.target.value)}>
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
