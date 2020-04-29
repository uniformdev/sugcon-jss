import React from "react";

const Logo = ({ src, width }) => {
  const cloudinaryAccount = process.env.REACT_APP_CLOUDINARY_ACCOUNT;
  if (!cloudinaryAccount) {
    console.error(
      "REACT_APP_CLOUDINARY_ACCOUNT environment variable is not specified."
    );
    return <img src={src} />;
  }
  const cloudinaryUrl = `https://res.cloudinary.com/${cloudinaryAccount}/image/fetch/f_auto,q_90,w_${width}/`;
  const imageSrc = src ? src.split("?")[0] : src;
  return <img src={`${cloudinaryUrl}${imageSrc}`} />;
};

export default Logo;
