import NextImage from "next/image";
const XImage = ({ src, alt, ...props }) => {
  if (typeof window === "undefined") {
    return <img src={src} alt={alt} {...props} />;
  }

  return <NextImage src={src} alt={alt} {...props} />;
};

export default XImage;
