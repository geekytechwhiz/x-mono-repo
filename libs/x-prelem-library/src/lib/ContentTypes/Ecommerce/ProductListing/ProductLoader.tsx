import { Box } from "@mui/material";
import { DataLoderGif } from "@platformx/utilities";
import { useCustomStyle } from "./ProductLoader.style";

const ProductLoader = () => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.circularLoaderDivWrapper} loadingImgWrapperLoader`}>
      <img alt='loader' src={DataLoderGif} className='loaderImg' />
    </Box>
  );
};

export default ProductLoader;
