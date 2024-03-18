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

const DynamicPrelemCard2 = ({
  content,
  secondaryArgs,
  analytics,
  cardIndex,
}: DynamicPrelemCard2Props) => {
  const { triggerClickAnalytics } = useClickImpression();
  const [modalStatus, setModalStatus] = useState(false);
  const [, setSliderData] = useState([]);
  const styles = `
    .doublebr {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
     }
     .oneline {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
       }
     .threeline {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
       }
     `;
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
      if (typeof window !== "undefined") {
        const url = onClickCardUrlNavigate(id, content, secondaryArgs);
        // let url = "";
        // if (id && id.charAt(0) === "/") {
        //   // eslint-disable-next-line no-param-reassign
        //   id = id.substring(1);
        // }
        // if (content.ContentType === "VOD") {
        //   url = getLandingPageURL(
        //     secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        //     secondaryArgs?.prelemBaseEndpoint?.language,
        //     "video",
        //     id
        //   );
        // } else if (convertToLowerCase(content.ContentType) === "community") {
        //   url = id;
        // } else if (content.ContentType === "Course") {
        //   url = getCourseLandingPageURL(
        //     secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        //     secondaryArgs?.prelemBaseEndpoint?.language,
        //     content.ContentType,
        //     id
        //   );
        // } else {
        //   url = getLandingPageURL(
        //     secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
        //     secondaryArgs?.prelemBaseEndpoint?.language,
        //     content.ContentType,
        //     id
        //   );
        // }
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
    }
  };

  const formedUrl = getImage(content, secondaryArgs);
  const { color, imageUrl } = formedUrl;

  return (
    <>
      <style>{styles}</style>
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
          <Box
            className='imgBox'
            sx={{
              height: "100% !important",
            }}>
            <CardMedia
              sx={{
                height: "100%",
                backgroundColor: color ? color : "",
              }}
              image={imageUrl ? imageUrl : ""}
              component={imageUrl ? "img" : "div"}
            />
          </Box>
          <CardContent className='card2Content'>
            <Box className='card2ContentInnerWrapper'>
              <img
                alt='DynamicPrelemCard2'
                src={getIcon(content?.ContentType)}
                style={{ width: "100%" }}
              />
            </Box>
            <Box>
              <Typography variant='h4semibold' className='cardTitle' color='textColor'>
                {content?.Title}
              </Typography>
              <Typography variant='p3regular' className='cardDescription' color='textColor'>
                {handleHtmlTags(content?.Description)}
              </Typography>
            </Box>
            <Box className='card2bottomButtonBox'>
              <Box className='adminDatdWrapper'>
                <Typography variant='p3semibold' color='textColor'>
                  {content?.Author?.trim() || content?.PublishedBy}
                </Typography>
                <Typography variant='p4regular' color='textColor'>
                  {content?.PublishedDate
                    ? format(new Date(content?.PublishedDate), "LLL dd, yyyy | H:mm")
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

interface DynamicPrelemCard2Props {
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
  PublishedDate: string;
  Author: string;
  background_content: any;
}

DynamicPrelemCard2.defaultProps = {
  content: {
    Description:
      "Welcome to the Ultimate Art Quiz. Students are learning about the seven elements of art during class.",
    Title: "I got 99 problems and this quiz is one",
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

export default DynamicPrelemCard2;
