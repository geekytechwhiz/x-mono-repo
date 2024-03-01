import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ProfileListingWrapper: {
      "&.ProfileListingBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .topContent": {
          padding: "0 12px",
          "& h2": {
            paddingBottom: "12px",
            borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
          },
        },
        "& .CardBoxWp": {
          height: "437px",
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          borderRadius: theme.borderRadius.value,
        },
        "& .overlay-wrapper": {
          position: "relative",
          height: "100%",
          width: "100%",
          borderRadius: theme.borderRadius.value,
          background: theme.palette.prelemType1.CARDS.ECOM_MASK_BACKGROUND,
          "& .cardContentBox": {
            boxShadow: "none",
            borderRadius: theme.borderRadius.value,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            cursor: "pointer",
            "& .onelineTitle": {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1",
              overflow: "hidden",
              margin: 0,
            },
            "& .imgBox": {
              height: "100%",
              position: "absolute",
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              overflow: "hidden",
              margin: "auto",
              borderRadius: theme.borderRadius.value,
              "& img": {
                height: "100%",
                width: "100%",
                objectFit: "cover",
              },
              "& .imgboxOverlay": {
                position: "absolute",
                background: `rgba(${theme.palette.overlay["cardOverlay"]})`,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
              },
            },
            "& .bgImgPt": {
              position: "absolute",
              left: "0",
              top: "0",
              width: "100%",
              height: "100%",
              "& img": {
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: theme.borderRadius.value,
              },
            },
            "& .childCard": {
              position: "absolute",
              left: "0",
              bottom: "0",
              padding: "50px 20px 20px 20px",
              width: "100%",
              background: "linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 79%)",
              borderRadius: `0 0 ${theme.borderRadius.value} ${theme.borderRadius.value}`,
              "& .categoryName": {
                borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
                display: "inline-block",
                width: "auto",
                marginBottom: "15px",
              },
              "& .cardTitle": {
                color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
              },
              "& .bottomContent": {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                "& .numberWp": {
                  paddingRight: "10px",
                  marginRight: "10px",
                  borderRight: `1px solid ${theme.palette.prelemType1.LINE}`,
                },
                "& .nameWp": { textTransform: "uppercase" },
              },
            },
          },
        },
        "& .noDataFoundWrapper": {
          display: "flex",
          justifyContent: "center",
          width: "100%",
          [theme.breakpoints.up("xs")]: {
            height: "185px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "100%",
          },
        },
        "& .noDataFound": {
          margin: "0 auto 20px",
          textAlign: "center",
          [theme.breakpoints.up("xs")]: {
            width: "100%",
          },
          [theme.breakpoints.up("lg")]: {
            width: "80%%",
          },
        },
        "& .card2Content": {
          width: "100%",
          borderRadius: theme.borderRadius.value,
          background: "linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)",
          [theme.breakpoints.up("xs")]: {
            padding: "20px 19px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "20px 80px 20px 19px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "20px 150px 20px 19px",
          },
          position: "absolute",
          bottom: 0,
          left: 0,
        },
        "& .card2ContentInnerWrapper": {
          height: "40px",
          display: "inline-flex",
          alignItems: "flex-end",
        },
        "& .card2bottomButtonBox": {
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        },
        "& .add-content-overlay": {
          background: "rgba(55,79,213,0.9)",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        },
        "& .autorenewIcon": {
          fill: theme.palette.autoRenewIcon,
          [theme.breakpoints.up("xs")]: {
            width: "50px",
            height: "50px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
        "& .title button": {
          height: "100%",
        },
        "& .expertise-show-case button": {
          padding: 0,
        },
      },
    },
  };
});
