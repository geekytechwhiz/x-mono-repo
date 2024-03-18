import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ContentProps } from "./utils/contentGalleryTypes";
import { NoContentFound, AUTH_INFO, ThemeConstants, NoResults } from "@platformx/utilities";
import { ContentTypeCard } from "@platformx/x-prelems-library";

const GalleryItems = ({ galleryObj, loading, fetchMoreData, isLazyLoad, error }) => {
  const [selectedItem, setSelectedItem] = useState<ContentProps>({});
  const secondaryArgs = {
    gcpUrl: AUTH_INFO.gcpUri,
    bucketName: AUTH_INFO.gcpBucketName,
  };
  const isError = false;
  const handleSelectedItem = (item, index) => {
    if (selectedItem === item) {
      setSelectedItem({});
    } else {
      setSelectedItem(item);
    }
  };
  const getContentType = (item, index) => {
    return (
      <Grid
        container
        xs={6}
        sm={4}
        md={4}
        lg={3}
        sx={{
          position: "relative",

          float: "left",
          width: "100%",
          height: "auto",
          aspectRatio: "1/1",
        }}
        onClick={(e) => handleSelectedItem(item, index)}
        key={index}
        p={1}>
        <ContentTypeCard content={item} secondaryArgs={secondaryArgs} isLoading={false} />
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            m: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          p={1}></Box>
      </Grid>
    );
  };
  return (
    <div>
      {isError ? (
        <Box
          sx={{
            marginTop: "200px",
            marginBottom: "100px",
            textAlign: "center",
          }}>
          <img src={NoResults} alt='' />
          <Typography variant='h3' sx={{ color: ThemeConstants.LIGHT_GREY_COLOR }}>
            Failed to fetch results
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            height: "calc(100vh - 160px)",
            overflowY: "scroll",
          }}
          id='scrollablegallerydiv'>
          {galleryObj && galleryObj?.length === 0 && !loading ? (
            <Box
              sx={{
                width: "100%",
                height: "75%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <NoContentFound />
            </Box>
          ) : (
            <Grid
              container
              sx={{
                backgroundColor: ThemeConstants.WHITE_COLOR,
                borderRadius: "5px",
                ".infinite-scroll-component__outerdiv": {
                  width: "inherit",
                },
              }}>
              <InfiniteScroll
                dataLength={galleryObj.length}
                next={fetchMoreData}
                hasMore={isLazyLoad}
                loader={null}
                scrollableTarget='scrollablegallerydiv'>
                {galleryObj?.map((item, index) => {
                  return getContentType(item, index);
                })}
              </InfiniteScroll>
            </Grid>
          )}
        </Box>
      )}
    </div>
  );
};

export default GalleryItems;
