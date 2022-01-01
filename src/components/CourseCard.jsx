import React from 'react';

const CourseCard = ({
  courseAddress,
  courseCity,
  courseName,
  coursePicture,
  courseState,
  description,
}) => {
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
    </div>
  );
};

export default CourseCard;
