import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { NoResultsFound, nullToArray } from "@platformx/utilities";
import ContentTypeCard from "./contentTypeCard/ContentTypeCard";
import useContentGlleryStyle from "./contentTypeCard/DamContentGllery.style";
import InfiniteScroll from "react-infinite-scroll-component";
import LoaderComponent from "./LoaderComponent";

const DamContentCard = ({ fetchMoreData, isLazyLoad, isLoading, data, setImageData }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleSelectCard = (index) => {
    setSelectedCardIndex(index);
  };
  const classes = useContentGlleryStyle();
  const getContentType = (item, index) => {
    return (
      <Grid
        container
        item
        xs={6}
        sm={4}
        md={4}
        lg={3}
        className={classes.containercard}
        onClick={() => {}}
        key={index}
        p={1}>
        <ContentTypeCard
          content={item}
          isLoading={isLoading}
          setImageData={setImageData}
          selectedCardIndex={selectedCardIndex}
          onSelectCard={() => handleSelectCard(item.uuid)}
        />

        <Box className={classes.contenttypecardbox} p={1}></Box>
      </Grid>
    );
  };

  return (
    <Box className={classes.noresultfoundtypo} id='scrollablegallerydiv'>
      {!isLoading && nullToArray(data.collectionItem)?.length === 0 ? (
        <NoResultsFound />
      ) : (
        <Grid container className={classes.infinitescroll}>
          <InfiniteScroll
            loader={<LoaderComponent />}
            next={fetchMoreData}
            hasMore={isLazyLoad}
            dataLength={data.collectionItem.length}
            scrollableTarget='scrollablegallerydiv'>
            {data.collectionItem?.map((item, index) => {
              return getContentType(item, index);
            })}
          </InfiniteScroll>
        </Grid>
      )}
    </Box>
  );
};

export default DamContentCard;
