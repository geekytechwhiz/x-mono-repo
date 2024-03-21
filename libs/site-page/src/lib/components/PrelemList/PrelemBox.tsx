/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeConstants, createImageURL } from "@platformx/utilities";
import { useStyles } from "./PrelemList.styles";
import { useLazyQuery } from "@apollo/client";
import { CloseOutlined, InfoOutlined } from "@mui/icons-material";
import { Mapping } from "@platformx/x-prelems-library";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchPrelemContent,
  fetchPrelemValidation,
  addPrelemFunc,
  // runPageFetchContentQuery,
  // runPageFetchValidationQuery,
} from "@platformx/authoring-apis";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import PrelemLoader from "../PrelemSearch/PrelemLoader/PrelemLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@platformx/authoring-state";
// import { navigateToEditpage } from "../utils/helper";

//mapping dynamic instance
const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module[Mapping[item]],
    })),
  );
  return mappingDynamicInstance;
});

const PrelemBox = ({ item, key }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page } = useSelector((state: RootState) => state);
  const [showInfo, setShowInfo] = useState(false);
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const [handleImpression] = usePlatformAnalytics();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setShowInfo((prev) => !prev);
  };

  const onClickAddPrelem = () => {
    const addPrelemObj = {
      eventType: "Add Prelem",
      clickType: "Add Prelem Click on Search Page",
      PrelemId: item?.PrelemId,
      PrelemName: item?.PrelemName,
      Tags: item?.Tags,
    };
    handleImpression(addPrelemObj.eventType, addPrelemObj);
    addPrelemFunc(
      dispatch,
      item,
      runFetchContentQuery,
      runFetchValidationQuery,
      navigate,
      page?.insertPrelemAt,
    );
  };

  const PreviewThumbnailURL = createImageURL(item?.PreviewThumbnail, item?.Thumbnail?.Ext);
  return (
    <>
      {loading && <PrelemLoader />}
      <Box className={classes.prelemboxwp}>
        <img src={PreviewThumbnailURL} alt='green iguana' />
        <Box className={classes.iButton}>
          <IconButton onClick={handleClick} classes={classes.iconButton}>
            {!showInfo ? <InfoOutlined fontSize='small' /> : <CloseOutlined fontSize='small' />}
          </IconButton>
        </Box>

        <Box className={classes.overlay} sx={{ opacity: showInfo ? 1 : 0 }}>
          <Box className={classes.contentwp}>
            <Typography variant='p3bold'>{item?.PrelemName}</Typography>
            <Typography variant='p4regular' className={classes.linetrancate2line}>
              {" "}
              {item?.Description}
            </Typography>
            <Box className={classes.buttonswp}>
              <Button
                variant='outlined'
                sx={{
                  marginRight: "10px",
                  height: "40px",
                  borderColor: ThemeConstants.WHITE_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                  "&:hover": {
                    borderColor: ThemeConstants.WHITE_COLOR,
                    color: ThemeConstants.WHITE_COLOR,
                  },
                }}
                onClick={() => {
                  const pageDataObj = {
                    eventType: "Prelem Preview",
                    PrelemPreview: true,
                    PrelemPreviewId: item?.PrelemId,
                    PrelemPreviewName: item?.PrelemName,
                  };
                  handleImpression(pageDataObj.eventType, pageDataObj);
                  navigate("./preview", {
                    state: item,
                  });
                }}
                data-testid='preview-button'>
                Preview
              </Button>
              <Button variant='whitebutton' onClick={onClickAddPrelem} data-testid='add-button'>
                Add Prelem
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PrelemBox;
