import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import {
  EventIcon,
  SecondaryArgs,
  articleIcon,
  getImage,
  handleHtmlTags,
  onClickCardUrlNavigate,
  pollIcon,
  quizIcon,
} from "@platformx/utilities";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import prelemTypes from "../../globalStyle";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import { useCustomStyle } from "./MultiSlotCard.style";

const MultiSlotCard = ({ content, secondaryArgs }: MultislotCardProps) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  // const { bucketName, gcpUrl } = secondaryArgs; //TODO: need to check with the team

  useEffect(() => {
    if (content.ContentType === "ImageGallery" || content.ContentType === "VideoGallery") {
      axios
        .get(
          `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content?path=${content?.EditorialItemPath}&contentType=${content.ContentType}`,
          {
            headers: {
              sitename: secondaryArgs?.sitename,
            },
          },
        )
        .then((res: any) => {
          if (res) {
            let gallery = [];
            if (content.ContentType === "ImageGallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Image);
            } else if (content.ContentType === "VideoGallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Video);
            }
            setSliderData(gallery);
          }
        });
    }
  }, []);

  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };

  const onClickCard = (e: any, id: string) => {
    if (secondaryArgs.editState) {
      e.preventDefault();
    } else {
      const url = onClickCardUrlNavigate(id, content, secondaryArgs);

      // if (typeof window !== "undefined") {
      //   if (content.ContentType === "VOD") {
      //     const url = getLandingPageURL(
      //       secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
      //       secondaryArgs?.prelemBaseEndpoint?.language,
      //       "video",
      //       id
      //     );
      //     window.open(url);
      //   } else {
      //     const url = getLandingPageURL(
      //       secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
      //       secondaryArgs?.prelemBaseEndpoint?.language,
      //       content.ContentType,
      //       id
      //     );
      //     window.open(url);
      //   }
      //   window.open(url);
      // }
      window.open(url);
    }
  };
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const theme = useTheme();
  const formedUrl = getImage(content, secondaryArgs);
  const { color, imageUrl } = formedUrl;

  return (
    <div
      className={`${classes.MultiSlotCardWrapper} ${globalClasses.prelemType1} prelem prelemType1 MultiSlotCard`}>
      {["Article", "Event"].includes(content.ContentType) ? (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='overlay-wrapper'>
          <Card
            className='cardContentBox'
            onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
            <Box className='imgBox'>
              <CardMedia
                component={imageUrl ? "img" : "div"}
                image={imageUrl ? imageUrl : ""}
                sx={{ backgroundColor: color ? color : "" }}
              />
              <Box className='imgboxOverlay'></Box>
            </Box>

            {content.ContentType.toLowerCase() === "Event".toLowerCase() && (
              <Box className='IconBox'>
                <Image alt='EventIcon' src={EventIcon} />
              </Box>
            )}
            {content.ContentType.toLowerCase() === "Article".toLowerCase() && (
              <Box className='IconBox'>
                <Image alt='ArticleIcon' src={articleIcon} />
              </Box>
            )}
            <CardContent>
              <Typography gutterBottom variant='h4semibold' className='cardTitle'>
                {content.Title}
              </Typography>
              <Typography
                variant='p3regular'
                className='cardDescription'
                //dangerouslySetInnerHTML={{ __html: content.Description || '' }}
              >
                {handleHtmlTags(content.Description)}
              </Typography>
            </CardContent>
            <Box className='BottomButtonBox'>
              <Box className='adminDatdWrapper'>
                <Typography variant='p3regular' className='authorName'>
                  {content?.Author?.trim() || content?.PublishedBy}
                </Typography>
                <Typography variant='p4regular'>
                  {content?.PublishedDate
                    ? format(new Date(content?.PublishedDate), "LLL dd, yyyy | H:mm")
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      ) : content.ContentType.toLowerCase() === "VOD".toLowerCase() ? (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='overlay-wrapper'>
          <Card
            className='cardContentBox'
            onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
            <Box className='imgBox'>
              <CardMedia
                component={imageUrl ? "img" : "div"}
                image={imageUrl ? imageUrl : ""}
                sx={{ backgroundColor: color ? color : "" }}
              />
              <Box className='imgboxOverlay'></Box>
            </Box>
            <Box className='IconBoxWrapper'>
              <PlayCircleOutlineRoundedIcon />
            </Box>
            <CardContent>
              <Typography gutterBottom variant='h4semibold' className='cardTitle'>
                {content.Title}
              </Typography>
              <Typography
                variant='p3regular'
                className='cardDescription'
                //dangerouslySetInnerHTML={{ __html: content.Description || '' }}
              >
                {handleHtmlTags(content.Description)}
              </Typography>
            </CardContent>
            <Box className='BottomButtonBox'>
              <Box className='adminDatdWrapper'>
                <Typography variant='p3regular' className='authorName'>
                  {content?.Author?.trim() || content?.PublishedBy}
                </Typography>
                <Typography variant='p4regular'>
                  {content?.PublishedDate
                    ? format(new Date(content?.PublishedDate), "LLL dd, yyyy | H:mm")
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      ) : content.ContentType.toLowerCase() === "Poll".toLowerCase() ? (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='overlay-wrapper'>
          <Card className='cardContentBox'>
            <Box className='imgBox'>
              <CardMedia
                component={imageUrl ? "img" : "div"}
                image={imageUrl ? imageUrl : ""}
                sx={{
                  backgroundColor: color ? color : "",
                  height: {
                    xs: "204px",
                    sm: "234px",
                    md: "234px",
                    lg: "234px",
                  },
                }}
              />
              <Box className='imgboxOverlay'></Box>
            </Box>
            <Box className='IconBox'>
              <Image alt='card11' src={pollIcon} />
            </Box>
            <CardContent>
              <Typography gutterBottom variant='h4semibold' className='cardTitle'>
                {content.Title}
              </Typography>
              <Typography variant='p3regular' className='cardDescription'>
                {handleHtmlTags(content.Description)}
              </Typography>
            </CardContent>
            <Box className='BottomButtonBox'>
              <Button
                variant='primaryButton1'
                style={{ color: theme.palette.textColor, background: theme.palette.textColor1 }}
                onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
                Start Poll
              </Button>
            </Box>
          </Card>
        </Box>
      ) : content.ContentType.toLowerCase() === "Quiz".toLowerCase() ? (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='overlay-wrapper'>
          <Card className='cardContentBox'>
            <Box className='imgBox'>
              <CardMedia
                component={imageUrl ? "img" : "div"}
                image={imageUrl ? imageUrl : ""}
                sx={{ backgroundColor: color ? color : "" }}
              />
              <Box className='imgboxOverlay'></Box>
            </Box>
            <Box className='IconBox'>
              <Image alt='card12' src={quizIcon} />
            </Box>
            <CardContent>
              <Typography variant='h4semibold' className='cardTitle'>
                {content.Title}
              </Typography>
              <Typography variant='p3regular' className='cardDescription'>
                {handleHtmlTags(content.Description)}
              </Typography>
            </CardContent>
            <Box className='BottomButtonBox'>
              <Button
                variant='primaryButton1'
                style={{ color: theme.palette.textColor, background: theme.palette.textColor1 }}
                onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
                Start Quiz
              </Button>
            </Box>
          </Card>
        </Box>
      ) : (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='overlay-wrapper'
          onClick={toggleModalStatus}>
          <Box className='imageWrapper'>
            <picture>
              <source
                //TODO : need to check with the team
                // srcSet={formCroppedUrlString(gcpUrl, bucketName, content?.Thumbnail?.Url, "webp").src}
                type='image/webp'
              />
              <source srcSet={imageUrl ? imageUrl : ""} type='image/jpeg' />
              <CardMedia
                component={imageUrl ? "img" : "div"}
                image={imageUrl ? imageUrl : ""}
                sx={{ backgroundColor: color ? color : "" }}
              />
            </picture>
            <Box className='bottomButtomWrapper'>
              <Button variant='defaultButton1'>{content?.Title}</Button>
            </Box>
          </Box>
          <Box
            className='image-button-text'
            sx={{
              display: secondaryArgs?.editState ? "none" : "flex",
            }}>
            <Box className='button-name' sx={{ display: "none" }}>
              <Box className='topButtomWrapper'>
                <Button variant='defaultButton1'>{content?.Title}</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {modalStatus && sliderData && sliderData.length > 0 && !secondaryArgs?.editState && (
        <ImageVideoGalleryModalSlider
          sliderData={sliderData}
          openModal={modalStatus}
          contentType={content.ContentType}
          handleClose={toggleModalStatus}
        />
      )}
    </div>
  );
};

interface MultislotCardProps {
  content: Content;
  secondaryArgs: SecondaryArgs;
}

interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription: string;
  Thumbnail: {
    Description?: string;
    Title?: string;
    AltText: string;
    Attribution: boolean;
    Url: string;
    Name: string;
    Color: string;
    ext: string;
  };
  ContentType: string;
  PublishedBy: string;
  Author: string;
  PublishedDate: string;
}

MultiSlotCard.defaultProps = {
  content: {
    Description: "Lorem Ipsum is simply dummy",
    Title: "Lorem ipsum",
    EditorialItemPath: "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
    Thumbnail: {
      Description: "This is for ExpertiseShowcase4",
      Title: "ExpertiseShowcase4",
      AltText: "ExpertiseShowcase4",
      Attribution: false,
      ext: "png",
      Url: "machine_assets/1689925750685/public/png/ContactUs",
      Name: "ExpertiseShowcase4",
    },
  },
};

export default MultiSlotCard;
