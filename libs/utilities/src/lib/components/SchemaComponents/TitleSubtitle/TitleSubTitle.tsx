import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { XTypography } from "../XTypography/XTypography";

const TitleSubTitle = ({
  title = "",
  subTitle = "",
  titleVariant,
  subTitleVariant,
  titleColor = "",
  subTitleColor = "#89909a",
  // eslint-disable-next-line react/jsx-no-useless-fragment
  toolTipIcon = <></>,
  toolTipText = "",
}) => {
  return (
    <Box>
      {title && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <XTypography variant={titleVariant} label={title} />
          <Tooltip title={toolTipText} placement='top'>
            {toolTipIcon}
          </Tooltip>
        </Box>
      )}
      {subTitle && (
        <Box>
          <XTypography variant={subTitleVariant} label={subTitle} />
        </Box>
      )}
    </Box>
  );
};
export default TitleSubTitle;
