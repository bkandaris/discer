import React, { useState } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const ImageCode = () => {
  const [image, setImage] = useState([]);

  const addImage = (upload) => {
    setImage(upload);
  };
  return (
    <div>
      <div>
        <FileBase64
          multiple={false}
          onDone={(base64) => {
            addImage(base64);
          }}
        />
        <img src={image.base64} alt='profile pic' />
      </div>
    </div>
  );
};

export default ImageCode;
