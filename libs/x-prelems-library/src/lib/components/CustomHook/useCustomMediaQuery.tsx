import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useCustomMediaQuery = () => {
  const theme = useTheme();

  const mediaQueryValues = {
    less_than_320: useMediaQuery(theme.breakpoints.only("xs")),
    less_than_600: useMediaQuery(theme.breakpoints.only("sm")),
    less_than_768: useMediaQuery(theme.breakpoints.only("md")),
    less_than_1024: useMediaQuery(theme.breakpoints.only("em")),
    less_than_1280: useMediaQuery(theme.breakpoints.only("lg")),
    less_than_1440: useMediaQuery(theme.breakpoints.only("xl")),
  };

  return mediaQueryValues;
};

export default useCustomMediaQuery;
