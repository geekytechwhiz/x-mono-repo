/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import EastIcon from "@mui/icons-material/East";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import {
  Analytics,
  ArticleSoltIcon,
  EventIcon,
  getImage,
  getLandingPageURLwithoutSlash,
  imgIcon,
  pollIcon,
  quizIcon,
  vodIcon,
} from "@platformx/utilities";
import axios from "axios";
import { useEffect, useState } from "react";
import { useClickImpression } from "../../components/ImpressionHooks/ClickImpressionHook";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";

const typeInfo = {
  Article: {
    icon: ArticleSoltIcon,
    text: "Article",
  },
  Poll: {
    icon: pollIcon,
    text: "Poll",
  },
  Quiz: {
    icon: quizIcon,
    text: "Quiz",
  },
  ImageGallery: {
    icon: imgIcon,
    text: "Image Gallery",
  },
  VideoGallery: {
    icon: vodIcon,
    text: "Video Gallery",
  },
  Gallery: {
    icon: vodIcon,
    text: "Gallery",
  },
  Event: {
    icon: EventIcon,
    text: "Event",
  },
};

const MultiSlotCard2 = ({ content, secondaryArgs, index, analytics }: MultislotCard2Props) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const { triggerClickAnalytics } = useClickImpression();
  useEffect(() => {
    if (
      content.ContentType === "ImageGallery" ||
      content.ContentType === "Gallery" ||
      content.ContentType === "VideoGallery"
    ) {
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
            } else {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery;
            }
            setSliderData(gallery);
          }
        });
    }
  }, []);
  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };
  const onClickCard = (id: string) => (e: any) => {
    if (secondaryArgs.editState) {
      e.preventDefault();
    } else {
      if (typeof window !== "undefined") {
        const url = getLandingPageURLwithoutSlash(
          secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
          secondaryArgs?.prelemBaseEndpoint?.language,
          content.ContentType,
          id,
        );
        triggerClickAnalytics(
          url,
          index,
          analytics,
          secondaryArgs,
          content?.Title,
          content?.ContentType,
        );
        window.open(url);
      }
    }
  };
  const formedUrl = getImage(content, secondaryArgs);
  const { color, imageUrl } = formedUrl;

  return (
    <>
      {["Article", "Quiz", "Poll", "Event"].includes(content.ContentType) ? (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='multiSlotCard2 overlay-wrapper'>
          <Card className='cardItem' onClick={onClickCard(content?.EditorialItemPath)}>
            <Box className='cardItemInner'>
              <CardMedia
                sx={{
                  backgroundColor: color ? color : "",
                  width: "100%",
                  height: "100%",
                }}
                className='bgimage'
                image={imageUrl ? imageUrl : ""}
              />
              <Box className='gradientWrapper' />
              <Box className='expertise-show-case'>
                <Box>
                  <Box className='textUnderline'>
                    <Box display='flex' alignItems='center'>
                      <img
                        src={typeInfo[content.ContentType]?.icon}
                        alt={content.ContentType}
                        width={16}
                        height={16}
                      />
                      <Typography variant='p4regular' className='contentTypeName' color='textColor'>
                        {typeInfo[content.ContentType]?.text || content.ContentType}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant='p2semibold' color='textColor' className='doublebr title'>
                  {content?.Title}
                </Typography>
                <Box display='flex' overflow='hidden' mt='8px' alignItems='center'>
                  <Box className='view-more' position='relative'>
                    <Typography variant='p4regular' color='textColor' className='viewMoreText'>
                      View More
                    </Typography>
                    <EastIcon className='eastIcon' />
                  </Box>
                </Box>
              </Box>
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
          className='multiSlotCard2 overlay-wrapper'
          onClick={toggleModalStatus}>
          <Box className='cardItemInner'>
            <CardMedia
              image={imageUrl ? imageUrl : ""}
              className='bgimage'
              sx={{ backgroundColor: color ? color : "" }}
            />
            <Box className='gradientWrapper' />
            <Box className='expertise-show-case'>
              <Box>
                <Box className='textUnderline'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={typeInfo[content.ContentType]?.icon}
                      alt={content.ContentType}
                      width={16}
                      height={16}
                    />
                    <Typography variant='p4regular' className='contentTypeName' color='textColor'>
                      {typeInfo[content.ContentType]?.text || content.ContentType}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant='p2semibold' className='doublebr title' color='textColor'>
                {content?.Title}
              </Typography>
              <Box display='flex' overflow='hidden' mt='8px' alignItems='center'>
                <Box className='view-more' position='relative'>
                  <Typography variant='p4regular' color='textColor' className='viewMoreText'>
                    View More
                  </Typography>
                  <EastIcon className='eastIcon' />
                </Box>
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
    </>
  );
};

interface MultislotCard2Props {
  content: Content;
  secondaryArgs: any;
  index: number;
  analytics: Analytics;
}

interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription?: string;
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
  PublishedDate: string;
}

MultiSlotCard2.defaultProps = {
  content: {
    Description: "Lorem Ipsum is simply dummy",
    Title: "Lorem ipsum",
    EditorialItemPath: "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
    Thumbnail: {
      Description: "This is for ExpertiseShowcase4",
      Title: "ExpertiseShowcase4",
      AltText: "ExpertiseShowcase4",
      Attribution: false,
      Url: "machine_assets/1690806479275/public/png/ExpertiseShowcase2",
      Name: "ExpertiseShowcase4",
      ext: "png",
    },
  },
};

export default MultiSlotCard2;
