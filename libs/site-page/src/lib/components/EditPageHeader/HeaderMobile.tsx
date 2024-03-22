import { KeyboardBackspace, SaveOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import {
  CATEGORY_PAGE,
  WorkflowHistoryIcon,
  enableReferBack,
  Submit,
  ErrorTooltip,
  Timer,
  DefaultStateCommentIcon,
  useAccess,
} from "@platformx/utilities";
import { useStyles } from "./Header.styles";
import { useSelector } from "react-redux";
import { RootState } from "@platformx/authoring-state";

const HeaderMobile = ({
  lastmodifiedDate,
  handleChange,
  value,
  handleBack,
  isSaveButtonEnabled,
  isPublishButtonEnabled,
  previewStatus,
  handleSaveClick,
  handlePublishClick,
  timerState,
  prelemEditState,
  workflow,
  setEnableWorkflowHistory,
}) => {
  const classes = useStyles();
  const { canAccessAction } = useAccess();
  const { setIsReviewEnabled, setIsCommentPanelOpen, isReviewEnabled, comments } = useSelector(
    (state: RootState) => state.comment.commentInfo,
  );
  const handleReview = () => {
    setIsReviewEnabled(!isReviewEnabled);
    setIsCommentPanelOpen(true);
  };
  useEffect(() => {
    if (enableReferBack(workflow) || comments?.length > 0) {
      setIsReviewEnabled(true);
    } else {
      setIsReviewEnabled(false);
    }
  }, [isReviewEnabled, workflow, comments]);
  return (
    <Box className={`${classes.headerwp} ${classes.mobHeader}`}>
      <Box className={classes.leftwp}>
        <Button onClick={handleBack}>
          <KeyboardBackspace />
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
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
              startIcon={<img src={DefaultStateCommentIcon} width='20px' alt='' />}></Button>
          </Box>
        ) : (
          enableReferBack(workflow) && (
            <Box className={classes.buttonWrapper}>
              <Button
                className='iconBtn'
                onClick={handleReview}
                startIcon={<img src={DefaultStateCommentIcon} width='20px' alt='' />}></Button>
            </Box>
          )
        )}
        {timerState && <Timer lastmodifiedDate={lastmodifiedDate} />}
        <WorkflowHistoryIcon
          enableWorkflowHistory={setEnableWorkflowHistory}
          workflow_status={workflow?.workflow_status}
        />
        <ErrorTooltip
          className={classes.buttonWrapper}
          component={
            <Button
              className='iconBtn'
              startIcon={<SaveOutlined />}
              disabled={!isSaveButtonEnabled || prelemEditState}
              onClick={handleSaveClick}></Button>
          }
          doAccess={!canAccessAction(CATEGORY_PAGE, "", "Create")}
        />
        {/* <ErrorTooltip
          component={
            <Button
              sx={{ minWidth: 'auto' }}
              disabled={!isPublishButtonEnabled || prelemEditState}
              onClick={handlePublishClick}
            >
              <NearMeOutlined />
            </Button>
          }
          doAccess={!canAccessAction(CATEGORY_PAGE, '', 'publish')}
        /> */}
        <Box sx={{ marginLeft: "12px" }}>
          <Submit
            category={CATEGORY_PAGE}
            subCategory={""}
            handlePublish={handlePublishClick}
            handleSave={handleSaveClick}
            workflow={workflow}
            prelemEditState={prelemEditState}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderMobile;
