import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import {
  fetchMultisiteListing,
  multiSiteApi,
  getGlobalDataWithHeader,
} from "@platformx/authoring-apis";
import { ContentListingHeader } from "@platformx/content";
import {
  CopyIcon,
  NoSearchResult,
  PencilIcon,
  PeopleIcon,
  SettingIcon,
  ShowToastSuccess,
  SitePlaceholder,
  capitalizeFirstLetter,
  // getCurrentLang,
  useUserSession,
  Loader,
  ShowToastError,
} from "@platformx/utilities";
import { t } from "i18next";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import EmptyResult from "./EmptyResult";
import {
  SiteDesTypo,
  SiteDomainTypo,
  SiteLink,
  SiteNameBox,
  SiteNameTypo,
  useSiteListingStyle,
} from "./SiteListing.style";
import { SiteListingLoader } from "./SiteListingLoader";

export const SiteListing = () => {
  const navigate = useNavigate();
  const [datalist, setDatalist] = useState<any>([]);
  const sessions = localStorage.getItem("userSession") || "";
  const [getSession, updateSession] = useUserSession();
  const storedSession = JSON.parse(sessions);
  const accessible_sites = storedSession?.userInfo?.accessible_sites;
  const [startIndex, setStartIndex] = useState<any>(0);
  const [isFetchMore, setFetchMore] = useState(true);
  const [refreshState, setRefreshState] = useState(false);
  const [filterValue, setFilterValue] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const ROWS = 20;
  const [viewMoreList, setViewMoreList] = useState(datalist.map(() => ({ isViewMore: false })));
  const viewMoreChange = (index) => {
    const tempList = viewMoreList;
    tempList[index].isViewMore = !viewMoreList[index].isViewMore;
    setViewMoreList([...tempList]);
  };
  const classes = useSiteListingStyle();

  const copyDomainName = (domainName) => {
    navigator.clipboard.writeText(domainName);
    ShowToastSuccess(`${t("linkCopy")}`);
  };
  const generateDomain = (site) => {
    const domainName = site.domain_name.replace(".com.", ".com");
    return site.site_address
      ? `https://${site.site_address}.${domainName}`
      : `https://${domainName}`;
  };

  const fetchMultiSiteListing = async (start, isFilterChange, refresh = false) => {
    refresh && setRefreshState(true);
    isFilterChange && setDatalist([]);
    try {
      const inputVariable = {
        pageFilter: filterValue,
        pagination: {
          start: start,
          rows: ROWS,
        },
        sort: "DESC",
      };
      const response: any = await fetchMultisiteListing({ ...inputVariable });

      if (response.authoring_getMultiSiteListItems) {
        isFilterChange
          ? setDatalist(() => [...response.authoring_getMultiSiteListItems])
          : setDatalist((prev) => [...prev, ...response.authoring_getMultiSiteListItems]);
        if (response.authoring_getMultiSiteListItems?.length < ROWS) {
          setFetchMore(false);
        }
        const temp = response.authoring_getMultiSiteListItems.map(() => ({ isViewMore: false }));
        setViewMoreList((prev) => [...prev, ...temp]);
      }
      setRefreshState(false);
    } catch (error) {
      setFetchMore(false);
      setRefreshState(false);
    }
  };

  const fetchMore = () => {
    const nextIndex = startIndex + ROWS;
    setStartIndex(() => nextIndex);
    fetchMultiSiteListing(nextIndex, false);
  };

  const handleRefresh = () => {
    setStartIndex(0);
    setFetchMore(true);
    fetchMultiSiteListing(0, true, true);
  };

  const onDashBoardRedirect = (site) => {
    if (site?.status?.toLowerCase() === "published") {
      handleSiteChange(site, "dashboard");
    }
    return;
  };

  const handleFilter = (filter) => {
    setStartIndex(0);
    setFilterValue(filter);
    setFetchMore(true);
  };

  const handleSiteChange = async (sitetitle, pathname) => {
    try {
      if (!accessible_sites.includes(sitetitle.site_title_url)) {
        return;
      }
      setIsLoading(true);
      const res = await multiSiteApi.getPermissions(sitetitle.site_title_url);

      await getGlobalDataWithHeader(sitetitle.site_title_url);

      localStorage.setItem("selectedSite", sitetitle.site_title_url);
      updateSession({
        ...getSession(),
        permissions: res.data?.data?.permissions,
        userInfo: res.data?.data,
        role: res.data?.data?.roles?.find(
          (obj) => obj.site?.toLowerCase() === res.data?.data?.selected_site?.toLowerCase(),
        )?.name,
      });

      const redirectUrl = `${sitetitle.site_title_url}/en/${pathname}`;

      window.location.replace(`${window.location.origin}/${redirectUrl}`);
    } catch (error) {
      setIsLoading(false);
      ShowToastError(t("api_error_toast"));
    }
  };

  useEffect(() => {
    fetchMultiSiteListing(0, true);
  }, [filterValue]);

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.plusBox}>
          <Box className={classes.plusMargin} onClick={() => navigate("/sites/site-creation")}>
            <Fab size='large' color='primary' aria-label='add'>
              <AddIcon />
            </Fab>
          </Box>
        </Box>
        <ContentListingHeader
          handleFilter={handleFilter}
          title='Sites'
          category='site'
          subCategory={["sites"]}
          handleAddNew={() => navigate("/sites/site-creation")}
          handleRefresh={handleRefresh}
          animationState={refreshState}
          filterValue={filterValue}
        />
        {isLoading && <Loader />}
        {(datalist.length !== 0 || isFetchMore) && (
          <Box id='scrollableDiv' className={classes.scrollBox}>
            <InfiniteScroll
              dataLength={datalist.length}
              next={fetchMore}
              hasMore={isFetchMore}
              loader={<SiteListingLoader />}
              scrollableTarget='scrollableDiv'
              style={{ overflowX: "hidden" }}>
              {datalist.length > 0 &&
                datalist.map((site, index) => {
                  const isNotPublished = !(site?.status?.toLowerCase() === "published");
                  return (
                    <Fragment key={`site${index + 1}`}>
                      <Box
                        sx={{
                          marginTop: index > 0 ? "20px" : "0",
                        }}
                        className={classes.imgBox}>
                        <Grid container>
                          <Grid item xs={12} sm={2} md={2} lg={2}>
                            <Box
                              className={classes.imgContainer}
                              onClick={() => onDashBoardRedirect(site)}>
                              <img
                                className={classes.siteImg}
                                alt='logo'
                                src={
                                  site.header_logo
                                    ? `${process.env.NX_GCP_URL}/${process.env.NX_BUCKET_NAME}/${site.header_logo}`
                                    : SitePlaceholder
                                }
                                onError={(event) => {
                                  (event.target as HTMLImageElement).src = SitePlaceholder;
                                }}
                              />
                            </Box>
                          </Grid>
                          <SiteNameBox item xs={12} sm={8} md={8} lg={8}>
                            <SiteNameTypo> {site.site_title}</SiteNameTypo>
                            <Box className={classes.sitenameTypo}>
                              <Box
                                className={
                                  site?.status?.toLowerCase() === "published"
                                    ? classes.statusPublish
                                    : site?.status?.toLowerCase() === "draft"
                                      ? classes.statusDraft
                                      : classes.statusUnpublish
                                }>
                                {capitalizeFirstLetter(site.status)}
                              </Box>
                              <SiteDomainTypo>
                                Domain:{" "}
                                <SiteLink
                                  className={classes.siteLinkType}
                                  href={generateDomain(site)}
                                  target='_blank'>
                                  {`${generateDomain(site)?.replace("https://", "")}`}
                                </SiteLink>
                                <IconButton
                                  onClick={() => copyDomainName(generateDomain(site))}
                                  aria-label='copy domain name'>
                                  <img src={CopyIcon} alt='' />
                                </IconButton>
                              </SiteDomainTypo>
                            </Box>
                            <SiteDesTypo>
                              <Box component='span' className={classes.siteDesSmUp}>
                                {site.about_site}
                              </Box>
                              {viewMoreList[index] && (
                                <Box component='span' className={classes.siteDesSx}>
                                  <>
                                    {viewMoreList[index].isViewMore ? (
                                      <>{`${site.about_site} `}</>
                                    ) : (
                                      <>{`${site.about_site.slice(0, 50)}`}</>
                                    )}
                                    {site.about_site.length > 50 && (
                                      <Box
                                        onClick={() => viewMoreChange(index)}
                                        component='span'
                                        sx={{ color: "#4B9EF9" }}>
                                        {viewMoreList[index].isViewMore
                                          ? `View Less`
                                          : ` View More...`}
                                      </Box>
                                    )}
                                  </>
                                </Box>
                              )}
                            </SiteDesTypo>
                          </SiteNameBox>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            className={classes.settingIconBox}>
                            <Stack
                              direction='row'
                              spacing={2}
                              sx={{ justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                              <Tooltip title={t("Update")} placement='top' enterTouchDelay={0}>
                                <IconButton
                                  onClick={() =>
                                    navigate(`/sites/site-creation/${site.site_title_url}`)
                                  }>
                                  <img src={PencilIcon} alt='edit' />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                title={t("User Management")}
                                placement='top'
                                enterTouchDelay={0}>
                                <IconButton
                                  onClick={() =>
                                    handleSiteChange(site, "user-management/user-list")
                                  }
                                  disabled={isNotPublished}
                                  className={isNotPublished ? classes.opacity : ""}>
                                  <img src={PeopleIcon} alt='icon' />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t("Settings")} placement='top' enterTouchDelay={0}>
                                <IconButton
                                  onClick={() =>
                                    handleSiteChange(site, "site-setting/global-setting")
                                  }
                                  disabled={isNotPublished}
                                  className={isNotPublished ? classes.opacity : ""}>
                                  <img src={SettingIcon} alt='icon' />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </Fragment>
                  );
                })}
            </InfiniteScroll>
          </Box>
        )}
        {datalist.length === 0 && !isFetchMore && filterValue === "ALL" && <EmptyResult />}
        {datalist.length === 0 && !isFetchMore && filterValue !== "ALL" && <NoSearchResult />}
      </Box>
    </Box>
  );
};
