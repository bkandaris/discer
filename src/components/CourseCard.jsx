import React from 'react';

const CourseCard = ({
  courseAddress,
  courseCity,
  courseName,
  coursePicture,
  courseState,
  description,
  _id,
}) => {
  return (
    <div id={_id}>
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
      <button>Update Courses</button>
    </div>
  );
};

export default CourseCard;
