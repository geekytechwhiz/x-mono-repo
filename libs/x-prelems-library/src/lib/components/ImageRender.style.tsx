import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();

  return {
    ImageRenderPrelemWrapper: {
      "&.imageRenderAnimation": {
        width: "100%",
        height: "100%",
        "& img": {
          opacity: 0,
          animation: `fadeInAnimation ${theme?.palette?.prelemAnimation?.IMAGE?.FADEINTIME}s ease-in forwards`,
        },
      },
    },
  };
});
