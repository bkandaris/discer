import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

const ViewCourses = () => {
  const [courses, setCourses] = useState(null);
  console.log('courses', courses);
  useEffect(() => {
    axios
      .get('https://discer.herokuapp.com/api/course')
      .then((res) => {
        setCourses(res.data);
        console.log('courses', courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log('courses on viewCourse', courses);
  return (
    <div>
      <h1>Course List</h1>
      {courses &&
        courses.map((course) => {
          return (
            <CourseCard
              courseName={course.courseName}
              courseAddress={course.courseAddress}
              courseCity={course.courseCity}
              courseState={course.courseState}
              description={course.description}
              coursePicture={course.coursePicture}
              courseId={course._id}
            />
          );
        })}
    </div>
  );
};

export default ViewCourses;
