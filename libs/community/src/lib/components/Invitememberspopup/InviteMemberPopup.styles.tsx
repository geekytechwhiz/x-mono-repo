import { makeStyles } from "@material-ui/core";
import { ThemeConstants } from "@platformx/utilities";

export const useStyles = makeStyles(() => {
  return {
    container: {
      "&.main-container": {
        "& .popup-header": {
          padding: "15px",
          borderBottom: "1px solid #d9dbe9",
          "& .header-title": {
            margin: "auto 0",
          },
          "& .search-box": {
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              padding: "10px 0",
            },
            [`@media(min-width:${ThemeConstants.SM}px)`]: {
              padding: "0px",
            },
            "& .cross-icon": {
              cursor: "pointer",
              position: "absolute",
              right: "18px",
            },
          },
          "& .cancle-invite-button-group": {
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: "0px",
            },
            [`@media(min-width:${ThemeConstants.SM}px)`]: {
              marginTop: "10px",
            },
            [`@media(min-width:${ThemeConstants.EM}px)`]: {
              marginTop: "0px",
            },
            flexDirection: "column",
            alignItems: "flex-end",
            "& .done-button": {
              marginLeft: "12px",
            },
            "& .done-button-padding-14px": {
              padding: "14px",
            },
            "& .done-button-padding-11px": {
              padding: "11px",
            },
          },
        },
        "& .selected-count": {
          padding: "15px",
          borderBottom: "1px solid #d9dbe9",
          "& .selected-count-item": {
            margin: "auto 0",
          },
        },
        "& .members-list": {
          [`@media(max-width:${ThemeConstants.MD}px)`]: {
            padding: "10px",
          },
          [`@media(min-width:${ThemeConstants.MD}px)`]: {
            padding: "20px 20px 0 20px",
          },
          overflowY: "scroll",
        },
      },
    },
  };
});
