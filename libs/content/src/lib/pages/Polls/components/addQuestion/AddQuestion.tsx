/* eslint-disable require-atomic-updates */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useComment } from "@platformx/authoring-apis";
import { CommentWrapper } from "@platformx/comment-review";
import AnswerContent from "./AnswerContent";
import { useCustomStyle } from "../../Poll.style";
import { AutoTextArea, CommonBoxWithNumber, TextBox, TitleSubTitle } from "@platformx/utilities";
import { XImageRender } from "@platformx/x-image-render";

const AddQuestion = ({
  qusUnsavedChanges,
  showGallery,
  state,
  setState,
  answers,
  setAnswers,
  addImage,
  setAddImage,
  setFieldChanges,
}) => {
  const { t } = useTranslation();
  const { scrollToRef } = useComment();

  const handleRefresh = () => {
    setState({
      ...state,
      queBackgroundImg: "",
      queBackgroundColor: "",
    });
  };

  const handleColorPallete = (color) => {
    qusUnsavedChanges.current = true;
    setState({
      ...state,
      queBackgroundImg: "",
      queBackgroundColor: color,
    });
  };

  const handleChange = () => {
    setFieldChanges(true);
    qusUnsavedChanges.current = true;
  };

  const handleOnBlur = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const updateField = (updatedPartialObj) => {
    const { original_image, published_images } = updatedPartialObj || {};
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...{
        question_original_image: original_image,
        question_published_images: published_images,
      },
    };
    setState(modifiedData);
  };

  const classes = useCustomStyle();
  return (
    <Box id='questions' className={classes.mainStyleWrapper}>
      <Box>
        <CommentWrapper elementId='3' scrollRef={scrollToRef}>
          <CommonBoxWithNumber
            number='03'
            title={t("poll_qus_header")}
            titleVarient='p3semibold'
            subTitleVarient='p4regular'
            subTitle={t("subhead")}>
            <Grid container>
              <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                <TitleSubTitle
                  title={`${t("title")}*`}
                  subTitle={t("poll_subtitle")}
                  titleVariant='h6medium'
                  subTitleVariant='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                <TextBox
                  name='poll_title'
                  placeHolder={t("qus_placeholder")}
                  handleChange={handleChange}
                  handleOnBlur={handleOnBlur}
                  maxCharLength={120}
                  state={state.poll_title}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                <TitleSubTitle
                  title={`${t("description")}*`}
                  subTitle={t("poll_short_subdes")}
                  titleVariant='h6medium'
                  subTitleVariant='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} className='textFiled'>
                <AutoTextArea
                  name='poll_description'
                  placeHolder={t("quiz_description_placeholder")}
                  handleChange={handleChange}
                  handleOnBlur={handleOnBlur}
                  maxCharLength={400}
                  state={state.poll_description}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
                <TitleSubTitle
                  title={t("quiz_addqus_image_title")}
                  subTitle={t("poll_bg_subtitle")}
                  titleVariant='h6medium'
                  subTitleVariant='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
                <XImageRender
                  callBack={updateField}
                  editData={{
                    original_image: state.question_original_image,
                    published_images: state.question_published_images,
                    isImg: state.queBackgroundColor ? false : true,
                    colorCode: state.queBackgroundColor,
                  }}
                  isColorPallete={true}
                  handleRefresh={handleRefresh}
                  handleColorPallete={handleColorPallete}
                />
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
        </CommentWrapper>
      </Box>
      <AnswerContent
        showGallery={showGallery}
        answers={answers}
        setAnswers={setAnswers}
        addImage={addImage}
        setAddImage={setAddImage}
        qusUnsavedChanges={qusUnsavedChanges}
      />
    </Box>
  );
};
export default AddQuestion;
