import { Box } from "@mui/material";
import MarkFeaturedIcon from "../../assets/svg/StarFeatured.svg";
import StarFeaturedSelected from "../../assets/svg/StarFeaturedSelected.svg";
import XImage from "../XImage/XImage";
import { XToolTip } from "../XToolTip/XToolTip";
import { useStyles } from "./MarkFeatured.styles";
import ToolTipMessage from "./ToolTipMessage";

export default function MarkFeatured({ setIsFeatured, isFeatured }) {
  const classes = useStyles();
  return (
    <Box sx={{ padding: "0px 8px" }} onClick={() => setIsFeatured((prev) => !prev)}>
      {isFeatured ? (
        <Box className={classes.BoxImage} sx={{ border: "1px solid #4B9EF9" }}>
          <XImage src={StarFeaturedSelected} alt='' width={24} height={24} />
        </Box>
      ) : (
        <XToolTip
          component={
            <Box className={classes.BoxImage} sx={{ border: "1px solid #14142B" }}>
              <XImage src={MarkFeaturedIcon} alt='' width={24} height={24} />
            </Box>
          }
          Title={<ToolTipMessage />}
          position='bottom'
        />
      )}
    </Box>
  );
}
