import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    StatsWrapper: {
      "&.StatsBg": {
        padding: "60px 0 0 0",
        "& .TopWarp": {
          background: theme.palette.prelemType1.BACKGROUND,
          padding: "45px 0",
          "& .contentBoxRow": {
            background: theme.palette.prelemType3.BACKGROUND,
            "&:nth-child(even)": {
              background: theme.palette.prelemType1.BACKGROUND,
            },
            "& .textBox": {
              display: "flex",
              alignItems: "center",
              "& p:first-child": {
                marginRight: "20px",
              },
            },
          },
        },
        "& .secondWrapper": {
          background: theme.palette.prelemType1.BACKGROUND,
          padding: "45px 0",
          textAlign: "center",
          "& .contentBox": {
            margin: "15px 0",
            display: "flex",
            flexDirection: "column",
            "& .ImgBox": {
              width: "120px",
              height: "120px",
              margin: "auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& h3": {
              marginBottom: 0,
            },
            "& h6": {
              margin: 0,
            },
          },
        },
        "& .PreviousSeasons": {
          padding: "45px 0",
          "& .BottomTableWp": {
            marginTop: "20px",
            "& .TopBoxRow": {
              background: theme.palette.prelemType3.BACKGROUND,
            },
            "& .BoxRow": {
              background: theme.palette.prelemType3.BACKGROUND,
              margin: "10px 0",
              padding: "10px",
              "&:nth-child(even)": {
                background: theme.palette.prelemType1.BACKGROUND,
              },
              "& .firstColBox": {
                display: "flex",
                alignItems: "center",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                },
                "& .imgBoxWp": {
                  width: "70px",
                  height: "70px",
                  marginRight: "20px",
                  justifyContent: "center",
                  display: "flex",
                  [theme.breakpoints.down("md")]: {
                    display: "block",
                  },
                  "& img": {
                    [theme.breakpoints.down("md")]: {
                      height: "100%",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
});
