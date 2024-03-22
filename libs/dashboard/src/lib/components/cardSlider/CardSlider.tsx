import { capitalizeWords } from "@platformx/utilities";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "./Card";
import { useCustomStyle } from "./cart.style";
import { SETTINGS } from "./utils/constants";
import { getBgColorArray } from "./utils/helper";

const CardSlider = ({ createContent }: any) => {
  const colorList = getBgColorArray(createContent.length) || "";
  const classes = useCustomStyle();
  return (
    <Slider {...SETTINGS} className={`${classes.dashboardCardSlider} CardSliderDashboard`}>
      {createContent.map(
        (item: any, index: number) =>
          item.url !== "" && (
            <Card
              key={index}
              ImageUrl={item.image_1.ImageCropUrl?.CropUrl.Web}
              BgColor={colorList[index]}
              CTAText={capitalizeWords(item.title)}
              url={item.url}
            />
          ),
      )}
    </Slider>
  );
};

export default CardSlider;
