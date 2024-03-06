import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { useComment } from "@platformx/authoring-apis";
import { CommonBoxWithNumber, TitleSubTitle, BasicSwitchText } from "@platformx/utilities";
import { useComment } from "@platformx/authoring-apis";
// import BasicSwitchText from "../Common/BasicSwitchText";
// import TitleSubTitle from "../Common/TitleSubTitle";
// import CommentWrapper from "../ContentRewiew/CommentWrapper";
import { CommentWrapper } from "@platformx/comment-review";
import { Options } from "./Options";
import { useCustomStyle } from "../../Poll.style";
// import CommonBoxWithNumber from "../../Common/CommonBoxWithNumber/CommonBoxWithNumber";

const AnswerContent = ({
  showGallery,
  answers,
  setAnswers,
  addImage,
  setAddImage,
  qusUnsavedChanges,
}) => {
  const { t } = useTranslation();
  const [isDisable] = useState<boolean>(false);
  const { scrollToRef } = useComment();
  const handleChange = (event) => {
    setAddImage(event.target.checked);
  };
  const classes = useCustomStyle();
  return (
    <Box className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='4' scrollRef={scrollToRef}>
        <CommonBoxWithNumber
          number='04'
          title={t("answer_content")}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t("subhead")}>
          <Box className='textFiled'>
            <BasicSwitchText
              state={addImage}
              isDisable={isDisable}
              handleChange={handleChange}
              title={t("anwer_title")}
              subtitle={t("anwer_subtitle")}
              keyName='addImage'
              child={t("add_image")}
            />
          </Box>
          <Grid container>
            <Grid item xs={12} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={t("answers")}
                subTitle={t("enter_answer")}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
                toolTipIcon={
                  <InfoOutlinedIcon sx={{ height: "18px", width: "18px", paddingLeft: "2px" }} />
                }
                toolTipText={t("answer_content_tp")}
              />
            </Grid>
            <Grid item xs={12} md={7} className='textFiledLast'>
              <Options
                addImage={addImage}
                showGallery={showGallery}
                answers={answers}
                setAnswers={setAnswers}
                qusUnsavedChanges={qusUnsavedChanges}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};
export default AnswerContent;
