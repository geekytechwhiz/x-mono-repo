import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Box, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import {
  GreenFolderIcon,
  GreenSubFolderIcon,
  FolderIcon,
  SubFolderIcon,
  ThemeConstants,
  AUTH_INFO,
} from "@platformx/utilities";
import useContentGlleryStyle from "./contentTypeCard/DamContentGllery.style";

interface Community {
  uuid: string;
  name: string;
  type: string;
  handle: string;
  subcommunities?: {
    subcommunities?: Community[];
    page: {
      number: number;
      size: number;
      totalPages: number;
      totalElements: number;
    };
  };
}

interface CommunityMenuProps {
  communities: Community[];
  setUuid: Dispatch<SetStateAction<string | undefined>>;
  assetType: string;
}

const CommunityMenu: React.FC<CommunityMenuProps> = ({ communities, setUuid, assetType }) => {
  const [open, setOpen] = React.useState<string[]>(["all"]);
  const [selected, setSelected] = React.useState<string | null>(null);
  const classes = useContentGlleryStyle();
  const { t } = useTranslation();

  const handleClick = (uuid: string) => {
    setOpen((prevOpen) =>
      prevOpen.includes(uuid) ? prevOpen.filter((id) => id !== uuid) : [...prevOpen, uuid],
    );

    setSelected(uuid);
    setUuid(uuid);
  };

  const isItemSelected = (uuid: string) => selected === uuid;

  const renderSubcommunities = (subcommunities?: Community[]) => {
    if (!subcommunities || subcommunities.length === 0) return null;

    return subcommunities.map((subcommunity) => (
      <TreeItem
        key={subcommunity.uuid}
        nodeId={subcommunity.uuid}
        label={
          <Box className={classes.communitybox}>
            <img
              className='img'
              src={isItemSelected(subcommunity.uuid) ? GreenSubFolderIcon : SubFolderIcon}
              alt='ExpandmoreIcon'
              style={{
                marginRight: "8px",
                color: isItemSelected(subcommunity.uuid) ? "#4B9EF9" : "inherit",
              }}
            />
            <span className={classes.communspan}>
              <Typography
                className='parent-title'
                variant='h6regular'
                color={isItemSelected(subcommunity.uuid) ? "#4B9EF9" : "inherit"}
                onClick={() => handleClick(subcommunity.uuid)}>
                {subcommunity.name}
              </Typography>
            </span>
          </Box>
        }
        className={classes.communitytypo}
      />
    ));
  };

  const treeItemStyles = {
    "& .MuiTreeItem-iconContainer": {
      marginLeft: "auto",
    },
    "& .MuiTreeItem-content": {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <Box
      className='left-sidebar-tree'
      sx={{
        padding: { xs: "16px", em: "0px" },
        paddingTop: { xs: "6px", em: "0px" },
      }}>
      <TreeView
        defaultCollapseIcon={
          <ExpandMoreIcon className={`${classes.expandicon} ${classes.communityMenu}`} />
        }
        defaultExpandIcon={<ChevronRightIcon className={classes.expandicon} />}
        className='all-categories'
        sx={{
          "& .Platform-x-Checkbox-root": {
            paddingLeft: "0px",
            paddingRight: "0px",
            color: ThemeConstants.LIGHT_GRAY_VARIENT1,
          },
          "& .Platform-x-Checkbox-colorPrimary svg": {
            fontSize: ThemeConstants.FONTSIZE_MD,
          },
        }}
        expanded={open}
        onNodeToggle={(event, nodes) => {
          setOpen(nodes);
        }}>
        <TreeItem
          nodeId='all'
          label={
            <Box className={classes.boxdam}>
              <img
                className='img'
                src={open.includes("all") ? GreenFolderIcon : FolderIcon}
                alt='DescriptionsubIcon'
                style={{
                  marginRight: "8px",
                  color: open.includes("all") ? "#4B9EF9" : "inherit",
                }}
              />
              <span className={classes.imagespan}>
                <Typography
                  className='parent-title'
                  variant='h5medium'
                  color={open.includes("all") ? "#4B9EF9" : "inherit"}
                  onClick={() =>
                    handleClick(
                      assetType === "Image"
                        ? AUTH_INFO.dspaceImagesUuid || ""
                        : AUTH_INFO.dspaceVideosUuid || "",
                    )
                  }>
                  {assetType === "Image" ? t("image") : t("video")}
                </Typography>
              </span>
            </Box>
          }
          sx={{ ...treeItemStyles, marginTop: "14px" }}>
          {communities.map((community) => (
            <TreeItem
              key={community.uuid}
              nodeId={community.uuid}
              label={
                <Box className={classes.boxdam}>
                  <img
                    className='img'
                    src={isItemSelected(community.uuid) ? GreenSubFolderIcon : SubFolderIcon}
                    alt='ExpandmoreIcon'
                    style={{
                      marginRight: "8px",
                      color: isItemSelected(community.uuid) ? "#4B9EF9" : "inherit",
                    }}
                  />
                  <span className={classes.imagespan}>
                    <Typography
                      className='parent-title'
                      variant='h6regular'
                      color={isItemSelected(community.uuid) ? "#4B9EF9" : "inherit"}
                      onClick={() => handleClick(community.uuid)}>
                      {community?.name}
                    </Typography>
                  </span>
                </Box>
              }
              sx={{ ...treeItemStyles, marginBottom: "14px" }}>
              {renderSubcommunities(community.subcommunities?.subcommunities)}
            </TreeItem>
          ))}
        </TreeItem>
      </TreeView>
    </Box>
  );
};

export default CommunityMenu;
