import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CourseCard = ({
  courseAddress,
  courseCity,
  courseName,
  coursePicture,
  courseState,
  description,
  courseId,
}) => {
  const navigate = useNavigate();

  console.log('navigate', courseId);

  return (
    <div>
      <h3>{courseName}</h3>
      <div>
        <img src={coursePicture} alt='course' />
      </div>
      <div>
        <p>{description}</p>
        <p>{courseAddress}</p>
        <p>
          {courseCity}, {courseState}
        </p>
      </div>
      <Link to={`/update/${courseId}`}>
        <p>Update Courses</p>
      </Link>
    </div>
  );
};

export default CourseCard;
