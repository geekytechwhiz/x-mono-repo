import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ThemeConstants } from "@platformx/utilities";
import CommunityMenu from "./CommunityMenu";
import useContentGlleryStyle from "./ContentTypeCard/DamContentGllery.style";
import "./DamContentLeftSidebar.css";

type damCotentLeftSidebarProps = {
  toggleDrawer?: any;
  loading?: boolean;
  menuData: any;
  setUuid: Dispatch<SetStateAction<string>>;
  assetType: string;
};

const DamContentLeftSidebar = (_props: any) => {
  const { toggleDrawer = () => {}, loading, menuData, setUuid, assetType } = _props;

  const classes = useContentGlleryStyle();

  return (
    <>
      <Box
        className='damcontent-leftsidebar'
        sx={{
          padding: { xs: "0 0 0 16px", em: "16px 32px" },
        }}>
        <Box
          sx={{
            padding: { em: "10px 15px 10px 0px", xs: "16px" },
            display: "flex",
            justifyContent: "space-between",
            borderBottom: { xs: `solid 1px ${ThemeConstants.DIVIDER_COLOR}`, em: "none" },
          }}>
          <Typography
            variant='h5semibold'
            sx={{
              fontSize: ThemeConstants.FONTSIZE_H5,
              fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
              fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
              textTransform: "uppercase",
            }}>
            <ArrowBackIosIcon
              className='back-to-page'
              onClick={() => toggleDrawer()}
              sx={{ display: { sm: "block", em: "none", fontSize: ThemeConstants.FONTSIZE_H4 } }}
            />
          </Typography>
        </Box>
        {loading ? (
          <Box
            className='leftsidebar-loader'
            sx={{
              padding: { em: "16px 32px" },
              height: "100%",
            }}>
            {Array.from(Array(7)).map((element, i) => (
              <Box key={i} className='skeleton skeleton-cat'></Box>
            ))}
          </Box>
        ) : (
          <Box className={classes.leftsidebarbox}>
            <CommunityMenu
              communities={menuData.collectionItem}
              setUuid={setUuid}
              assetType={assetType}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default DamContentLeftSidebar;
