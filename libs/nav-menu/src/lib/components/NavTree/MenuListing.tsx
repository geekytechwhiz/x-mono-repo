import { useLazyQuery } from "@apollo/client";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchPageListAll } from "@platformx/authoring-apis";
import { ContentListDesktopLoader } from "@platformx/utilities";
import MenuPageList from "./MenuPageList";
import { ItemlistProps } from "./utils/types";

export const MenuListing = ({
  setPageName1,
  isDisable,
  currentButton,
  setCurrentButton,
  isDisableDone,
  setisIsDisableDone,
  isPageListCall,
  setUrl,
  editData,
  isedit,
}) => {
  const { t } = useTranslation();

  const [startIndex, setStartIndex] = useState<number>(0);
  const [rows] = useState<number>(20);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(false);
  const [isloading, setLoading] = useState(false);

  const searchPageUrl = new URL(window.location.href);
  const [runFetchPageList] = useLazyQuery(fetchPageListAll);

  const [sortOrder] = React.useState(
    searchPageUrl.searchParams.get("sortBy")
      ? (searchPageUrl.searchParams.get("sortBy") as string)
      : "DESC",
  );
  const [items, setItem] = useState<ItemlistProps[]>();

  const arr = items?.filter((item, i) => {
    if (item.Status === "published") return item;
    return item;
  });
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

  const fetchMoreData = () => {
    const nextIndex = startIndex + rows;
    setStartIndex(() => nextIndex);
    getData(nextIndex);
  };

  useEffect(() => {
    setLoading(true);
    runFetchPageList({
      variables: {
        obj: { start: 0, rows: rows },
        type: "PUBLISHED",
        sort: sortOrder,
        searchTerm: searchPageUrl.searchParams.get("searchTerm")
          ? searchPageUrl.searchParams.get("searchTerm")
          : "",
      },
    })
      .then((resp) => {
        setItem(resp?.data?.authoring_pageList);
        setLoading(false);
        if (resp?.data?.authoring_pageList.length < 10) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }
      })
      .catch((err) => {
        // console.log(JSON.stringify(err, null, 2));
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: "15px",
          position: "relative",
          height: "calc(100vh - 140px)",
          overflowY: "scroll",
          overflowX: "hidden",
          paddingBottom: { xs: "150px", sm: "0" },
        }}
        id='scrollableDiv1'>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
            }}>
            <Typography variant='h3medium'>{t("recently_added")}</Typography>
            <FiberManualRecordIcon
              sx={{
                fontSize: { xs: "7px", sm: "10px" },
                margin: "0 5px",
                color: "#b3b3b3",
              }}
            />
            <Typography variant='p1regular' sx={{ color: "#b3b3b3" }}>
              {arr?.length}
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                display: { md: "none" },
                height: "20px",
                width: "20px",
              }}></Box>
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Button
                  className='sm addnewpage'
                  variant='primaryButton'
                  onClick={handleCardClick}
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    marginLeft: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('create_new_page')}
                </Button>
              </Box>
            </Box> */}
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid
              container
              sx={{
                alignItems: "center",
                padding: "5px 25px",
                marginBottom: "14px",
              }}>
              <Grid item xs={2.4} sx={{ marginRight: "2%" }}>
                <Typography
                  variant='h6regular'
                  sx={{ color: "#b3b3b3", textTransform: "capitalize" }}>
                  {`${t("page")} ${t("title")}`}
                </Typography>
              </Grid>
              <Grid item xs={2.8} sx={{ marginRight: "2.8%" }}>
                <Typography
                  variant='h6regular'
                  sx={{ color: "#b3b3b3", textTransform: "capitalize" }}>
                  {t("description")}
                </Typography>
              </Grid>
              <Grid item xs={1} md={1.5} sx={{ marginRight: "3.2%" }}>
                <Typography
                  variant='h6regular'
                  sx={{ color: "#b3b3b3", textTransform: "capitalize" }}>
                  {t("author")}
                </Typography>
              </Grid>
              <Grid item xs={2.6} sx={{ marginRight: "3%" }}>
                <Typography
                  variant='h6regular'
                  sx={{ color: "#b3b3b3", textTransform: "capitalize" }}>
                  {t("published_time")}
                </Typography>
              </Grid>
              <Grid item xs={0.5} md={1}>
                <Typography
                  variant='h6regular'
                  sx={{ color: "#b3b3b3", textTransform: "capitalize" }}>
                  {t("action")}
                </Typography>
              </Grid>
            </Grid>
            {isloading ? (
              <>
                <ContentListDesktopLoader />
              </>
            ) : (
              <>
                <InfiniteScroll
                  dataLength={items !== undefined ? items.length : 0}
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  loader={<ContentListDesktopLoader />}
                  scrollableTarget='scrollableDiv1'>
                  <Box sx={{ display: "Grid" }}>
                    {items?.map((item, index) => (
                      <MenuPageList
                        key={index}
                        article={item}
                        index={index}
                        setPageName1={setPageName1}
                        isDisable={isDisable}
                        currentButton={currentButton}
                        setCurrentButton={setCurrentButton}
                        isDisableDone={isDisableDone}
                        setisIsDisableDone={setisIsDisableDone}
                        setUrl={setUrl}
                        editData={editData}
                        isedit={isedit}
                      />
                    ))}
                  </Box>
                </InfiniteScroll>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {/* <Box sx={{ zIndex: 5000 }}>
        <CreatePage
          isDialogOpen={createPage}
          isDuplicate={false}
          confirmButtonHandle={confirmButtonHandle}
          closeButtonHandle={() => setCreatePage(!createPage)}
        />
      </Box> */}
    </>
  );
};
