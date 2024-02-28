import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    BottomLinksWrapper: {
      "&.BottomLinksBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        borderTop: `1px solid ${theme.palette.prelemType3.LINE}`,
        padding: "20px 0",
        "& .mainBoxWp": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& .colBox": {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              opacity: "0.6",
            },
            "& .arrowIcon": {
              minWidth: "44px",
              minHeight: "44px",
              background: theme.palette.prelemType2.BACKGROUND,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              maxWidth: "44px",
              maxHeight: "44px",
              "& svg": {
                fontSize: "32px",
                color: "#fff",
              },
              "&.leftBut": {
                marginRight: "15px",
              },
              "&.rightBut": {
                marginLeft: "15px",
              },
            },
          },
        },
      },
    },
  };
});
