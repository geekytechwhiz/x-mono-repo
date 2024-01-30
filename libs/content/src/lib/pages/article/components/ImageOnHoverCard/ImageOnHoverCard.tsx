import CachedIcon from "@mui/icons-material/Cached";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import { Box, Grid } from "@mui/material";
import PictureComponent from "../ArticleImageRender/Components/PictureComponent";
import { useStyles } from "./ImageOnHover.styles";
// import CommonPictureComponent from "../../../Gallery/CommonPictureComponent";

export const ImageOnHoverCard = ({
  Url,
  onUploadClick,
  imageCropHandle,
  setIsClickedPublish,
  setOnHover,
  publishedImages,
}) => {
  const classes = useStyles();
  const imgOrder = {
    1440: "hero",
    1280: "hero",
    1024: "portrait",
    768: "portrait",
    600: "square",
    320: "square",
  };
  return (
    <Grid container>
      <Grid item xs={12} md={9} lg={5}>
        <Box
          className={classes.onHoverImage}
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}>
          <PictureComponent croppedImages={publishedImages} imgOrder={imgOrder} />
          <Box
            sx={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "inherit",
              display: "flex",
              alignItems: "right",
              justifyContent: "right",
              borderRadius: "5px",
            }}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
              }}>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setIsClickedPublish(false);
                  onUploadClick("Images", "replace");
                }}>
                <Box
                  sx={{
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "50px",
                    right: "14px",
                  }}>
                  <CachedIcon sx={{ fontSize: "20px" }} />
                </Box>
              </Box>
              <Box sx={{ cursor: "pointer" }} onClick={imageCropHandle}>
                <Box
                  sx={{
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "14px",
                    right: "14px",
                  }}>
                  <CropOutlinedIcon sx={{ fontSize: "20px" }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
