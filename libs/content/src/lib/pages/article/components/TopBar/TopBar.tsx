import { ArrowBack } from "@mui/icons-material";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useComment } from "@platformx/authoring-apis";
import {
  DefaultStateCommentIcon,
  ErrorTooltip,
  MarkedFeatured,
  PlatXLogo,
  PreviewNewIcon,
  SettingNewIcon,
  Timer,
  ToolTip,
  WorkflowHistoryIcon,
  enableReferBack,
  useAccess,
  workflowKeys,
} from "@platformx/utilities";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { ToolTip } from "../../../components/Common/ToolTip";
// import WorkflowAssignee from "../../../components/WorkflowAssignee/Index";
import "../../CreateArticle.css";
import { useStyles } from "../../CreateArticle.styles";
import PublishSocialShare from "../PublishSocialShare/PublishSocialShare";

const TopBar = ({
  returnBack,
  createText,
  handleClickOpen,
  onSave,
  handelPreview,
  state,
  setState,
  socialOgTags,
  setSocialOgTags,
  showGallery,
  setOperationType,
  show,
  setShow,
  updateStructureDataArticle,
  previewButton,
  toolTipText,
  category,
  subCategory,
  createComment,
  workflow,
  timerState,
  lastmodifiedDate,
  setEnableWorkflowHistory,
  setIsFeatured,
  isFeatured,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { canAccessAction } = useAccess();
  // const { setIsReviewEnabled, setIsCommentPanelOpen, isReviewEnabled, comments } = useComment();
  const { comments } = useComment();
  const [approvalStatus, setApprovalStatus] = useState(false);
  const handleReview = () => {
    // setIsReviewEnabled(!isReviewEnabled);
    // if (comments?.length > 0) {
    // setIsCommentPanelOpen(true);
    //}
  };
  // useEffect(() => {
  //   if (enableReferBack(workflow) || comments?.length > 0) {
  //     // setIsReviewEnabled(true);
  //   } else {
  //     // setIsReviewEnabled(false);
  //   }
  // }, [isReviewEnabled, workflow, comments]);
  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box className='createarticletophead'>
        <Box className='d-flex'>
          <Box className='backarrow' onClick={returnBack}>
            <ArrowBack sx={{ marginRight: "10px" }} />{" "}
            {!noWeb && <Typography variant='h3medium'>{t("article")}</Typography>}
          </Box>
          <Box className={classes.logoDispaly} onClick={() => navigate("/dashboard")}>
            <img src={PlatXLogo} height='30' alt='img' />
          </Box>
        </Box>
        <Box className='d-flex align-items-center justify-content-space-between'>
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            container
            alignItems='flex-end'
            direction='row'
            sx={{
              display: { xs: "none", em: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}>
            {/* {role === "Admin FIFA" && (
              <Button
                onClick={() => setApprovalStatus(true)}
                sx={{
                  textTransform: "none",
                }}>
                {t("Assign Workflow")}
              </Button>
            )} */}
            <MarkedFeatured setIsFeatured={setIsFeatured} isFeatured={isFeatured} />
            <WorkflowHistoryIcon
              enableWorkflowHistory={setEnableWorkflowHistory}
              workflow_status={workflow.workflow_status}
            />

            {
              //enableReferBack(workflow) ||
              comments?.length > 0 ? (
                // <Badge badgeContent={comments?.length} color='info'>
                <Box sx={{ position: "relative" }} className={classes.buttonWrapper}>
                  <span
                    color='error'
                    style={{
                      display: "inline-block",
                      marginLeft: " 5px",
                      marginRight: "5px",
                      marginBottom: "-2px",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "7px",
                      right: "3px",
                      zIndex: 9,
                      height: "8px",
                      width: "8px",
                      backgroundColor: "#D32F2F",
                    }}></span>
                  <Button
                    className='iconBtn'
                    onClick={handleReview}
                    startIcon={
                      <img src={DefaultStateCommentIcon} style={{ width: "20px" }} alt='img' />
                    }>
                    {/* <DefaultStateCommentIcon /> */}
                  </Button>
                </Box>
              ) : (
                // </Badge>
                enableReferBack(workflow) && (
                  <Box className={classes.buttonWrapper}>
                    <Button
                      className='iconBtn'
                      onClick={handleReview}
                      startIcon={
                        <img src={DefaultStateCommentIcon} style={{ width: "20px" }} alt='img' />
                      }></Button>
                  </Box>
                )
              )
            }
            {timerState && <Timer lastmodifiedDate={lastmodifiedDate} />}

            <ToolTip
              className={classes.buttonWrapper}
              component={
                <Button
                  onClick={() => setShow(true)}
                  startIcon={<img src={SettingNewIcon} alt='img' />}
                  // disabled={true}
                  className='iconBtn'></Button>
              }
              Title='Social Share, SEO and Analytics are here'
              position='bottom'
            />
            <ToolTip
              className={classes.buttonWrapper}
              Title={previewButton ? toolTipText : ""}
              position='bottom'
              component={
                <Button
                  onClick={handelPreview}
                  disabled={previewButton}
                  startIcon={<img src={PreviewNewIcon} alt='img' />}
                  className='iconBtn'></Button>
              }
            />
            <ErrorTooltip
              component={
                <Button
                  onClick={() => onSave(false)}
                  disabled={!canAccessAction(category, subCategory, "Create")}
                  variant='secondaryButton'
                  sx={{ marginRight: "12px", marginLeft: "12px" }}
                  className='sm'>
                  {t("save_as_draft")}
                </Button>
              }
              doAccess={!canAccessAction(category, subCategory, "Create")}
            />
            <ErrorTooltip
              component={
                <Button
                  variant='primaryButton'
                  className='sm'
                  onClick={handleClickOpen}
                  disabled={
                    workflow?.enable &&
                    workflow?.workflow_status?.toLowerCase() === workflowKeys.published
                  }>
                  {t("continue")}
                </Button>
              }
              doAccess={
                workflow?.enable &&
                workflow?.workflow_status?.toLowerCase() === workflowKeys.published
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            container
            alignItems='flex-end'
            direction='row'
            sx={{
              display: { xs: "flex", em: "none" },
              justifyContent: "center",
              alignItems: "center",
            }}>
            {/* {role === "Admin FIFA" && (
              <Button
                onClick={() => setApprovalStatus(true)}
                sx={{
                  textTransform: "none",
                }}>
                {t("Assign Workflow")}
              </Button>
            )} */}
            <MarkedFeatured setIsFeatured={setIsFeatured} isFeatured={isFeatured} />
            <WorkflowHistoryIcon
              enableWorkflowHistory={setEnableWorkflowHistory}
              workflow_status={workflow.workflow_status}
            />

            {comments?.length > 0 ? (
              <Box sx={{ position: "relative" }} className={classes.buttonWrapper}>
                <span
                  color='error'
                  style={{
                    display: "inline-block",
                    marginLeft: " 5px",
                    marginRight: "5px",
                    marginBottom: "-2px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "7px",
                    right: "3px",
                    zIndex: 9,
                    height: "8px",
                    width: "8px",
                    backgroundColor: "#D32F2F",
                  }}></span>
                <Button
                  className='iconBtn'
                  onClick={handleReview}
                  startIcon={
                    <img src={DefaultStateCommentIcon} style={{ width: "20px" }} alt='img' />
                  }></Button>
              </Box>
            ) : (
              // </Badge>
              enableReferBack(workflow) && (
                <Box className={classes.buttonWrapper}>
                  <Button
                    className='iconBtn'
                    onClick={handleReview}
                    startIcon={
                      <img src={DefaultStateCommentIcon} style={{ width: "20px" }} alt='img' />
                    }></Button>
                </Box>
              )
            )}
            {timerState && <Timer lastmodifiedDate={lastmodifiedDate} />}

            <ToolTip
              className={classes.buttonWrapper}
              component={
                <Button
                  onClick={() => setShow(true)}
                  startIcon={<img src={SettingNewIcon} alt='img' />}
                  className='iconBtn'></Button>
              }
              Title='Social Share, SEO and Analytics are here'
              position='bottom'
            />
            <ToolTip
              className={classes.buttonWrapper}
              Title={previewButton ? toolTipText : ""}
              position='bottom'
              component={
                <Button
                  onClick={handelPreview}
                  disabled={previewButton}
                  startIcon={<img src={PreviewNewIcon} alt='img' />}
                  className='iconBtn'></Button>
              }
            />

            <ErrorTooltip
              component={
                <Button
                  sx={{ minWidth: "0px" }}
                  startIcon={<TelegramIcon />}
                  onClick={() => onSave(false)}
                  disabled={!canAccessAction(category, subCategory, "Create")}></Button>
              }
              doAccess={!canAccessAction(category, subCategory, "Create")}
            />
            <ErrorTooltip
              component={
                <Button
                  startIcon={<SaveAsRoundedIcon />}
                  sx={{ minWidth: "0px" }}
                  onClick={handleClickOpen}
                  disabled={
                    workflow?.enable &&
                    workflow?.workflow_status?.toLowerCase() === workflowKeys.published
                  }></Button>
              }
              doAccess={
                workflow?.enable &&
                workflow?.workflow_status?.toLowerCase() === workflowKeys.published
              }
            />
          </Grid>
        </Box>
      </Box>

      <PublishSocialShare
        open={show}
        handleClose={() => setShow(false)}
        state={state}
        setState={setState}
        socialOgTags={socialOgTags}
        setSocialOgTags={setSocialOgTags}
        showGallery={showGallery}
        setOperationType={setOperationType}
        setShow={setShow}
        updateStructureDataArticle={updateStructureDataArticle}
      />
      {/* {approvalStatus && (
        <WorkflowAssignee
          open={approvalStatus}
          setOpen={setApprovalStatus}
          path={workflow.page}
          contentType={workflow?.tag_name}
        />
      )} */}
    </>
  );
};

export default TopBar;
