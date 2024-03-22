import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  return {
    VideoPlayerWrapper: {
      "&.reactPlayerWrapper": {
        "& .react-player__preview": {
          backgroundPosition: "top !important",
          "& .smallPlayIcon": {
            width: "44px",
            height: "44px",
          },
        },
      },
    },
  };
});
