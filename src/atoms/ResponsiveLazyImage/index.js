import React from "react";
import { Image } from "cloudinary-react";

const ResponsiveLazyImage = ({ src, className }) => {
  // TODO: add experience editor
  const originImagePath = src.split("?")[0];
  return (
    <Image
      cloudName="altola"
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
