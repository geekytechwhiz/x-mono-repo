import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ImageRenderPrelemWrapper: {
      "&.imageRenderAnimation": {
        "& img": {
          opacity: 0,
          animation: `$fadeInAnimation ${theme?.palette?.prelemAnimation?.IMAGE?.FADEINTIME}s ease-in forwards`,
        },
      },
    },
    "@keyframes fadeInAnimation": {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  };
});
