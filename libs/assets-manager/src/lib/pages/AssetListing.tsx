import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  AssetnoIcon,
  AssetyesIcon,
  NewfolderIcon
} from "@platformx/utilities";
import { useParams, useSearchParams } from "react-router-dom";
import { AssetHeader } from "./AssetHeader";
import Folder from "../components/Folder";
import useImagesStyle from "./Images.style";
import { useEffect, useState } from "react";
import { useAsset } from "@platformx/authoring-apis";
import ImageCard from "./ImageCard";
import {
  assetsApi
  // createCollection,
  // createCommunity,
  // deleteAsset,
  // deleteCommunity,
} from "@platformx/authoring-apis";
import {
  ShowToastError,
  ShowToastSuccess,
} from "@platformx/utilities";
import { t } from "i18next";
// import { authInfo } from "@platformx/utilities";
import InfiniteScroll from "react-infinite-scroll-component";
import FolderSkelaton from "../components/FolderSkeleton";

export const AssetListing = () => {
  const classes = useImagesStyle();

  const { assetType = "images" } = useParams();
  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const assetUUID = {
    images: '93ea0aed-631b-45a7-b3ae-564ac071dea6',
    videos: '11f0b07a-b736-40da-8a60-de9c8f6b4aae',
    // docs: authInfo.misc
  };
  const uuid1 = searchParams.get("uuid1") || assetUUID[assetType];

  const {
    assetData,
    collectionItem,
    setRefresh,
    isLazyLoad,
    fetchMoreData,
    startIndex,
    setStartIndex,
    assetLoading,
    folderLoading,
  } = useAsset({});

  const entityType = {
    images: "Image",
    videos: "Video",
  };
  const handleShow = () => setShow((prev) => !prev);
  const fetchMore = () => {
    const nextIndex = startIndex + 1;
    setStartIndex(() => nextIndex);
    fetchMoreData(nextIndex);
  };

  const createFolder = async () => {
    try {
      const { authoring_createAssets = {} } = await assetsApi.createCommunity({
        input: {
          name: folderName,
          uuid: uuid1,
        },
      });

      if (authoring_createAssets.id) {
        //const collectionRes =s
        await assetsApi.createCollection({
          input: {
            name: folderName,
            uuid: authoring_createAssets.id,
          },
          entityType: entityType[assetType],
        });
      }
      ShowToastSuccess(authoring_createAssets.message);
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    } finally {
      setRefresh(true);
      setShow(false);
      setFolderName("");
    }
  };

  const deleteFolder = async (communityId) => {
    try {
      const data = await assetsApi.deleteCommunity({
        uuid1: communityId,
      });

      ShowToastSuccess(data.community?.message);
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    } finally {
      setRefresh(true);
    }
  };

  const deleteAssets = async (assetId) => {
    // try {
    //   const data = await deleteAsset({
    //     uuid: assetId,
    //   });
    //   showToastSuccess(data.asset?.message);
    // } catch (error) {
    //   showToastError(t("api_error_toast"));
    // } finally {
    //   setRefresh(true);
    // }
  };

  useEffect(() => {
    setShow(false);
    setFolderName("");
  }, [uuid1]);

  return (
    <>
      <AssetHeader handleShow={setShow} />
      <Grid id='scrollableDiv' container className={classes.imagecontainer}>
        <InfiniteScroll
          dataLength={collectionItem.collectionItem?.length}
          next={fetchMore}
          hasMore={isLazyLoad}
          loader={<FolderSkelaton size={[1, 2, 3, 4]} />}
          scrollableTarget='scrollableDiv'>
          <Grid container item xs={12} sm={6} md={6} lg={3} className={classes.floatleft}>
            {!show ? (
              <Box className={classes.folderadd} onClick={handleShow}>
                <Box className={classes.folderlisting}>
                  <img className={classes.foldericon} src={NewfolderIcon} alt='folder' />
                  <Box className={classes.typeoexisttest}>
                    <Typography variant="inherit" className={classes.createfol}>
                      Create new folder
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className={classes.folderadd}>
                <Box className={classes.folderlisting} sx={{ cursor: "auto" }}>
                  <img className={classes.foldericon} src={NewfolderIcon} alt='folder' />
                  <Box className={classes.typeoexisttest}>
                    <TextField
                      inputProps={{ style: { textAlign: "center" } }}
                      className={classes.textcen}
                      placeholder='Enter Folder Name'
                      id='standard-basic'
                      variant='standard'
                      autoComplete='off'
                      onChange={(e) => setFolderName(e.target.value)}
                      autoFocus
                    />
                  </Box>
                  <Box className={classes.boxicon}>
                    <img
                      className={classes.assetyesicon}
                      onClick={handleShow}
                      src={AssetyesIcon}
                      alt='cancel'
                    />
                    <img
                      className={classes.assetnoicon}
                      onClick={() => createFolder()}
                      src={AssetnoIcon}
                      alt='done'
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
          {folderLoading && <FolderSkelaton size={[1, 2, 3]} />}
          {assetData.subcommunities.map((data, i) => (
            <Folder key={data.uuid} data={data} deleteFolder={deleteFolder} />
          ))}

          {assetLoading && <FolderSkelaton size={[1, 2, 3, 4]} />}
          {collectionItem.collectionItem?.length > 0 &&
            collectionItem.collectionItem?.map((data) => (
              <ImageCard data={data} key={data.uuid} deleteAsset={deleteAssets} />
            ))}
        </InfiniteScroll>
      </Grid>
    </>
  );
};
