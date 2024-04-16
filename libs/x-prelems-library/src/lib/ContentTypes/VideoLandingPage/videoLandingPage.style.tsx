import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    videoLandingPageWrapper: {
      "&.videoLandingPage": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .react-player__preview": {
          opacity: 0,
          animation: `fadeInAnimation ${theme?.palette?.prelemAnimation?.IMAGE?.FADEINTIME}s ease-in forwards`,
        },
        "& .noMarginTop": {
          marginTop: 0,
        },
        "& .noMarginBottom": {
          marginBottom: 0,
        },
        "& .noMarginBoth": {
          marginBottom: 0,
          marginTop: 0,
        },
        "& .counter": {
          width: "auto",
          fontWeight: "bold",
          margintop: 0,
        },
        "& .gradient": {
          background: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)`,
          "& img": {
            opacity: 0,
            animation: `fadeInAnimation ${theme?.palette?.prelemAnimation?.IMAGE?.FADEINTIME}s ease-in forwards`,
          },
        },
        "& .videoPageCard": {
          background: theme.palette.prelemType1.BACKGROUND,
          "& .publishTime": {
            color: theme.palette.prelemType1.TITLE,
          },
        },
      },
    },
  };
});
