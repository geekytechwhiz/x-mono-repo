import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    imageCardsWrapper: {
      "&.imageCardsWrapperBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .imageContentWrapper": {
          "& .imageWrapper": {
            height: "460px",
            [theme.breakpoints.down("lg")]: {
              height: "430px",
            },
            [theme.breakpoints.down("em")]: {
              height: "350px",
            },
            [theme.breakpoints.down("md")]: {
              height: "285px",
            },
            [theme.breakpoints.down("sm")]: {
              height: "220px",
            },
            [theme.breakpoints.down("xs")]: {
              height: "280px",
            },
            "& img": {
              objectFit: "cover",
              width: "100%",
              borderRadius: theme.borderRadius.value,
            },
          },
          "& p": {
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
            },
          },
        },
      },
    },
  };
});
