import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORY_CONTENT, CATEGORY_PAGE, DASHBOARD_KEYS } from "../../constants/CommonConstants";

// import { DASHBOARD_KEYS } from '../../../pages/Dashboard/utils/constant';
// import CardMenu from '../../../pages/PageList/Components/CardMenu/CardMenu';
// import { CourseMenu } from '../../../pages/QuizPollEvents/Components/QuizPollEventsMenu/CourseMenu';
// import { QuizPollEventMenu } from '../../../pages/QuizPollEvents/Components/QuizPollEventsMenu/QuizPollEventsMenu';
// import {
//   default as PlateformXDialog,
//   default as PlateformXDialogDelete,
// } from '../../../pages/articles/deletePopup';

// import CardOption from '../CardOption/CardOption';
// import CommunityOption from '../CommunityOption';
import "./List.css";
// import { PublishInformation } from '../PublishInformation/PublishInformation';
import PlateformXDialog from "../Popups/PlateformXDialog";
// import { CourseMenu } from '../CourseMenu/CourseMenu';
// import CardMenu from '../CardMenu/CardMenu';
// import { QuizPollEventMenu } from '../QuizPollEventsMenu/QuizPollEventsMenu';
import { CommonPlateformXDialog } from "@platformx/utilities";
import { useNavigate } from "react-router";
import { RedBlinkingDot } from "../../assets/svg";
import useAccess from "../../hooks/useAccess/useAccess";
import { PublishInformation } from "../PublishInformation";
import CardOption from "./CardOption";
import { CardProps } from "./List.types";
import { iconsList, statusIcons } from "./constants";

