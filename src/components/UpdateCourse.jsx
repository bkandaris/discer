import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateCourseCard from './UpdateCourseCard';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const UpdateCourse = () => {
  const [courses, setCourses] = useState(null);

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
  console.log(UpdateCourseCard);

  return (
    <div>
      <h1>UpdateCourse</h1>
      {courses &&
        courses.map((course) => {
          return (
            <>
              <UpdateCourseCard
                id={course._id}
                courseName={course.courseName}
                coursePicture={course.coursePicture}
                description={course.description}
                courseAddress={course.courseAddress}
                courseCity={course.courseCity}
                courseState={course.courseState}
              />
              <Link to={`/update/${course._id}`}>
                <button>Update Course Link</button>
              </Link>
            </>
          );
        })}
    </div>
  );
};

export default UpdateCourse;
