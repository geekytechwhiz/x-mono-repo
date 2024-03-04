import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { TitleSubTitle, TextBox } from "@platformx/utilities";
import { t } from "i18next";
import { useStyles } from "./CookieSetting.style";
import CookieTextArea from "./CookieTextArea";

const CookieFormControl = ({
  name = "",
  type = "",
  maxLength = null,
  placeHolder = "",
  title = "",
  subTitle = "",
  titleVarient = "",
  subTitleVarient = "",
  value,
  handleChange,
  skeleton = "",
  skeletonTitle = "",
  isShowPreview = false,
  index = 0,
}) => {
  const classes = useStyles();

  const renderControl = (controlType) => {
    switch (controlType) {
      case "textbox":
        return (
          <TextBox
            name={name}
            maxCharLength={60}
            placeHolder={t(placeHolder)}
            state={value}
            handleChange={handleChange}
          />
        );
      case "textarea":
        return (
          <CookieTextArea
            name={name}
            placeHolder={t(placeHolder)}
            // maxCharLength={maxLength}
            state={value}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12} className={index > 0 ? classes.leftGridItem : ""}>
        <TitleSubTitle
          title={t(title)}
          subTitle={t(subTitle)}
          titleVariant={titleVarient}
          subTitleVariant={subTitleVarient}
          subTitleColor='#89909A'
          titleColor='#14142B'
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        // sx={{ marginTop: { sm: "40px", xs: "14px" } }}
        className={classes.rightGridItem}>
        {renderControl(type)}
      </Grid>
      {isShowPreview && skeleton && (
        <Box className={classes.previewContainer}>
          <Typography className={classes.informativeSkeletonTitle}>{t(skeletonTitle)}</Typography>
          {skeleton}
        </Box>
      )}
    </>
  );
};
export default React.memo(CookieFormControl);
