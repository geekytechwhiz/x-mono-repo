import { Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
// import CloudIcon from '../../../../../src/assets/CloudIcon.png';
import { SubmitButton, ThemeConstants, XTags } from "@platformx/utilities";
// import CommonImageRender from '../../../Gallery/CommonImageRender';
import { XImageRender } from "@platformx/x-image-render";
import { useStyles } from "./PublishModal.styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    height: "-webkit-fill-available",
    maxWidth: "none",
    width: "-webkit-fill-available",
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      margin: "0px",
      maxHeight: "calc(100vh - 0px)",
    },
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      margin: "20px",
      maxHeight: "calc(100vh - 40px)",
    },
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  onPublish: () => void;
  category: any;
  subCategory: any;
  onSave: () => void;
  workflow: object;
  createComment: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const {
    children,
    onClose,
    onPublish,
    category,
    subCategory,
    onSave,
    workflow,
    createComment,
    ...other
  } = props;
  const { t } = useTranslation();

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...other}>
      <Button
        onClick={onClose}
        variant='outlined'
        sx={{
          position: "absolute",
          left: 15,
        }}>
        {t("resend_text_left_button")}
      </Button>
      {children}
      <Box
        sx={{
          position: "absolute",
          right: 15,
        }}>
        <SubmitButton
          category={category}
          subCategory={subCategory}
          workflow={workflow}
          handlePublish={onPublish}
          handleSave={onSave}
          createComment={createComment}
        />
      </Box>
    </DialogTitle>
  );
};

export default function PublishModal({
  open,
  handleClose,
  content,
  tagData,
  selectedTag,
  handleTagOnChange,
  onPublish,
  onUploadClick,
  selectedImage,
  state,
  operationType,
  resetSelectedImage,
  updateImageField,
  isUploadArticle,
  count,
  imageCropHandle,
  category,
  subCategory,
  workflow,
  handleClickOpen,
  onSave,
  createComment,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{ margin: "0px" }}>
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
          onPublish={onPublish}
          category={category}
          subCategory={subCategory}
          workflow={workflow}
          onSave={onSave}
          createComment={createComment}>
          {t("submit_text")}
        </BootstrapDialogTitle>

        <DialogContent dividers className={classes.dialogContentStyle}>
          <Box className={classes.innerBoxContent}>
            <Typography variant='h5medium'>{t("better_engagement")}</Typography>
            <Box
              className={classes.publishImgUploadBox}
              sx={{
                width: { sm: "610px", xs: "100%" },
                height: { sm: "343px", xs: "187px" },
              }}>
              <XImageRender
                callBack={updateImageField}
                data={{
                  original_image: state?.ObjectFields?.original_image,
                  published_images: state?.ObjectFields?.published_images,
                }}
              />
            </Box>

            <Typography variant='h7medium'>{t("article_banner_note")}</Typography>
            <Box className={classes.dividerStyle}>
              <Divider />
            </Box>
            <Box className={classes.publishTagsWp}>
              <XTags
                tagData={tagData}
                isPublishModal={true}
                selectedTag={selectedTag}
                handleTagOnChange={handleTagOnChange}
              />
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}