export const Card = ({
  CustomMenuList,
  dataList,
  deleteContent,
  preview,
  view,
  edit,
  editPage,
  contentType,
  handlePageDelete,
}: CardProps) => {
  const { canAccessAction } = useAccess();
  const navigate = useNavigate();
  const tagName = dataList?.tagName?.toLowerCase() || dataList?.tags?.toLowerCase();
  const [subTitle, setSubTitle] = useState("");
  const { t } = useTranslation();
  const [isDelete, setDelete] = useState(false);
  const date = new Date().toJSON();
  const handleConfirmation = async () => {
    if (tagName === "sitepage") {
      await handlePageDelete(dataList);
    } else if (["quiz", "poll", "event", "vod", "article", "tagscategories"].includes(tagName)) {
      if (deleteContent) {
        setDelete(false);
        await deleteContent(dataList);
      }
    }
    setDelete(false);
  };

  const renderConfirmation = () => {
    switch (tagName) {
      case "sitepage":
        return (
          // <PlateformXDialog
          //   isDialogOpen
          //   title={t("delete_title")}
          //   subTitle={subTitle}
          //   closeButtonText={t("no")}
          //   confirmButtonText={t("yes")}
          //   closeButtonHandle={() => {
          //     setDelete(false);
          //   }}
          //   confirmButtonHandle={handleConfirmation}
          // />
          <CommonPlateformXDialog
            isDialogOpen
            title={t("delete_title")}
            subTitle={subTitle}
            closeButtonText={t("no_keep_it")}
            closeButtonHandle={() => {
              setDelete(false);
            }}
            confirmButtonText={t("yes_delete_it")}
            confirmButtonHandle={handleConfirmation}
            modalType='delete'
          />
        );
      case "vod":
      case "quiz":
      case "poll":
      case "event":
      case "article":
        return (
          // <PlateformXDialog
          //   isDialogOpen
          //   title={t("delete_title")}
          //   subTitle={subTitle}
          //   closeButtonText={t("no_keep_it")}
          //   confirmButtonText={t("yes_delete_it")}
          //   closeButtonHandle={() => {
          //     setDelete(false);
          //   }}
          //   confirmButtonHandle={handleConfirmation}
          // />
          <CommonPlateformXDialog
            isDialogOpen
            title={t("delete_title")}
            subTitle={subTitle}
            closeButtonText={t("no_keep_it")}
            closeButtonHandle={() => {
              setDelete(false);
            }}
            confirmButtonText={t("yes_delete_it")}
            confirmButtonHandle={handleConfirmation}
            modalType='delete'
          />
        );
      case "tagscategories":
        return (
          <PlateformXDialog
            isDialogOpen
            title={t("delete_title")}
            subTitle={`${t("delete_confirm")} ${t("tag")}?. ${t("process_undone")}`}
            closeButtonText={t("no_keep_it")}
            confirmButtonText={t("yes_delete_it")}
            closeButtonHandle={() => {
              setDelete(false);
            }}
            confirmButtonHandle={handleConfirmation}
          />
        );
      default:
        return;
    }
  };

  const handleCardClick = () => {
    const sitePage: any = {
      draft: editPage,
      published: view,
      unpublished: preview,
    };
    const ContentAction: any = {
      draft: edit,
      published: view,
      unpublished: preview,
    };
    // eslint-disable-next-line default-case
    switch (tagName) {
      // case 'vod':
      //   handlePageView();
      //   break;
      case "sitepage":
        sitePage[dataList.status](dataList);
        break;
      case "quiz":
      case "poll":
      case "event":
      case "article":
      case "courses":
      case "vod":
        ContentAction[dataList.status](dataList);
        break;
      case "tagscategories":
        view && view(dataList);
        break;
      default:
        return "";
    }
  };

  const handleEdit = () => {
    switch (tagName) {
      // case 'vod':
      // handleOpenVod(listItemDetails);
      // break;
      case "sitepage":
        editPage(dataList);
        break;
      case "quiz":
      case "vod":
      case "poll":
      case "event":
      case "article":
        if (edit) {
          edit(dataList);
        }
        break;
      case "tagscategories":
        edit && edit(dataList);
        break;
      default:
    }
  };
  const handleDeleteButton = () => {
    switch (tagName) {
      case "sitepage":
        setSubTitle(`${t("delete_confirm")} ${t("page")}? ${t("process_undone")}`);

        break;
      case "vod":
      case "quiz":
      case "poll":
      case "event":
      case "article":
        setSubTitle(`${t("delete_confirm")} ${t(tagName)}? ${t("process_undone")}`);
        break;
      case "tagscategories":
        break;
      default:
        setSubTitle(t("page_delete_subtitle"));
    }
    setDelete(true);
  };

  const getContentCategory = () => {
    return tagName?.toLowerCase() === DASHBOARD_KEYS.SITE_PAGE?.toLowerCase()
      ? CATEGORY_PAGE
      : CATEGORY_CONTENT;
  };

  const getContentSubCategory = () => {
    return tagName?.toLowerCase() === DASHBOARD_KEYS.SITE_PAGE.toLowerCase() ? "" : tagName;
  };

  return (
    <>
      {isDelete && renderConfirmation()}
      <Box className='listbox'>
        <Grid container className='d-flex align-items-center'>
          <Grid item xs={11} md={11} em={5} lg={7} xl={8} pr='20px'>
            <Box className='d-flex align-items-center' onClick={handleCardClick}>
              {/* content type icon */}
              <Box className='img'>
                <img
                  src={
                    dataList.tagName === "tagscategories"
                      ? iconsList[dataList.type]
                      : iconsList[dataList.tagName]
                  }
                  alt='img'
                />
              </Box>

              <Box className='rightspace'>
                <Grid container>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "24px",
                    }}>
                    <Tooltip title={dataList.title} placement='right-end'>
                      <Typography
                        variant='h5bold'
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                          wordBreak: "break-all",
                        }}>
                        {dataList.title}
                      </Typography>
                    </Tooltip>
                    {tagName === "event" &&
                      dataList.page_state === "published" &&
                      date > dataList.eventStartDate &&
                      date < dataList.eventEndDate && (
                        <img
                          style={{ height: "43px", width: "43px" }}
                          src={RedBlinkingDot}
                          alt='live gif'
                          width={24}
                          height={24}
                        />
                      )}
                    <Box component='div' className='mobstatusIcon'>
                      <Typography sx={{ marginLeft: "10px" }}>
                        <img src={statusIcons[dataList.status]} alt='' />
                      </Typography>
                      <Typography sx={{ marginLeft: "10px" }}>
                        {dataList.scheduledPublishTriggerDateTime !== null &&
                        tagName === "sitepage" ? (
                          <img src={statusIcons["schedulePublish"]} alt='' />
                        ) : (
                          ""
                        )}
                      </Typography>
                      <Typography sx={{ marginLeft: "10px" }}>
                        {dataList.scheduledUnPublishTriggerDateTime !== null &&
                        tagName === "sitepage" ? (
                          <img src={statusIcons["scheduleUnpublish"]} alt='' />
                        ) : (
                          ""
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    flexWrap: { xs: "wrap", em: "inherit" },
                    display: { xs: "none", em: "flex" },
                  }}>
                  <Typography
                    variant='h7regular'
                    sx={{
                      color: "#89909a",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-all",
                      order: { xs: 2, em: 1 },
                    }}>
                    {dataList.description}
                  </Typography>
                </Box>
                <Box className='datetimemob'>
                  <Typography variant='h7regular' component='div'>
                    {dataList.lastModifiedBy}
                  </Typography>
                  <Typography variant='h7regular' component='div'>
                    {dataList.lastModifiedDate &&
                      format(new Date(dataList.lastModifiedDate), "MMM d, yyyy | hh:mm a")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} md={1} em={7} lg={5} xl={4}>
            <Box className='d-flex align-items-center justify-content-end'>
              {/* publish icon */}
              <PublishInformation
                tagName={tagName}
                dataList={dataList}
                contentType={contentType || "quiz"}
                handleCardClick={handleCardClick}
              />
              {/* Edit, Delete Options */}
              <CardOption
                tagName={tagName}
                dataList={dataList}
                handleEdit={handleEdit}
                canAccessAction={canAccessAction}
                handleDeleteButton={handleDeleteButton}
                getContentCategory={getContentCategory}
                getContentSubCategory={getContentSubCategory}
              />
              {CustomMenuList}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
