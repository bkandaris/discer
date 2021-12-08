import React, { useState } from 'react';
import axios from 'axios';
// import { Image } from 'cloudinary-react';

const ImageCode = () => {
  const [imageSelected, setImageSelected] = useState('');

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'discer');

    axios
      .post('https://api.cloudinary.com/v1_1/dstpsp6l4/image/upload', formData)
      .then((res) => {
        console.log(res);
        // data.secure_url is where the image is
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h1>Hello</h1>
        <input
          type='file'
          onChange={(e) => {
            setImageSelected(e.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload Image</button>
        {/* <Image 
          cloudName="dstpsp6l4"
          publicId=""
        /> */}
      </div>
    </div>
  );
};

export default ImageCode;
