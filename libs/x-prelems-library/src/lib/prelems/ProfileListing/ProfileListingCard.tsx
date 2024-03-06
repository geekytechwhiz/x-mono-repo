import { Box, CardMedia, Typography } from "@mui/material";
import {
  Analytics,
  CardBgImg,
  SecondaryArgs,
  getImage,
  onClickCardUrlNavigate,
} from "@platformx/utilities";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageVideoGalleryModalSlider from "../../components/ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import { IMPRESSIONS } from "../../components/ImpressionHooks/constants";
import {
  createClickImpression,
  snowplowPrelemClickImpression,
} from "../../components/ImpressionHooks/helper";
import usePlatformAnalytics from "../../hooks/usePlatformxAnalytics";

const ProfileListingCard = ({
  content,
  secondaryArgs,
  analytics,
  cardIndex,
}: ProfileListingCardProps) => {
  const [handleTrack] = usePlatformAnalytics();
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    if (
      content?.EditorialItemPath &&
      (content.ContentType === "ImageGallery" ||
        content.ContentType === "VideoGallery" ||
        content.ContentType === "Gallery")
    ) {
      axios
        .get(
          `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content?path=${content?.EditorialItemPath}&contentType=${content.ContentType}&documentType=hclplatformx:SiteComponentImageVideoGallery`,
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
            } else if (content.ContentType === "Gallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x);
            }
            setSliderData(gallery);
          }
        });
    }
  }, []);

  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };

  const triggerAnalytics = (url: string) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        prelemSlotNumber: cardIndex + 1,
        contentType: content?.ContentType,
        contentTitle: content?.Title,
        contentUrl: url,
      };
      const cardClickAnalyticsObj = createClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        {},
        cardClickObj,
      );
      const cardClickSnowplowObj = snowplowPrelemClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        {},
        cardClickObj,
      );
      handleTrack(IMPRESSIONS?.TRACKID, cardClickSnowplowObj);
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, cardClickAnalyticsObj);
    }
  };

  const onClickCard = (e: any, id: string) => {
    if (secondaryArgs.editState) {
      e.preventDefault();
    } else {
      const url = onClickCardUrlNavigate(id, content, secondaryArgs);
      triggerAnalytics(url);
      if (["ImageGallery", "VideoGallery", "Gallery"].includes(content.ContentType)) {
        toggleModalStatus();
      } else if (url) {
        window.open(url);
      }
    }
  };

  const formedUrl = getImage(content, secondaryArgs);
  const { color, imageUrl } = formedUrl;

  return (
    <>
      <Box
        sx={{
          "&:hover": {
            ".button-name": {
              display: secondaryArgs?.editState ? "none" : "block",
            },
          },
        }}
        className='overlay-wrapper'>
        <Box className='cardContentBox' onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
          <Box className='bgImgPt'>
            <img src={CardBgImg} alt='Bg image' />
          </Box>
          <Box className='imgBox'>
            <CardMedia
              component={imageUrl ? "img" : "div"}
              image={imageUrl ? imageUrl : ""}
              sx={{
                backgroundColor: color ? color : "",
              }}
            />
          </Box>

          <Box className='childCard'>
            <Box className='categoryName'>
              <Typography variant='h7bold' className='onelineTitle' color='textColor'>
                {content.category}
              </Typography>
            </Box>
            <Box className='bottomContent'>
              <Box className='numberWp'>
                <Typography variant='h1bold' className='onelineTitle' color='textColor'>
                  {content.number}
                </Typography>
              </Box>
              <Box className='nameWp'>
                <Typography variant='p1bold' className='onelineTitle' color='textColor'>
                  {content.first_name}
                </Typography>
                <Typography variant='p1bold' className='onelineTitle' color='#F00'>
                  {content.last_name}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
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

interface ProfileListingCardProps {
  content: Content;
  secondaryArgs: SecondaryArgs;
  analytics: Analytics;
  cardIndex: number;
}

interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription: string;
  ButtonText?: string;
  Thumbnail: {
    Description?: string;
    Title?: string;
    AltText: string;
    Attribution: boolean;
    Url: string;
    Name: string;
    ObjectType?: string;
    Color?: string;
    ext?: string;
  };
  ContentType: string;
  PublishedBy: string;
  Author: string;
  PublishedDate: string;
  background_content: any;
  first_name: string;
  last_name: string;
  number: number;
  category: string;
}

ProfileListingCard.defaultProps = {
  content: {
    Description: "Lorem Ipsum is simply dummy",
    Title: "Lorem ipsum",
    EditorialItemPath: "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
    ButtonText: "View",
    Thumbnail: {
      Description: "This is for ExpertiseShowcase4",
      Title: "ExpertiseShowcase4",
      AltText: "ExpertiseShowcase4",
      Attribution: false,
      Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0618d773-f5cd-402b-9e28-a8f17e820101/content",
      Name: "ExpertiseShowcase4",
    },
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
  },
};

export default ProfileListingCard;
