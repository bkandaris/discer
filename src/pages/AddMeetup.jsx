import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import TimePicker from 'react-time-picker';
import { useSelector } from 'react-redux';

// {
//     createdById: { type: String, required: true },
//     meetingCourse: { type: String, required: true },
//     meetingDescription: { type: String, required: false },
//     meetingDate: { type: String, required: true },
//     meetingTime: { type: String, required: true },
//     meetingPlayers: { type: Array, required: false },
//   },

const AddMeetup = () => {
  // creator of meetup id
  const { _id } = useSelector((state) => state);
  // component state
  const [date, setDate] = useState(new Date());
  const [courses, setCourses] = useState();
  const [time, setTime] = useState();
  const [meetup, setMeetup] = useState({
    createdById: _id,
    meetingCourse: '',
    meetingDate: date.toString(),
    meetingTime: time ? time : '',
    meetingDescription: '',
  });

  console.log('meetup obj', meetup);
  console.log('meetup meetingDate', meetup.meetingDate);
  // error handling state
  const [meetingDateErr, setMeetingDateErr] = useState({});
  const [timeErr, setTimeErr] = useState({});
  const [courseErr, setCourseErr] = useState({});
  const [descErr, setDescErr] = useState({});

  console.log('meetup object', meetup);
  console.log('id of creator', _id); // working
  console.log('date', date); // seperate
  console.log('courses on addmeetup', courses); //working
  console.log('time', time); //working

  // Get all courses
  useEffect(() => {
    axios
      .get('https://discer.herokuapp.com/api/course')
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   form handling
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setMeetup((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  // handles calendar date
  const onDateChange = (date) => {
    setDate(date);
  };
  // handles time
  const onTimeChange = (time) => {
    setTime(time);
    setMeetup((prevState) => ({
      ...prevState,
      meetingTime: time,
    }));
    console.log('time in onTimeChange', time);
  };
  //   validation
  const handleValidation = () => {
    console.log('meetup in handler', meetup);
    const meetingDateErr = {};
    const timeErr = {};
    const courseErr = {};
    const descErr = {};

    let isValid = true;

    if (meetup.meetingDate.length < 5) {
      meetingDateErr.date_invalid = 'Please select a date';
      isValid = false;
    }

    if (meetup.meetingTime.length < 5) {
      timeErr.time_invalid = 'Please select a time';
      isValid = false;
    }
    if (meetup.meetingCourse.length < 3) {
      courseErr.course_invalid = 'Please select a course';
      isValid = false;
    }
    // Description
    if (meetup.meetingDescription.length < 5) {
      descErr.desc_invalid = 'Please enter a longer description';
      isValid = false;
    }

    setMeetingDateErr(meetingDateErr);
    setTimeErr(timeErr);
    setCourseErr(courseErr);
    setDescErr(descErr);

    return isValid;
  };

  // post request - add meetingDate / meetingTime
  const handleSubmit = (e) => {
    e.preventDefault();
    // error validation
    const isValid = handleValidation();
    axios
      .post('https://discer.herokuapp.com/api/meeting', meetup)
      .then((res) => {
        console.log('post meeting req', res);
      })
      .catch((err) => {
        console.log(err);
      });

    //redirect
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Calendar onChange={onDateChange} value={date} minDate={new Date()} />
      {Object.keys(meetingDateErr).map((key) => {
        return <p style={{ color: 'red' }}>{meetingDateErr[key]}</p>;
      })}
      <Moment format='MMM DD, YYYY'>{date}</Moment>
      <TimePicker onChange={onTimeChange} value={time} />
      {Object.keys(timeErr).map((key) => {
        return <p style={{ color: 'red' }}>{timeErr[key]}</p>;
      })}

      <select name='meetingCourse' defaultValue='' onChange={handleChange}>
        {courses &&
          courses.map((course) => {
            return (
              <option value={course.courseName}>{course.courseName}</option>
            );
          })}
      </select>
      {Object.keys(courseErr).map((key) => {
        return <p style={{ color: 'red' }}>{courseErr[key]}</p>;
      })}
      <textarea
        name='meetingDescription'
        type='text'
        placeholder='enter description'
        onChange={handleChange}
      />
      {Object.keys(descErr).map((key) => {
        return <p style={{ color: 'red' }}>{descErr[key]}</p>;
      })}
      <button type='submit'>Create Meetup!</button>
    </form>
  );
};

export default AddMeetup;
