import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "../Slider/Slider";
import { useCustomStyle } from "./RecentCarousel.style";
// import ArticleIcon from "assets/Article.png";
// import fallBackImage from "assets/fallBackImage.png";
import {
  formRelativeURL,
  createSliderArray,
  debounce,
  fallBackImage,
  ArticleIcon,
} from "@platformx/utilities";

const RecentCarousel = ({ isVideoLandingPage, data, secondaryArgs }: any) => {
  const platform = secondaryArgs?.platform;
  const classes = useCustomStyle();
  const theme = useTheme();
  const { t } = useTranslation();
  const { gcpUrl, bucketName } = secondaryArgs;
  const [cardArr, setCardArr] = useState([]);
  const onClickCard = (item: any) => {
    if (typeof window !== "undefined") {
      const id = item?.current_page_url;
      const type = item?.content_type === "VOD" ? "video" : "article";
      if (secondaryArgs?.prelemBaseEndpoint?.language) {
        window.open(`/${secondaryArgs?.prelemBaseEndpoint?.language}/${type}${id}`);
      } else {
        window.open(`/${type}${id}`);
      }
    }
  };
  const vodPlayEnable = (item: any) => {
    if (platform !== "isAuthoring") onClickCard(item);
  };
  const settings = {
    dotPosition: "outside",
    arrows: false,
    animationType: "slideIn",
    itemsPerRow: {
      lg: 3,
      md: 3,
      sm: 2,
      xs: 1,
    },
  };

  const updateCardArr = () => {
    const newCardArr = createSliderArray(data, settings.itemsPerRow);
    if (newCardArr) {
      setCardArr(newCardArr);
    }
  };
  const debouncedUpdateCardArr = debounce(updateCardArr, 100);
  useEffect(() => {
    updateCardArr();
    const handleResize = () => {
      debouncedUpdateCardArr();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getRelativeUrl = (item: any) => {
    const { content_type, thumbnail, banner, original_image = {} } = item;
    const { original_image_relative_path, ext } = original_image;
    if (content_type?.toLowerCase() === "vod") {
      if (original_image_relative_path && ext) {
        return formRelativeURL(gcpUrl, bucketName, original_image_relative_path + "." + ext);
      } else {
        return thumbnail || fallBackImage;
      }
    } else {
      if (original_image_relative_path && ext) {
        return formRelativeURL(gcpUrl, bucketName, original_image_relative_path + "." + ext);
      } else {
        return banner || fallBackImage;
      }
    }
  };

  return (
    <Box className={`${classes.recentCarouselWrapper} recentCarouselBg`}>
      <Typography variant='h4medium'>
        {isVideoLandingPage ? t("related_videos") : t("related_articles")}
      </Typography>
      <Grid item xs={12} style={{ marginTop: 0 }}>
        <Box className='recentCarouselContainer'>
          <Slider {...settings}>
            {cardArr.map((slide: any) =>
              slide?.map((item: any, itemIndex: any) => {
                const bannerImage = getRelativeUrl(item);
                return (
                  <Card
                    key={itemIndex}
                    sx={{
                      border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
                      width: "100%",
                      boxShadow: "none",
                      cursor: "pointer",
                      borderRadius: theme.borderRadius.value1,
                      height: "267px",
                      display: "flex!important",
                      flexDirection: "column",
                      color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
                      background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
                      position: "relative",
                    }}
                    onClick={() => vodPlayEnable(item)}>
                    <CardMedia
                      component='img'
                      height='140'
                      width='inherit'
                      image={bannerImage}
                      alt='related article'
                      style={{
                        borderTopLeftRadius: theme.borderRadius.value1,
                        borderTopRightRadius: theme.borderRadius.value1,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        // width: { md: "222px", xs: "336px" },
                        width: "100%",
                        height: "140px",
                        background: "linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000000 100%)",
                        mixBlendMode: "normal",
                        opacity: "0.5",
                      }}></Box>
                    {item?.content_type === "VOD" ? (
                      <Box sx={{ position: "absolute", top: "34%", left: "3%" }}>
                        <PlayCircleOutlineRoundedIcon sx={{ color: "white", fontSize: "40px" }} />
                      </Box>
                    ) : (
                      <img
                        alt='RecentCarousel'
                        src={ArticleIcon}
                        height='40'
                        width='40'
                        loading='lazy'
                        style={{
                          position: "absolute",
                          marginTop: "94px",
                          marginLeft: "3px",
                        }}
                      />
                    )}
                    <CardContent style={{ padding: "10px 10px 0px 10px", flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant='h5medium'
                        className='noMarginBoth title'
                        component='div'
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "2",
                          overflow: "hidden",
                        }}>
                        {item?.title}
                      </Typography>
                    </CardContent>
                    <CardActions className='actionBar'>
                      <Box style={{ display: "grid" }}>
                        <Typography variant='h7medium' className='noMarginBoth title'>
                          {item?.author}
                        </Typography>
                        <Typography variant='h7medium' className='noMarginBoth title'>
                          {item?.publishedDate
                            ? format(new Date(item?.publishedDate), "LLL dd, yyyy | H:mm")
                            : "-"}
                        </Typography>
                      </Box>
                    </CardActions>
                  </Card>
                );
              }),
            )}
          </Slider>
        </Box>
      </Grid>
    </Box>
  );
};

export default RecentCarousel;
