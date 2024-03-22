import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  Analytics,
  SecondaryArgs,
  getImage,
  handleHtmlTags,
  onClickCardUrlNavigate,
} from "@platformx/utilities";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useClickImpression } from "../../components/ImpressionHooks/ClickImpressionHook";
import { getIcon } from "../../components/Utils/helperFns";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";

const DynamicPrelemCard = ({
  content,
  secondaryArgs,
  analytics,
  cardIndex,
}: DynamicPrelemCardProps) => {
  const { triggerClickAnalytics } = useClickImpression();
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

  const onClickCard = (e: any, id: string) => {
    if (secondaryArgs.editState) {
      e.preventDefault();
    } else {
      const url = onClickCardUrlNavigate(id, content, secondaryArgs);
      triggerClickAnalytics(
        url,
        cardIndex,
        analytics,
        secondaryArgs,
        content?.Title,
        content?.ContentType,
      );
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
        <Card
          className='cardContentBox'
          onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
          <Box className='imgBox'>
            <CardMedia
              sx={{
                backgroundColor: color ? color : "",
                height: "100%",
              }}
              image={imageUrl ? imageUrl : ""}>
              <Box className='imgboxOverlay'></Box>
              <Box className='IconBox'>
                <img alt='DynamicPrelemCardImg' src={getIcon(content?.ContentType)} />
              </Box>
            </CardMedia>
          </Box>

          <CardContent className='childCard'>
            <Typography variant='h4semibold' className='cardTitle'>
              {content.Title}
            </Typography>
            <Typography variant='p3regular' className='cardDescription'>
              {handleHtmlTags(content?.Description)}
            </Typography>
          </CardContent>
          <Box className='devider' />
          <Box className='BottomButtonBox childCard'>
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

interface DynamicPrelemCardProps {
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
}

DynamicPrelemCard.defaultProps = {
  content: {
    Description: "Lorem Ipsum is simply dummy",
    Title: "Lorem ipsum",
    EditorialItemPath: "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
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

export default DynamicPrelemCard;
