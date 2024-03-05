import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AutoTextArea, CommonBoxWithNumber, TextBox, TitleSubTitle } from "@platformx/utilities";
import { useComment } from "@platformx/authoring-apis";
import { CommentWrapper } from "@platformx/comment-review";

import { useCustomStyle } from "../Poll.style";

export const TitleDescription = ({
  state,
  setState,
  unsavedChanges,
  pollRef,
  isDraft,
  setFieldChanges,
}) => {
  const { t } = useTranslation();
  const { scrollToRef } = useComment();
  const handleChange = () => {
    setFieldChanges(true);
    unsavedChanges.current = true;
  };
  const handleOnBlur = (event) => {
    const key = `${event.target.name}SocialShare`;
    setState({
      ...state,
      [event.target.name]: event.target.value,
      [key]: isDraft ? event.target.value : state[key],
    });
    pollRef.current = {
      ...pollRef.current,
      [event.target.name]: event.target.value,
      [key]: isDraft ? event.target.value : state[key],
    };

    unsavedChanges.current = true;
  };
  const classes = useCustomStyle();
  return (
    <Box id='titleDescription' className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='1' scrollRef={scrollToRef}>
        <CommonBoxWithNumber
          number='01'
          title={t("title_head")}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t("subhead")}>
          <Grid container>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={`${t("title")}*`}
                subTitle={t("poll_subtitle")}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox
                name='title'
                placeHolder={t("quiz_title_placeholder")}
                handleChange={handleChange}
                maxCharLength={120}
                state={state.title}
                handleOnBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={t("short_title")}
                subTitle={t("quiz_subtitle")}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox
                name='short_title'
                placeHolder={t("quiz_short_placeholder")}
                handleChange={handleChange}
                maxCharLength={60}
                state={state.short_title}
                handleOnBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={5} className='leftFiled'>
              <TitleSubTitle
                title={t("short_description")}
                subTitle={t("poll_short_subdes")}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiled'>
              <AutoTextArea
                name='short_description'
                placeHolder={t("quiz_description_placeholder")}
                handleChange={handleChange}
                maxCharLength={400}
                state={state.short_description}
                handleOnBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={`${t("description")}*`}
                subTitle={t("poll_short_subdes")}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
              <AutoTextArea
                name='description'
                placeHolder={t("quiz_description_placeholder")}
                handleChange={handleChange}
                maxCharLength={400}
                state={state.description}
                handleOnBlur={handleOnBlur}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};
