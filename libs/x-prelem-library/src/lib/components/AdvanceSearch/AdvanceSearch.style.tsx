import { makeStyles } from "@mui/styles";
// import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  // const theme = useTheme();
  return {
    advanceSearchWrapper: {
      "&.advanceSearch": {
        // background: theme.palette.prelemType2.BACKGROUND,
        "& .customAdvanceSearch": {
          background: "#EAEEF3",
          margin: 0,
          width: "100%",
          maxWidth: "100%",
          borderRadius: 0,
          position: "absolute",
          top: "0px",
          minHeight: "300px",
          "& .maxContainer": {
            maxWidth: "1100px",
            width: "1100px",
            margin: "0px auto",
          },
          "& .resultCards": {
            display: "flex",
            marginLeft: "12px",
            marginRight: "12px",
            boxShadow: "none",
            padding: "8px",
            overflow: "hidden",
            borderRadius: "8px",
            marginBottom: "20px",
            cusror: "pointer",
            "& .imgLeftSide": {
              float: "left",
              marginRight: "20px",
              width: "160px",
              height: "120px",
              padding: "0px",
              transition: "all .3s ease-in-out",
              overflow: "hidden",
              cursor: "pointer",
              "& .searchImg": {
                height: "100%",
                borderRadius: "4px",
              },
              "&:hover": {
                transform: `scale(1.1)`,
                transition: "all .3s ease-in-out",
              },
            },
            "& .descriptionRightSide": {
              float: "left",
              width: `calc(100% - 180px)`,
              padding: "0px",
            },
          },
          "& .searchResultSection": {
            maxHeight: "400px",
            overflow: "auto",
            "& .heading": {
              paddingLeft: "12px",
            },
          },
        },
      },
    },
  };
});

export default useCustomStyle;
