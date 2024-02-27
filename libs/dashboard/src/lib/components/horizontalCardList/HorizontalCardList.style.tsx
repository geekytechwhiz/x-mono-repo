import { makeStyles } from "@mui/styles";
import { LeftArrowIcon, RightArrowIcon } from "@platformx/utilities";

export const useCustomStyle = makeStyles(() => {
  return {
    horizontalCardSlider: {
      "&.SliderWraper": {
        margin: "0 -10px",
        "& .slick-track": {
          display: "flex",

          "& .slick-slide": {
            marginLeft: "10px",
            marginRight: "10px",
          },
        },
        "& .slick-arrow.slick-prev": {
          width: "44px",
          height: "44px",
          background: "rgba(45, 45, 57, 0.6)",
          zIndex: 9,
          display: "flex !important",
          alignItems: "center",
          justifyContent: "center",
          left: "10px",
          "&.slick-disabled": {
            visibility: "hidden",
          },
          "&:before": {
            content: `''`,
            textIndent: 0,
            width: "11px",
            height: "16px",
            filter: "brightness(0) invert(1)",
            opacity: 1,
            backgroundImage: `url(${LeftArrowIcon})`,
          },
        },
        "& .slick-arrow.slick-next": {
          width: "44px",
          height: "44px",
          background: "rgba(45, 45, 57, 0.6)",
          zIndex: 9,
          display: "flex !important",
          alignItems: "center",
          justifyContent: "center",
          right: "10px",
          "&.slick-disabled": {
            visibility: "hidden",
          },
          "&:before": {
            content: `''`,
            textIndent: 0,
            width: "11px",
            height: "16px",
            filter: "brightness(0) invert(1)",
            opacity: 1,
            backgroundImage: `url(${RightArrowIcon})`,
          },
        },
      },
    },
  };
});
