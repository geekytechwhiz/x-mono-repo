import { Box, Button } from "@mui/material";
import { ToolTip, WorkflowIcon } from "@platformx/utilities";
import { useTranslation } from "react-i18next";
import { useStyles } from "./WorkflowHistoryIcon.styles";

const WorkflowHistoryIcon = ({ workflow_status, enableWorkflowHistory }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <ToolTip
      className={classes.buttonWrapper}
      component={
        <Box
          className={classes.workflowIconContainer}
          onClick={
            workflow_status !== "draft"
              ? () => enableWorkflowHistory(true)
              : () => enableWorkflowHistory(false)
          }>
          <Button className='iconBtn'>
            <img
              src={WorkflowIcon}
              alt='history'
              className={
                workflow_status === "draft"
                  ? classes.workflowIconInactive
                  : classes.workflowIconActive
              }
            />
          </Button>
        </Box>
      }
      Title={workflow_status === "draft" ? t("no_workflow_history") : t("view_workflow_history")}
      position='bottom'
    />
  );
};

export default WorkflowHistoryIcon;
