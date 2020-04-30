import React from 'react';

const CloudinaryImage = ({ src, className }) => {
  // TODO: add experience editor

  // capping query string from Sitecore media url
  const originImagePath = src.split('?')[0];

  const cloudinaryAccount = process.env.REACT_APP_CLOUDINARY_ACCOUNT;
  const imageUrl = `https://res.cloudinary.com/${cloudinaryAccount}/image/fetch/c_scale,q_70,w_300/${originImagePath}`;

  if (!cloudinaryAccount) {
    console.error('CLOUDINARY_ACCOUNT environment variable is not specified.');
    return <img src={src} />;
  }

  return <img src={imageUrl} className={className} />;
};

export default CloudinaryImage;
