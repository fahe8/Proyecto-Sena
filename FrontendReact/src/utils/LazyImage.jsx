import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({ src, alt, className }) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur" // Efecto de desenfoque al cargar
      className={className}
    />
  );
};

export default LazyImage;
