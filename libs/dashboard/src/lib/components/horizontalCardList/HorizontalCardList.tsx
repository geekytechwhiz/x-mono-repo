import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SliderSetting } from "@platformx/utilities";
import "slick-carousel/slick/slick.css";
import HorizontalCard from "../horizontalCard/HorizontalCard";
import { boostContentWithIconMapper } from "./helper";
import { useCustomStyle } from "./HorizontalCardList.style";

const HorizontalCardList = ({ boostContent }: any) => {
  const boostContentWithIcons = boostContentWithIconMapper(boostContent);
  const classes = useCustomStyle();
  return (
    <Slider {...SliderSetting} className={`${classes.horizontalCardSlider} SliderWraper`}>
      {boostContentWithIcons.map(
        (item, index) =>
          item.url !== "" && (
            <HorizontalCard
              key={`${item.title} ${index.toString()}`}
              Title={item.title}
              Description={item.description}
              url={item.url}
              icon={item.icon}
            />
          ),
      )}
    </Slider>
  );
};

export default HorizontalCardList;
