import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { ThemeConstants } from "@platformx/utilities";
import * as React from "react";
import { useTranslation } from "react-i18next";
import VerticalTabsArticle from "../VerticalTabsArticle/VerticalTabsArticle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .Platform-x-Paper-root": {
    height: "-webkit-fill-available",
    maxWidth: "none",
    width: "100%",

    maxHeight: "100%",
    margin: "0px",
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      margin: "0px",
    },
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      margin: "20px",
    },
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const { t } = useTranslation();

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: 600,
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

      <Button
        onClick={onClose}
        variant='contained'
        sx={{
          position: "absolute",
          right: 15,
        }}>
        {t("done")}
      </Button>
    </DialogTitle>
  );
};

export default function PublishSocialShare({
  open,
  handleClose,
  state,
  setState,
  socialOgTags,
  setSocialOgTags,
  showGallery,
  setOperationType,
  setShow,
  updateStructureDataArticle,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          Settings
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            justifyContent: "center",
            ".Platform-x-DialogContent-root": {
              padding: "50px",
            },
          }}>
          <Box sx={{ width: { md: "836px", xs: "100%" } }}>
            <VerticalTabsArticle
              state={state}
              setState={setState}
              socialOgTags={socialOgTags}
              setSocialOgTags={setSocialOgTags}
              showGallery={showGallery}
              setOperationType={setOperationType}
              setShow={setShow}
              updateStructureDataArticle={updateStructureDataArticle}
            />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}
