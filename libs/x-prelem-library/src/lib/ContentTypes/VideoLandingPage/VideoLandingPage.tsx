import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Card, CardHeader, Chip, Divider, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { default as React, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { nullToObject } from "@platformx/utilities";
// import RecentCarousel from "../../components/RecentCarousel/RecentCarousel";
import Share from "../../components/Share/Share";
import { useCustomStyle } from "./videoLandingPage.style";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";
import "../../Style.css";
import "../../utils/service/i18n";

const BrightcovePlayer: any = React.lazy(
  () => import("../../components/BrightcovePlayer/BrightcovePlayer"),
);

const VideoLandingPage = (props: any) => {
  const { content, analytics, authoringHelper = {}, secondaryArgs = {} } = nullToObject(props);
  const { isAuthoring = false } = nullToObject(authoringHelper);
  const classes = useCustomStyle();
  const getVodUrl = () => {
    let id = content?.CurrentPageURL;
    if (id && id.charAt(0) === "/") {
      id = id.substring(1);
    }
    if (secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint) {
      return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/video/${id}`;
    } else {
      return `/video${id}`;
    }
  };
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [playVideo, setPlayVideo] = useState(false);
  const { t, i18n } = useTranslation();
  // const url = new URL(window.location.href);
  useEffect(() => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    try {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (e) {
      return "";
    }
  };
  const showPublishedDate = () => {
    let showDate = "";
    showDate = !isAuthoring
      ? content?.PublishedDate
      : content?.lastModifiedDate
      ? content?.lastModifiedDate
      : new Date();
    if (!showDate) return "";
    return ` ${format(new Date(showDate), "LLL dd, yyyy | H:mm")}`;
  };
  const playVodEnable = () => {
    if (!isAuthoring) setPlayVideo(true);
  };

  const publishUrl = secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl;
  const language = secondaryArgs?.prelemBaseEndpoint?.language;

  const embedPageURL = publishUrl + language + "/embed/video" + content?.CurrentPageURL;
  const landingPageURL = publishUrl + language + "/video" + content?.CurrentPageURL;

  const embedData = {
    Title: content?.Title,
    Description: content?.Description,
    Thumbnail: content?.Thumbnail,
    Author: content?.Author,
    creationDate: content?.lastModifiedDate,
    Page: embedPageURL,
    LandingPage: landingPageURL,
    ContentURL: content?.PageSettings?.SocialOgURL,
  };
  return (
    <div ref={authoringHelper?.innerRef}>
      <Grid
        container
        ref={ref}
        className={`${classes.videoLandingPageWrapper} videoLandingPage prelem-pb`}>
        <Grid container>
          <Grid item xs={12}>
            {content?.PlayerType === "AWS" ? (
              <Box
                sx={{
                  height: {
                    md: "500px",
                    sm: "500px",
                    xs: "321px",
                    lg: "500px",
                  },
                }}>
                <VideoPlayer
                  playerProp={{
                    posterImg: content?.LatestVods[0]?.thumbnail,
                    videoUrl: content?.StreamingURL,
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: "15px", sm: "25px" },
                    margin: { xs: "0 4%", sm: "0" },
                    width: { sm: "100%" },
                  }}>
                  <Typography sx={{ margin: { sm: "0 auto" }, width: { sm: "700px" } }}>
                    <PlayArrowRoundedIcon
                      onClick={playVodEnable}
                      style={{
                        background: "white",
                        borderRadius: "100px",
                        color: "black",
                        padding: "16px",
                        cursor: "pointer",
                      }}
                      sx={{
                        fontSize: { xs: "57px", sm: "77px" },
                      }}
                    />
                  </Typography>
                </Box>
                <Box
                  className='gradient'
                  sx={{
                    height: {
                      md: "500px",
                      sm: "500px",
                      xs: "321px",
                      lg: "500px",
                    },
                  }}>
                  <img
                    src={content.Thumbnail}
                    alt={"Thumbnail_Image"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {playVideo && typeof window !== "undefined" && (
                    <Box
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                      }}>
                      <Suspense fallback={"Loading..."}>
                        <BrightcovePlayer
                          // options={{ mute: true }}
                          analytics={analytics}
                          analyticsEnable={content?.AnalyticsEnable}
                          prelemTitle={"Videolanding Page"}
                          VideoData={{
                            VideoID: content?.VodVideoId,
                            PlayerID: content?.PlayerId,
                            AccountID: content?.VodAccountId,
                            PlaylistID: content?.Poster,
                          }}
                        />
                      </Suspense>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Card
              className='videoPageCard'
              style={{ boxShadow: "none", borderRadius: "0px" }}
              sx={{
                margin: { xs: "0", md: "0 auto" },
                padding: { xs: "0px 3% 0px 3%", md: "0px" },
                width: { sm: "700px" },
              }}>
              <Box sx={{ padding: { xs: "6% 0", sm: "3% 0 2%" } }}>
                <Typography variant='h1bold' className='noMarginBoth'>
                  {capitalizeFirstLetter(content?.Title)}
                </Typography>
                {content?.Description && (
                  <Typography
                    variant='h6regular'
                    className='noMarginBottom'
                    sx={{
                      marginTop: { xs: "4%", sm: "2%" },
                      whiteSpace: "pre-wrap",
                    }}
                    // dangerouslySetInnerHTML={{ __html: content?.Description }}
                  >
                    {content?.Description}
                  </Typography>
                )}
              </Box>
              <Divider />
              <Box
                sx={{
                  padding: "12px 0px 12px 0px",
                  display: "inline-block",
                  width: "100%",
                }}>
                <Box
                  sx={{
                    width: { xs: "100%", sm: "68%" },
                    float: { sm: "left" },
                  }}>
                  <CardHeader
                    sx={{ padding: "0" }}
                    titleTypographyProps={{
                      variant: "h6bold",
                      sx: { float: "left", paddingRight: "5px", width: "auto" },
                    }}
                    title={`${capitalizeFirstLetter(content?.Author)} |`}
                    subheaderTypographyProps={{
                      variant: "h6medium",
                      className: "publishTime",
                    }}
                    subheader={showPublishedDate()}
                  />
                  <Box sx={{ marginTop: "1%" }}>
                    {content.Tags?.length &&
                      content.Tags.slice(0, 3)?.map((tag: string) => {
                        return (
                          <Chip
                            label={tag}
                            key={tag}
                            variant='outlined'
                            style={{
                              marginTop: "1%",
                              marginRight: "6px",
                              backgroundColor: "#e6eaed",
                              borderRadius: "3px",
                              border: "none",
                              fontSize: "12px",
                              fontWeight: "normal",
                            }}
                          />
                        );
                      })}
                    {content.Tags?.length > 3 && (
                      <Typography variant='h6regular' component='span' className='counter'>
                        + {content.Tags?.length - 3}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: { xs: "18px", sm: "14px" },
                    width: { xs: "100%", sm: "26%" },
                    float: { sm: "right" },
                  }}>
                  <Typography variant='subtitle2'>{t("share_text")}</Typography>
                  <Share
                    domainUrl={getVodUrl()}
                    shareUrl={content?.PageSettings?.SocialOgURL}
                    embedData={embedData}
                    whiteIcon={false}
                    border='1px solid black'
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  margin: { xs: "0 -3%", md: "0" },
                  padding: { xs: "20px 5%", md: "0" },
                }}>
                {/* {!isAuthoring && content?.LatestVods?.length > 0 && (
                  <RecentCarousel
                    data={isAuthoring ? latestVODs : content?.LatestVods}
                    isVideoLandingPage={true}
                    secondaryArgs={
                      isAuthoring ? { ...secondaryArgs, platform: "isAuthoring" } : secondaryArgs
                    }
                  />
                )} */}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

VideoLandingPage.defaultProps = {
  content: {
    Page: "shutterstock-1060700614-test",
    Description: null,
    Title: "shutterstock_1060700614-test",
    DsapceVideoUrl:
      "https://dev.dam.hcl-x.com/server/api/core/bitstreams/3db76142-e5a8-40c8-b58d-ce6e8caa4994/content",
    Thumbnail:
      "https://dev.dam.hcl-x.com/server/api/core/bitstreams/453adf43-68aa-4af7-a64b-a264f5c48462/content",
    Poster: null,
    ShortDescription: null,
    TagName: "VOD",
    VodVideoId: "adbc80a2-2514-5e16-ad60-dd3a6a794ade",
    VodAccountId: null,
    PlayerId: "default",
    PlayerType: "AWS",
    PublishedDate: "2023-10-05T05:44:20Z",
    CurrentPageURL: "/shutterstock-1060700614-test",
    ParentPageURL: "/",
    Tags: ["Courses"],
    Page_State: "PUBLISHED",
    lastModifiedDate: "2023-10-05T05:44:13Z",
    Author: "Manoj Jain",
    Page_CreatedBy: "api",
    Page_LastModifiedBy: "api",
    Page_PublishedBy: "Manoj",
    IsEdit: false,
    IsSoftDelete: false,
    SeoEnable: true,
    AnalyticsEnable: true,
    RobotTxt: false,
    SiteMap: false,
    Others: null,
    Analytics: null,
    StructureData:
      '{"@context":"https://schema.org","@graph":[{"@type":"VideoObject","contentUrl":"https://dev.dam.hcl-x.com/server/api/core/bitstreams/3db76142-e5a8-40c8-b58d-ce6e8caa4994/content","name":"shutterstock_1060700614-test","description":"","embedUrl":"https://dev.dam.hcl-x.com/server/api/core/bitstreams/3db76142-e5a8-40c8-b58d-ce6e8caa4994/content","thumbnailUrl":{"@id":"https://dev.dam.hcl-x.com/server/api/core/bitstreams/453adf43-68aa-4af7-a64b-a264f5c48462/content"}}]}',
    Seo: null,
    DevelopedBy: "Manoj",
    DevelopedDate: "2023-10-05T05:44:20Z",
    creationDate: "2023-10-05T05:43:54Z",
    PageSettings: {
      Page: "shutterstock-1060700614-test",
      Description: "",
      PageViewer: "",
      PageCaching: "",
      PageMobileFriendly: "",
      SeoTitle: "shutterstock_1060700614-test",
      SeoDescription: "",
      SchedulePublishDateTime: "",
      SeoKeywords: ["Courses"],
      SeoBlockIndexing: "",
      SocialOgTitle: "shutterstock_1060700614-test",
      SocialOgDescription: "",
      SocialOgSiteName: "shutterstock_1060700614-test",
      SocialOgType: "video article",
      SocialOgURL: "https://dev.hcl-x.com/en/video/shutterstock-1060700614-test",
      SocialOgLocale: "",
      SocialOgImage:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/453adf43-68aa-4af7-a64b-a264f5c48462/content",
      SocialOgTwitterTitle: "shutterstock_1060700614-test",
      SocialOgTwitterDescription: "",
      SocialOgTwitterImage:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/453adf43-68aa-4af7-a64b-a264f5c48462/content",
      SocialOgTwitterURL: "https://dev.hcl-x.com/en/video/shutterstock-1060700614-test",
      SocialTwitterCardSize: "",
      IsScheduleUnpublish: "",
      ScheduleUnpublishDateTime: "",
      IsSchedulePublish: "",
    },
    LatestVods: [
      {
        Page: "easyjet-holidays-tv-advert-2019-hide-seek-1080p-new-video",
        title: "easyJet holidays TV advert 2019  Hide  Seek_1080p new video",
        description: "Dev test",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/cbf1af71-8111-432a-9a71-f1dba40575c4/content",
        current_page_url: "/easyjet-holidays-tv-advert-2019-hide-seek-1080p-new-video",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/f5b53cfe-495a-49d5-a2e6-983d031b73f2/content",
        page_lastmodifiedby: "Harsh",
        Page_PublishedBy: "Harsh",
        publishedDate: "2023-10-05T09:26:12Z",
        lastModifiedDate: "2023-10-05T09:26:04Z",
        content_type: "VOD",
        author: "Harsh",
      },
      {
        Page: "hcltech-ers-tss",
        title: "hcltech_ers_tss",
        description: "HCL TSS",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/f9d5d046-64d0-4d95-b971-8b560f09c7aa/content",
        current_page_url: "/hcltech-ers-tss",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/d9cc14a1-13cb-4ebe-9e01-02c6ef28fde8/content",
        page_lastmodifiedby: "Harsh",
        Page_PublishedBy: "Harsh",
        publishedDate: "2023-10-05T09:25:20Z",
        lastModifiedDate: "2023-10-05T09:24:56Z",
        content_type: "VOD",
        author: "Harsh",
      },
      {
        Page: "scenic-relaxation-film-with-calming-music-test123",
        title: "hcl-tech-ERS1",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/ad8ab82d-1992-40e0-925d-bb19a47d8101/content",
        current_page_url: "/scenic-relaxation-film-with-calming-music-test123",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/8373ec6a-4010-4d9c-9cff-523502a2f951/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-04T12:52:59Z",
        lastModifiedDate: "2023-10-04T12:52:35Z",
        content_type: "VOD",
        author: "Manoj",
      },
      {
        Page: "the-novartis-biome-a-catalyst-for-impactful-digital-collaborations-test123",
        title: "The Novartis Biome - a catalyst for impactful digital collaborations-test123",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/22513fde-38e4-45ec-a043-a0f9bafb43f0/content",
        current_page_url:
          "/the-novartis-biome-a-catalyst-for-impactful-digital-collaborations-test123",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/3edaf54e-7d5d-46b1-9e6d-c337f3ead8f1/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-04T10:35:30Z",
        lastModifiedDate: "2023-10-04T10:35:17Z",
        content_type: "VOD",
        author: "Manoj",
      },
      {
        Page: "the-novartis-biome-a-catalyst-for-impactful-digital-collaborations",
        title: "The Novartis Biome - a catalyst for impactful digital collaborations",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/22513fde-38e4-45ec-a043-a0f9bafb43f0/content",
        current_page_url: "/the-novartis-biome-a-catalyst-for-impactful-digital-collaborations",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/3edaf54e-7d5d-46b1-9e6d-c337f3ead8f1/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-04T10:03:38Z",
        lastModifiedDate: "2023-10-04T10:03:15Z",
        content_type: "VOD",
        author: "Manoj",
      },
      {
        Page: "cardio4cities-test555",
        title: "CARDIO4Cities-test555",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/ccd7d803-b4e5-44af-9ed7-654869d83692/content",
        current_page_url: "/cardio4cities-test555",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/a996e0b1-27ed-4b02-8322-7d32a54b5b08/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-04T08:44:59Z",
        lastModifiedDate: "2023-10-04T08:44:43Z",
        content_type: "VOD",
        author: "Manoj",
      },
      {
        Page: "cardio4cities",
        title: "CARDIO4Cities",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/ccd7d803-b4e5-44af-9ed7-654869d83692/content",
        current_page_url: "/cardio4cities",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/a996e0b1-27ed-4b02-8322-7d32a54b5b08/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-04T05:28:08Z",
        lastModifiedDate: "2023-10-04T05:27:57Z",
        content_type: "VOD",
        author: "Manoj",
      },
      {
        Page: "demo-workflow",
        title: "Demo Workflow",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/1a09c827-922e-442e-a34c-501a0404e903/content",
        current_page_url: "/demo-workflow",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/717f48c5-e071-4fa5-a02f-f0fc645c86ac/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-04T04:11:56Z",
        lastModifiedDate: "2023-10-04T04:11:53Z",
        content_type: "VOD",
        author: "Manoj",
      },
      {
        Page: "production-id-3692634-test",
        title: "production ID_3692634-test1",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/52f80292-bbe9-4cc7-b934-bd07c94b7d63/content",
        current_page_url: "/production-id-3692634-test",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/d49afaf4-9d53-449f-8b3f-5de26c83caad/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-03T14:32:28Z",
        lastModifiedDate: "2023-10-03T14:32:22Z",
        content_type: "VOD",
        author: "Manoj",
      },
      {
        Page: "hcltech-in-mexico-123-test",
        title: "HCLTech in Mexico-123-test",
        TagName: "VOD",
        thumbnail:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/e2af65ce-d83e-4cd3-b180-0e29e73b7055/content",
        current_page_url: "/hcltech-in-mexico-123-test",
        ParentPageURL: "/",
        DsapceVideoUrl:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/b14eb00b-8595-4b6d-af85-a351a7618477/content",
        page_lastmodifiedby: "Manoj",
        Page_PublishedBy: "Manoj",
        publishedDate: "2023-10-03T09:06:10Z",
        lastModifiedDate: "2023-10-03T09:05:51Z",
        content_type: "VOD",
        author: "Manoj",
      },
    ],
    UserActionInfo:
      '{"publishByDetails":{"name":"Manoj","email":"manoj.jain@hcl.com","timeZone":"undefined/undefined","pubUnpubDateTime":"2023-10-05T05:44:13.942Z"},"unpublishByDetails":{"name":"","email":"","timeZone":"","pubUnpubDateTime":""}}',
    StreamingURL:
      "https://d1yf059unjnphq.cloudfront.net/1e9c76a0-821c-45d8-ad91-c88afbfb740a/AppleHLS1/shutterstock-1060700614-test_en_3db76142-e5a8-40c8-b58d-ce6e8caa4994_platformx_cddbe334-c004-41db-9942-d004d79a1c61.m3u8",
  },
};

export default VideoLandingPage;
