import React from "react";
import { Image } from "cloudinary-react";

const ResponsiveLazyImage = ({ src, className }) => {
  // TODO: add experience editor

  // capping query string from Sitecore media url
  const originImagePath = src.split("?")[0];

  const cloudinaryAccount = process.env.REACT_APP_CLOUDINARY_ACCOUNT;
  if (!cloudinaryAccount) {
    console.error(
      "REACT_APP_CLOUDINARY_ACCOUNT environment variable is not specified."
    );
    return <img src={src} />;
  }

  return (
    <Image
      cloudName={cloudinaryAccount}
      className={className}
      type="fetch"
      publicId={originImagePath}
      responsive
      width="auto"
      crop="scale"
    />
  );
};

export default ResponsiveLazyImage;
