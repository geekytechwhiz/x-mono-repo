import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Grid, Typography } from "@mui/material";
import { useComment } from "@platformx/authoring-apis";
import { CommentListPanel, CommentWrapper } from "@platformx/comment-review";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import CommonImageRender from "../../Gallery/CommonImageRender";
import { XImageRender } from "@platformx/x-image-render";
import { useStyles } from "../../CreateArticle.styles";
import Description from "../Description/Description";
import { ImageOnHoverCard } from "../ImageOnHoverCard/ImageOnHoverCard";
import Title from "../Title";

export const ArticleDetails = ({
  returnBack,
  onHover,
  setOnHover,
  content,
  setContent,
  state,
  setState,
  setSelectedImage,
  selectedImage,
  onUploadClick,
  showMediaOption,
  setShowMediaOption,
  operationType,
  resetSelectedImage,
  updateImageField,
  setIsClickedPublish,
  count,
  imageCropHandle,
  isArticleCrop,
  id,
  setCheckDesc,
  workflow,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { comments, handleCommentClick, scrollToRef, selectedElementId } = useComment();

  const handleClearImage = () => {
    setContent({ Url: "", Title: "", Description: "", bitStreamId: "" });
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        settings: {
          ...state.CommonFields.settings,
          socialog_image: "",
        },
        structure_data: "",
      },
      ObjectFields: {
        ...state.ObjectFields,
        banner: "",
        published_images: [],
        original_image: {},
      },
    });
    resetSelectedImage();
  };

  const ifBanner = () => {
    return state?.ObjectFields?.banner !== "" ? true : false;
  };

  useEffect(() => {
    const originalImage = state?.ObjectFields?.original_image;
    if (id && originalImage && Object.keys(originalImage).length !== 0) {
      setSelectedImage({
        Thumbnail: originalImage.Thumbnail,
        Title: "",
        Description: "",
        bitStreamId: originalImage.bitStreamId,
      });
    }
  }, [id, state?.ObjectFields?.original_image]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Box className='createarticlebottomhead'>
          <Box className='d-flex align-items-center justify-content-space-between'>
            <Box className='backarrow' onClick={returnBack}>
              <ArrowBackIcon />
            </Box>
          </Box>
        </Box>
        <Grid
          container
          sx={{
            padding: {
              lg: "0 20px 30px 286px",
              xs: "0 20px 30px 20px",
              md: "0 20px 30px 200px",
            },
            maxHeight: "calc(100vh - 68px)",
            flexWrap: "nowrap",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}>
          <Grid container>
            <Grid item xs={12} md={9} lg={5}>
              <CommentWrapper
                elementId='1'
                scrollRef={scrollToRef}
                // comments={comments}
                workflow={workflow}>
                <Box className={classes.contentStyle}>
                  <Box
                    onMouseEnter={() => ifBanner() && setOnHover(true)}
                    className={classes.imgUploadBox}
                    sx={{ overflow: "hidden" }}>
                    <XImageRender
                      callBack={updateImageField}
                      data={{
                        original_image: state?.ObjectFields?.original_image,
                        published_images: state?.ObjectFields?.published_images,
                      }}
                    />
                  </Box>
                  <Box sx={{ paddingLeft: "14px" }}>
                    {/* <CommentWrapper
                  elementId='1'
                  scrollRef={scrollToRef}
                  comments={comments}
                  workflow={workflow}
                > */}
                    <Typography variant='h7medium'>
                      {ifBanner() ? `${t("banner")}: ${content?.Title}` : t("choose_banner")}
                    </Typography>
                    {/* </CommentWrapper> */}
                  </Box>
                  {ifBanner() && (
                    <Box onClick={handleClearImage} className={classes.closeIconStyle}>
                      <CloseOutlinedIcon sx={{ height: "15px", width: "15px" }} />
                    </Box>
                  )}
                </Box>
              </CommentWrapper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={10} lg={10}>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                paddingBottom: { xs: "20px", md: "50px" },
              }}>
              <CommentWrapper elementId='2' scrollRef={scrollToRef}>
                <Title state={state} setState={setState} />
              </CommentWrapper>
              <CommentWrapper elementId='3' scrollRef={scrollToRef}>
                <Description
                  title={state?.CommonFields?.title}
                  showMediaOption={showMediaOption}
                  setShowMediaOption={setShowMediaOption}
                  state={state}
                  setState={setState}
                  setCheckDesc={setCheckDesc}
                />
              </CommentWrapper>
            </Box>
          </Grid>
          {onHover && (
            <ImageOnHoverCard
              Url={content?.Url}
              onUploadClick={onUploadClick}
              imageCropHandle={imageCropHandle}
              setIsClickedPublish={setIsClickedPublish}
              setOnHover={setOnHover}
              publishedImages={state?.ObjectFields?.published_images}
            />
          )}
        </Grid>
      </Box>
      <CommentListPanel></CommentListPanel>
    </>
  );
};
