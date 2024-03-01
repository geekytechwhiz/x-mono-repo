import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import "./ContentTypeCard.css";
import { ImageIcon, VODIcon } from "@platformx/utilities";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useContentGlleryStyle from "./DamContentGllery.style";

const ContentTypeCard = ({
  content,
  isLoading,
  selectedCardIndex,
  onSelectCard,
  setImageData,
  imageData,
}) => {
  const minCss = `
    .singlebr {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .doublebr {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }`;
  const titleMaxLength = 35;
  const onClick = () => {
    setImageData({
      Thumbnail: content.thumbnail.content_url,
      Title: content?.name,
      Description: "",
      Author: content?.thumbnail?.publisher,
      bitStreamId: content?.thumbnail?.uuid,
      Url: "",
      bundlesUrl: content?.bundles?.bitstreams,
    });
  };
  const icon = {
    Image: ImageIcon,
    Video: VODIcon,
  };
  const [, setHovered] = useState(false);
  const classes = useContentGlleryStyle();

  const handleClick = () => {
    onClick();
    onSelectCard(content.uuid); // Assuming content.index is a unique identifier for the card
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ height: "100%", width: "100%" }} className='skeleton skeleton-card'></Box>
      ) : (
        <Card
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
          className={`contenttype_card ${selectedCardIndex === content.uuid ? "selected" : ""} ${
            classes.containbox
          }`}>
          <style>{minCss}</style>

          <CardMedia image={content.thumbnail.content_url} className={classes.container} />

          <Box className={classes.cardmedia}></Box>

          <CardContent className={classes.cardcontent}>
            {selectedCardIndex === content.uuid && (
              <Box className={classes.contentbox}>
                <CheckCircleOutlineIcon
                  style={{
                    color: "white",
                    fontSize: "4rem",
                  }}
                />
              </Box>
            )}
            <Box className={classes.contentcardwrap}>
              <Box className={classes.contentboxwrap}>
                <img alt={content?.entityType} src={icon[content?.entityType || "Image"]} />
                <Typography
                  gutterBottom
                  variant='h7regular'
                  sx={{ color: "inherit", margin: "0 0 1px 4px" }}>
                  {content?.entityType}
                </Typography>
              </Box>

              <Typography
                gutterBottom
                variant='p3medium'
                // component='h2'
                className={classes.contentwrap}
                sx={{
                  maxWidth: {
                    xs: "110px",
                    sm: "87px",
                    md: "152px",
                    lg: "152px",
                    xl: "152px",
                  },
                  "&:hover": {
                    overflow: "visible",
                    whiteSpace: "normal",
                    height: "auto",
                  },
                }}>
                {content?.thumbnail?.publisher &&
                content?.thumbnail?.publisher?.length > titleMaxLength ? (
                  <>{`${content?.thumbnail?.publisher?.substring(0, titleMaxLength)}...`}</>
                ) : (
                  <>{content?.thumbnail?.publisher}</>
                )}
              </Typography>
              <Typography
                className='doublebr'
                gutterBottom
                sx={{
                  color: "#ced3d9",
                  textTransform: "capitalize",
                  marginBottom: "1px",
                }}
                variant='h7semibold'>
                {content?.name}
              </Typography>
              <Box className={classes.boxlastcontent}>
                <Typography gutterBottom sx={{ color: "#ced3d9" }} variant='h7semibold'>
                  {content?.lastModified &&
                    format(new Date(content?.lastModified), "LLL dd, yyyy | H:mm")}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ContentTypeCard;
