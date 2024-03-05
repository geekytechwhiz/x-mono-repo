import { Box } from "@mui/material";
import { loadergif } from "@platformx/utilities";
import { useCustomStyle } from "./ProductLoader.style";
import Image from "next/image";

const ProductLoader = () => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.circularLoaderDivWrapper} loadingImgWrapperLoader`}>
      <Image alt='loader' src={loadergif} className='loaderImg' />
    </Box>
  );
};

export default ProductLoader;
