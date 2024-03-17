import { useLazyQuery } from "@apollo/client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Box, Button, Divider, Slide, Typography } from "@mui/material";
import { fetchPageListAll } from "@platformx/authoring-apis";
import { ContentListMobileLoader, NoResults, ThemeConstants } from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { ItemlistProps } from "../utils/types";
import MenuThirdPage from "./MenuThirdPage";
import MobilePageListing from "./MobilePageListing";

export default function MenuSecondPage({
  setIsMenuSecondPg,
  setOpenFirstPage,
  handleBack,
  activeStep,
  setActiveStep,
  handleNext,
  menuItemName,
  menuDescription,
  selectedIcon,
  selectedItem,
  radioSelected,
  subMenuValue,
  setMenuItemName,
  setRadioSelected,
  setSubMenuValue,
  setAlignment,
  isHomePage,
  leftSideBarContent,
  menuId,
  clickConfirm,
  setClickConfirm,
  editData,
}) {
  const { t } = useTranslation();
  const [runFetchPageList] = useLazyQuery(fetchPageListAll);
  const [items, setItem] = useState<ItemlistProps[]>();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [rows] = useState<number>(10);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [isloading] = useState(false);
  const searchPageUrl = new URL(window.location.href);
  const [url, setUrl] = useState("");

  const [sortOrder] = React.useState(
    searchPageUrl.searchParams.get("sortBy")
      ? (searchPageUrl.searchParams.get("sortBy") as string)
      : "DESC",
  );

  const [currentButton, setCurrentButton] = React.useState(null);
  const [isDone, setIsDone] = useState(false);
  const [isMenuThirdPg, setIsMenuThirdPg] = React.useState(false);
  const [pageName, setPageName] = useState("");

  React.useEffect(() => {
    if (editData?.Internal) {
      setCurrentButton(editData?.URL);
      setIsDone(true);
    } else {
      setIsDone(false);
      setCurrentButton(null);
    }
  }, [editData]);

  const getData = (index) => {
    runFetchPageList({
      variables: {
        obj: { start: index, rows: rows },
        type: "PUBLISHED",
        sort: sortOrder,
        searchTerm: searchPageUrl.searchParams.get("searchTerm")
          ? searchPageUrl.searchParams.get("searchTerm")
          : "",
      },
    })
      .then((resp) => {
        if (resp?.data?.authoring_pageList?.length > 0 && items !== undefined) {
          const newData = [...items, ...resp.data.authoring_pageList];
          setItem(() => newData);
        }
        if (resp?.data?.authoring_pageList.length === 0) {
          setIsLazyLoad(false);
        }
      })
      .catch((err) => {
        setItem([]);
      });
  };
  useEffect(() => {
    runFetchPageList({
      variables: {
        obj: { start: startIndex, rows: rows },
        type: "PUBLISHED",
        sort: sortOrder,
        searchTerm: searchPageUrl.searchParams.get("searchTerm")
          ? searchPageUrl.searchParams.get("searchTerm")
          : "",
      },
    })
      .then((resp) => {
        setItem(resp?.data?.authoring_pageList);
        if (resp?.data?.authoring_pageList.length < 10) {
          setIsLazyLoad(false);
        }
      })
      .catch((err) => {
        // console.log(JSON.stringify(err, null, 2));
      });
  }, []);
  // useEffect(() => {
  //   dispatch(setDefaultPageModel(state));
  // }, []);
  const fetchMoreData = () => {
    const nextIndex = startIndex + rows;
    setStartIndex(() => nextIndex);
    getData(nextIndex);
  };

  return (
    <Box
      sx={{
        width: { sm: "100%", xs: "100%", md: "100%", lg: "100%" },
        display: { xs: "block", sm: "none" },
      }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "13px",
        }}>
        <ArrowBackIosIcon
          onClick={() => {
            handleBack();
            setActiveStep(0);
            setIsMenuSecondPg(false);
            setOpenFirstPage(true);
          }}
          sx={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            margin: 1,
          }}
        />
        <Typography
          variant='h4medium'
          sx={{
            width: "393px",
            height: "35px",
            // margin: '5px 0px 0px 0px',
            display: "flex",
            alignItems: "center",
            color: "#2d2d39",
          }}>
          {t("choose_page")}
        </Typography>
        {/* <Box sx={{ marginRight: '13px' }}>
          <SearchIcon
            sx={{ verticalAlign: 'middle' }}
            // onClick={() => setIsSearchHeaderOpen(true)}
          />
        </Box> */}
        <Box
          sx={{
            border: "1px solid #c3c3cb",
            padding: "8px 15px",
            borderRadius: "4px",
            marginLeft: "10px",
            height: "50px",
            display: { xs: "none", sm: "block" },
          }}>
          <Box sx={{ display: { sm: "none" } }}>
            {isloading ? (
              <ContentListMobileLoader />
            ) : (
              <>
                {items?.length === 0 && (
                  <Box sx={{ textAlign: "center", marginTop: "10%" }}>
                    <img src={NoResults} alt='icon' />
                    <Typography
                      variant='h5'
                      sx={{
                        color: "#c3c3c3",
                      }}>
                      {t("no_results")}
                    </Typography>
                    {/* <Typography
                      variant="h5"
                      sx={{
                        color: "#c3c3c3",
                      }}
                    >
                      Please try again
                    </Typography> */}
                  </Box>
                )}
                <InfiniteScroll
                  dataLength={items !== undefined ? items.length : 0}
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  loader={<ContentListMobileLoader />}
                  scrollableTarget='scrollableDiv2'>
                  <Box>
                    {items?.map((item, index) => (
                      <MobilePageListing
                        key={index}
                        article={item}
                        index={index}
                        currentButton={currentButton}
                        setCurrentButton={setCurrentButton}
                        setIsDone={setIsDone}
                        setPageName={setPageName}
                        setUrl={setUrl}
                        editData={editData}
                      />
                    ))}
                  </Box>
                </InfiniteScroll>
              </>
            )}
          </Box>
        </Box>
        {/* <CalendarMonthOutlinedIcon
          onClick={() => setisClickedMob(!isClickedMob)}
        /> */}
      </Box>
      <Divider />

      <Typography
        sx={{
          ml: "16px",
          mt: "18px",
          fontSize: ThemeConstants.FONTSIZE_XS,
        }}>
        {t("all_pages")}
      </Typography>
      <Typography
        variant='h5'
        sx={{
          ml: "16px",
          mt: "12px",
          fontsize: ThemeConstants.FONTSIZE_MD,
        }}>
        {t("recently_added")}
      </Typography>
      <Box
        id='scrollableDiv2'
        sx={{
          padding: "15px",
          position: "relative",
          height: "calc(100vh - 140px)",
          overflowY: "scroll",
          overflowX: "hidden",
          paddingBottom: { xs: "150px", sm: "0" },
        }}>
        <Box sx={{ display: { sm: "none" } }}>
          {isloading ? (
            <ContentListMobileLoader />
          ) : (
            <>
              {items?.length === 0 && (
                <Box sx={{ textAlign: "center", marginTop: "10%" }}>
                  <img src={NoResults} alt='icon' />
                  <Typography
                    variant='h5'
                    sx={{
                      color: "#c3c3c3",
                    }}>
                    {t("no_results")}
                  </Typography>
                </Box>
              )}
              <InfiniteScroll
                dataLength={items !== undefined ? items.length : 0}
                next={fetchMoreData}
                hasMore={isLazyLoad}
                loader={<ContentListMobileLoader />}
                scrollableTarget='scrollableDiv2'>
                <Box>
                  {items?.map((item, index) => (
                    <MobilePageListing
                      key={index}
                      article={item}
                      index={index}
                      currentButton={currentButton}
                      setCurrentButton={setCurrentButton}
                      setIsDone={setIsDone}
                      setPageName={setPageName}
                      setUrl={setUrl}
                      editData={editData}
                    />
                  ))}
                </Box>
              </InfiniteScroll>
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {/* {!isDone && (
          <Fab
            sx={{ position: 'fixed', bottom: '4%', right: '5%', zIndex: 99 }}
            size='large'
            color='primary'
            aria-label='add'
          >
            <AddIcon />
          </Fab>
        )} */}
        {isDone && (
          <Button
            variant='contained'
            disableElevation
            sx={{
              width: "347px",
              height: "50px",
              fontSize: ThemeConstants.FONTSIZE_SM,
              backgroundColor: "#2d2d39",
              position: "fixed",
              bottom: "3%",
              color: "#fff",
              textTransform: "none",
              mr: "14px",
              ml: "14px",
              "&:hover": {
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
              },
            }}
            onClick={() => {
              handleNext();
              setIsMenuThirdPg(true);
            }}>
            <DoneOutlinedIcon sx={{ mr: "15.5px" }} />
            {t("done")}
          </Button>
        )}
      </Box>

      <Slide direction='right' in={isMenuThirdPg} timeout={300}>
        <Box
          sx={{
            backgroundColor: "#fff",
            zIndex: 100,
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
          }}>
          <MenuThirdPage
            setIsMenuThirdPg={setIsMenuThirdPg}
            setIsMenuSecondPg={setIsMenuSecondPg}
            handleBack={handleBack}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            handleNext={handleNext}
            pageName={pageName}
            menuItemName={menuItemName}
            menuDescription={menuDescription}
            selectedIcon={selectedIcon}
            selectedItem={selectedItem}
            radioSelected={radioSelected}
            subMenuValue={subMenuValue}
            setOpenFirstPage={setOpenFirstPage}
            setMenuItemName={setMenuItemName}
            setRadioSelected={setRadioSelected}
            setSubMenuValue={setSubMenuValue}
            setAlignment={setAlignment}
            setPageName={setPageName}
            url={url}
            setUrl={setUrl}
            isHomePage={isHomePage}
            leftSideBarContent={leftSideBarContent}
            menuId={menuId}
            setCurrentButton={setCurrentButton}
            setIsDone={setIsDone}
            clickConfirm={clickConfirm}
            setClickConfirm={setClickConfirm}
            editData={editData}
          />
        </Box>
      </Slide>
    </Box>
  );
}
