import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, DialogContent, Drawer, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import DamContentCard from "./DamContentCard";
import DamContentLeftSidebar from "./DamContentLeftSidebar";
import DamContentTopHeading from "./DamContentTopHeading";
import "./DamGallery.css";
import axios from "axios";
import { assetsApi } from "@platformx/authoring-apis";
import { ThemeConstants, AUTH_INFO, capitalizeFirstLetter } from "@platformx/utilities";
import DamDropdown from "./DamDropdown";
import useDamContent from "./DamContent.style";
import { ASSETS, AUTHOR, SUBCOMMUNITIES } from "../utils/constants";

type DamContentGalleryProps = {
  assetType: "Image" | "Video";
  handleImageSelected?: any;
  handleSelectedVideo?: any;
  toggleGallery: any;
  keyName?: string;
  id?: any;
};

const COLLECTION_ITEM = {
  collectionItem: [],
  page: {},
};

const DamContentGallery = (_props: any) => {
  const {
    dialogOpen,
    assetType,
    handleImageSelected,
    handleSelectedVideo,
    toggleGallery,
    keyName,
    processing,
    isCrop = "false",
  } = _props;
  const { fetchFacet, fetchDAMContent } = assetsApi;
  const [data, setData] = useState(COLLECTION_ITEM);
  const [menuData, setMenuData] = useState(COLLECTION_ITEM);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState<number>(0);
  const ROWS = 16;
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [label, setLabel] = useState({});
  const classes = useDamContent();
  const [uuid, setUuid] = useState(
    assetType === "Image" ? AUTH_INFO.dspaceImagesUuid : AUTH_INFO.dspaceVideosUuid,
  );
  const [author, setAuthor] = useState("");
  const [inputValue, setInputValue] = useState<any>("");
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [searchItem, setSearchTerm] = useState<any>("");
  const [imageData, setImageData] = useState({
    Thumbnail: "",
    Title: "",
    Description: "",
    Author: "",
    bitStreamId: "",
    Url: "",
    bundlesUrl: "",
  });
  const [open, setOpen] = useState(false);

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const removetag = () => {
    setAuthor("");
  };
  // Function to get data from DAM based on index and search term
  const getFacet = async () => {
    try {
      const { authoring_getFacets } = await fetchFacet({
        scope_id: uuid,
        facet_name: AUTHOR,
      });
      setLabel({ author: authoring_getFacets });
    } catch (error) {
      console.log(error);
    }
  };
  const getDAMData = async (index, filter, searchTerm = "") => {
    try {
      const { authoring_getAssets = {} } = await fetchDAMContent({
        uuid: uuid, //"6581b3fe-8f42-4848-b3b6-fce87c8a0b57", //uuid,
        start: index,
        rows: ROWS,
        search: searchTerm,
        entityType: assetType,
        assetType: ASSETS,
        tags: { author: filter.author },
      });
      if (authoring_getAssets?.collectionItem?.length > 0) {
        setData({
          collectionItem: authoring_getAssets.collectionItem || [],
          page: authoring_getAssets.page || {},
        });
        if (authoring_getAssets?.collectionItem?.length < 16) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }
      } else {
        setData({
          collectionItem: [],
          page: {},
        });
        setIsLazyLoad(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsLazyLoad(false);
    }
  };
  // Function to fetch more DAM data

  const fetchMoreDAMData = async (index, searchTerm = "") => {
    try {
      const { authoring_getAssets = {} } = await fetchDAMContent({
        uuid: uuid,
        start: index,
        rows: ROWS,
        search: searchTerm,
        entityType: assetType,
        assetType: ASSETS,
        tags: { author: author },
      });
      let newCollectionItem: any = [];
      if (authoring_getAssets?.collectionItem?.length < 16) {
        setIsLazyLoad(false);
      }
      if (
        authoring_getAssets.collectionItem &&
        typeof authoring_getAssets.collectionItem[Symbol.iterator] === "function"
      ) {
        newCollectionItem = [...data.collectionItem, ...authoring_getAssets.collectionItem];
      } else if (authoring_getAssets.collectionItem) {
        newCollectionItem = [...data.collectionItem, authoring_getAssets.collectionItem];
      } else {
        newCollectionItem = [...data.collectionItem];
        setIsLazyLoad(false);
      }
      setData({
        ...data,
        collectionItem: newCollectionItem,
        page: { ...data.page, ...authoring_getAssets.page },
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsLazyLoad(false);
    }
  };
  // Function to get DAM content based on index and search term

  const getDAMcontent = async (index, filter, searchTerm = "") => {
    setLoading(true);
    getDAMData(index, filter, searchTerm);
  };

  // Function to fetch more DAM content

  const fetchMoreDAMcontent = async (index, searchTerm = "") => {
    setIsLazyLoad(true);
    fetchMoreDAMData(index, searchTerm);
  };

  // Function to get DAM menu content based on search term

  const getDamMenucontent = async (searchTerm = "") => {
    setCategoryLoading(true);
    try {
      const { authoring_getAssets = {} } = await fetchDAMContent({
        uuid: assetType === "Image" ? AUTH_INFO.dspaceImagesUuid : AUTH_INFO.dspaceVideosUuid,
        start: 0,
        rows: 16,
        search: searchTerm,
        entityType: "ALL",
        assetType: SUBCOMMUNITIES,
        tags: {},
      });

      setMenuData({
        collectionItem: authoring_getAssets.subcommunitiesList || [],
        page: authoring_getAssets.page || {},
      });

      setCategoryLoading(false);
    } catch (error) {
      console.log(error);
      setCategoryLoading(false);
    }
  };
  /**
   * pagination infinity scroll
   */

  const fetchMoreData = () => {
    const nextIndex = startIndex + 1;
    setStartIndex(() => nextIndex);
    fetchMoreDAMcontent(nextIndex, searchItem);
  };
  const handleSearch = (searchTerm) => {
    const nextIndex = 0;
    const filter = {
      author: author,
    };
    setStartIndex(() => nextIndex);
    setSearchTerm(searchTerm);
    // getDAMcontent(nextIndex, filter, searchTerm);
  };

  const setInputValueHandle = (searchData = "") => {
    setInputValue(searchData);
  };

  const handleDoneClick = async () => {
    if (assetType === "Image") {
      handleImageSelected(imageData, keyName);
      if (!isCrop) toggleGallery(false, "done", keyName);
    } else {
      try {
        const res = await axios.get(imageData.bundlesUrl);
        const videoUrl = res.data?._embedded?.bitstreams?.[0]?._links?.content?.href;

        handleSelectedVideo({ ...imageData, Url: videoUrl });
      } catch (error) {
        console.log(error);
      }
      toggleGallery(false, "done", keyName);
    }
  };

  // Initial fetch for menu content

  useEffect(() => {
    getDamMenucontent();
  }, []);
  // Initial fetch for DAM content

  useEffect(() => {
    const nextIndex = 0;
    const filter = {
      author: "",
    };
    removetag();
    setStartIndex(() => nextIndex);
    getDAMcontent(nextIndex, filter, searchItem);
  }, [uuid]);

  useEffect(() => {
    const nextIndex = 0;
    const filter = {
      author: author,
    };
    setStartIndex(() => nextIndex);
    getDAMcontent(nextIndex, filter, searchItem);
  }, [author]);

  useEffect(() => {
    getFacet();
  }, [uuid]);
  //Function to remove a tag from the author

  return (
    <Dialog
      open={dialogOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "100%",
          height: "calc(100% - 40px)",
          maxHeight: "calc(100% - 40px)",
          margin: "20px",
        },
      }}>
      <DialogContent sx={{ padding: "5px" }}>
        {open ? (
          <Grid container item xs={12} em={3} xl={2} lg={2} className={classes.parentGrid}>
            <Drawer anchor='right' open={open} sx={{ zIndex: 1300 }}>
              <Box role='presentation'>
                <DamContentLeftSidebar
                  loading={loading}
                  toggleDrawer={toggleDrawer}
                  menuData={menuData}
                  setUuid={setUuid}
                  assetType={assetType}
                />
              </Box>
            </Drawer>
          </Grid>
        ) : (
          <Box className='damcontent_container'>
            <DamContentTopHeading
              onSearch={handleSearch}
              inputValue={inputValue}
              setInputValueHandle={setInputValueHandle}
              assetType={assetType}
              toggleGallery={toggleGallery}
              handleDoneClick={handleDoneClick}
              imageData={imageData}
              menuData={menuData}
              toggleDrawer={toggleDrawer}
              loading={processing}
            />

            <Grid container spacing={0}>
              <Grid
                container
                className='leftsidebar-scroll'
                item
                xs={12}
                em={3}
                xl={2.5}
                lg={2.5}
                sx={{
                  display: { xs: "none", em: "block" },
                  borderRight: `solid 1px ${ThemeConstants.LIGHT_GRAY_VARIENT1}`,
                }}>
                <DamContentLeftSidebar
                  toggleDrawer={() => {}}
                  loading={categoryLoading}
                  menuData={menuData}
                  setUuid={setUuid}
                  assetType={assetType}
                />
              </Grid>

              <Grid
                item
                xs={12}
                em={9}
                xl={9.5}
                lg={9.5}
                className={`${classes.damDropdown} right-topbar-container `}>
                <Box className='right-topbar'>
                  <DamDropdown setAuthor={setAuthor} label={label} />
                </Box>

                <Box className={classes.marginLeft}>
                  {author && (
                    <Button
                      className='tagbtn'
                      key={author}
                      disabled={false}
                      variant='contained'
                      onClick={() => removetag()}
                      endIcon={<CloseIcon />}>
                      {capitalizeFirstLetter(author?.toLowerCase())}
                    </Button>
                  )}
                </Box>
                <DamContentCard
                  data={data}
                  isLazyLoad={isLazyLoad}
                  fetchMoreData={fetchMoreData}
                  isLoading={loading}
                  setImageData={setImageData}
                  imageData={imageData}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DamContentGallery;
