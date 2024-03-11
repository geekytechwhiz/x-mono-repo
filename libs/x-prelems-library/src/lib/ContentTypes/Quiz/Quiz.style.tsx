import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    quizWrapper: {
      "&.quizWrapperBg": {
        "& .scrollright": {
          overflow: "hidden",
          paddingRight: "5px",
          "& .outerWrapper::-webkit-scrollbar": {
            width: "4px",
          },
          "& .outerWrapper::-webkit-scrollbar-track": {
            background: "rgb(177, 177, 177)",
            borderRadius: theme.borderRadius.value,
          },
          "& .outerWrapper::-webkit-scrollbar-thumb": {
            background: theme.palette.textColor,
            borderRadius: theme.borderRadius.value,
          },
          "& .outerWrapper": {
            width: "calc(100% + 15px)",
            height: "100%",
            overflowY: "auto",
            paddingRight: "20px",
          },
        },
      },
    },
  };
});
