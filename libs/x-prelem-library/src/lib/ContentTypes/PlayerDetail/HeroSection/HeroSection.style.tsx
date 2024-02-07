import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    HeroSectionWrapper: {
      "&.HeroSectionBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .heroSectionWp": {
          position: "relative",
          "& .herocontent": {
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(to right,  rgba(0,0,0,0.7) 70%, ${theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND} 70%)`,
            minHeight: "648px",
            [theme.breakpoints.down("em")]: {
              textAlign: "center",
              background: `linear-gradient(to bottom,  rgba(0,0,0,0.8) 90%,${theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND} 90%)`,
            },
            "& .middlecontainer": {
              paddingTop: "26px",
              alignItems: "center",
              [theme.breakpoints.down("em")]: {
                display: "flex",
                flexDirection: "column-reverse",
                "& button": {
                  whiteSpace: "nowrap",
                },
              },
              "& .profileImgWpMain": {
                position: "relative",
                "& .countryTopLeft ": {
                  position: "absolute",
                  top: "30%",
                  left: "0",
                  border: `1px solid ${theme.palette.prelemType1.LINE}`,
                  background: "rgba(0, 0, 0, 0.40)",
                  display: "flex",
                  padding: "0 14px",
                  alignItems: "center",
                  minWidth: "180px",
                  textAlign: "left",
                  zIndex: 2,
                  [theme.breakpoints.down("em")]: {
                    display: "none",
                  },
                  "& .globeIcon ": {
                    minWidth: "35px",
                    minHeight: "35px",
                    maxWidth: "35px",
                    maxHeight: "35px",
                    background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_BACKGROUND,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    marginRight: "12px",
                  },
                  "& .rightText": {
                    width: "100%",
                    "& p": {
                      margin: 0,
                      lineHeight: "20px",
                    },
                    "& h4": {
                      margin: 0,
                      lineHeight: "20px",
                    },
                  },
                },
                "& .matchRightBottom ": {
                  position: "absolute",
                  bottom: "17%",
                  right: "0",
                  border: `1px solid ${theme.palette.prelemType1.LINE}`,
                  background: "rgba(0, 0, 0, 0.40)",
                  display: "flex",
                  padding: "0 14px",
                  alignItems: "center",
                  minWidth: "180px",
                  textAlign: "left",
                  zIndex: 2,
                  [theme.breakpoints.down("em")]: {
                    display: "none",
                  },
                  "& .playerIcon ": {
                    minWidth: "35px",
                    minHeight: "35px",
                    maxWidth: "35px",
                    maxHeight: "35px",
                    background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    marginRight: "12px",
                  },
                  "& .rightText": {
                    width: "100%",
                    "& p": {
                      margin: 0,
                      lineHeight: "20px",
                    },
                    "& h4": {
                      margin: 0,
                      lineHeight: "20px",
                    },
                  },
                },
                "& .TnoBig": {
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "-15%",
                  bottom: "0",
                  margin: "auto",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  "& h1": {
                    fontSize: "35rem",
                    lineHeight: "normal",
                    opacity: 0.3,
                    textAlign: "right",
                    [theme.breakpoints.down("em")]: {
                      fontSize: "15rem",
                      textAlign: "center",
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: "15rem",
                    },
                  },
                },
                "& .midImg": {
                  maxHeight: "622px",
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 1,
                  "& picture": {
                    "& img": {
                      height: "auto !important",
                    },
                  },
                },
              },

              "& .Rightdetailswp": {
                display: "flex",
                marginTop: "26px",
                marginBottom: "22px",
                [theme.breakpoints.down("em")]: {
                  maxWidth: "100%",
                  width: "100%",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                },
                "& .boxText": {
                  marginRight: "30px",
                  paddingRight: "15px",
                  maxWidth: "100px",
                  overflow: "hidden",
                  borderRight: `1px solid ${theme.palette.prelemType1.LINE}`,
                  "& p": {
                    margin: 0,
                    textTransform: "uppercase",
                  },
                  "& h1": {
                    margin: 0,
                  },
                  "&:last-child": {
                    marginRight: "0px",
                    paddingRight: "0px",
                    borderRight: 0,
                  },
                },
              },
              "& .socialLinks": {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: "45px",
                [theme.breakpoints.down("em")]: {
                  marginBottom: "30px",
                  justifyContent: "center",
                },
                "& h6": {
                  margin: 0,
                  width: "auto",
                  marginRight: "35px",
                },
                "& .icons": {
                  color: theme.palette.prelemType1.TITLE,
                  display: "flex",
                  "& svg": {
                    fontSize: "18px",
                    marginRight: "20px",
                    cursor: "pointer",
                  },
                },
              },
              "& .fullNameWp ": {
                display: "inline-flex",
                flexDirection: "column",
                textTransform: "uppercase",
                marginBottom: "6px",
                [theme.breakpoints.down("em")]: {
                  width: "100%",
                  marginTop: "0px",
                },
                "& .FirstNameWp": {
                  display: "inline-block",
                  "& .innerText": {
                    display: "inline-block",
                    [theme.breakpoints.down("em")]: {
                      width: "100%",
                    },
                    "& h1": {
                      margin: 0,
                      background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND,
                      padding: "10px 18px",
                      color: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE,
                    },
                  },
                },
                "& .LastNameWp": {
                  display: "inline-block",
                  "& .innerText": {
                    display: "inline-block",
                    [theme.breakpoints.down("em")]: {
                      width: "100%",
                    },
                    "& h1": {
                      margin: 0,
                      background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_BACKGROUND,
                      padding: "10px 18px",
                    },
                  },
                },
              },
            },
          },
          "& .imageWrapper": {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .buttonIcon": {
            position: "absolute",
            left: "0",
            top: "0",
            bottom: "0",
            right: "0",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            margin: "auto",
            "&.preBtn": {
              left: "15px",
              right: "auto",
            },
            "&.nextBtn": {
              left: "auto",
              right: "15px",
            },
            "&:hover": {
              "& .overHover": {
                opacity: 1,
                transition: "all 0.5s",
                visibility: "visible",
              },
            },
            "& .overHover": {
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "0",
              opacity: 0,
              transition: "all 0.5s",
              visibility: "hidden",
              "& .hovicon": {
                display: "inline-block",
                minWidth: "44px",
                minHeight: "44px",
              },
              "& h5": {
                padding: "1px 10px",
                cssFloat: "left",
                margin: 0,
              },
            },
          },
        },
      },
    },
  };
});
