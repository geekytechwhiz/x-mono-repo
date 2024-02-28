import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ProfileWrapper: {
      "&.ProfileBg": {
        // background: theme.palette.prelemType1.BACKGROUND,
        "& .leftContent": {
          width: "100%",
          textAlign: "left",
          borderTop: `1px solid ${theme.palette.prelemType3.LINE}`,
          marginTop: "38px",
          "& .tabboxWp": {
            padding: "28px",
            background: `linear-gradient(315deg,transparent 25px, ${theme.palette.prelemType3.BACKGROUND} 25px,${theme.palette.prelemType3.BACKGROUND})`,
            "& .tableWp": {
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              "&:last-child": {
                borderBottom: 0,
                paddingBottom: 0,
                marginBottom: 0,
              },
              "& .leftTextBox": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: "25px",
                width: "30px",
                height: "30px",
                color: theme.palette.prelemType1.TITLE,
              },
              "& .rightContentBox ": {
                width: "100%",
                "& p": {
                  margin: 0,
                },
                "& h4": {
                  margin: 0,
                },
              },
            },
          },
          "& .rightDecWp": {
            paddingLeft: "45px",
            [theme.breakpoints.down("em")]: {
              paddingLeft: "0px",
              marginTop: "25px",
            },
            "& p": {
              margin: 0,
            },
          },
          "& .bootLink": {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "pointer",
            float: "right",
          },
        },
        "& .rightBox": {
          display: "flex",
          [theme.breakpoints.down("md")]: {
            display: "inline-block",
            width: "100%",
          },
          "& .boxWp": {
            marginRight: "44px",
            [theme.breakpoints.down("md")]: {
              marginRight: "0px",
              width: "100%",
              marginBottom: "25px",
            },
            "& .botBox": {
              width: "100%",
              padding: "10px",
              textAlign: "center",
              minHeight: "177px",
              minWidth: "290px",
              maxWidth: "290px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
              "&:after": {
                position: "absolute",
                content: `""`,
                width: "0px",
                height: "0px",
                borderStyle: "solid",
                borderWidth: "0 0 30px 30px",
                borderColor: ` transparent transparent ${theme.palette.prelemType1.BACKGROUND} transparent`,
                transform: "rotate(0deg)",
                right: 0,
                bottom: 0,
              },
              [theme.breakpoints.down("md")]: {
                minHeight: "auto",
                minWidth: "100%",
                maxWidth: "100%",
              },
              "& .imgWp": {
                width: "86px",
                height: "86px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& p": {
                margin: 0,
              },
              "&.bgbox1": {
                background: "radial-gradient(192.31% 192.31% at 50% -68.6%, #F00 0%, #000 99.14%)",
              },
              "&.bgbox2": {
                background: "linear-gradient(180deg, #E9E9E9 -187.93%, #000 121.03%)",
              },
            },
          },
        },
      },
    },
  };
});
