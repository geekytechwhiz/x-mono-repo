import React from "react";
import Image from "next/image";

const SvgWrapper = ({ svgPath, ...props }) => {
    return <Image src={svgPath} alt="SVG" {...props} />;
};

export default SvgWrapper;
