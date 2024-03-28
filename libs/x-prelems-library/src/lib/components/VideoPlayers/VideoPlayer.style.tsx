import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    VideoPlayerWrapper: {
      "&.reactPlayerWrapper": {
        "& .react-player__preview": {
          backgroundPosition: "top !important",
          opacity: 0,
          animation: `fadeInAnimation ${theme?.palette?.prelemAnimation?.IMAGE?.FADEINTIME}s ease-in forwards`,
          "& .smallPlayIcon": {
            width: "44px",
            height: "44px",
          },
        },
      },
    },
  };
});
