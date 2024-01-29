import { Box, Button } from "@mui/material";
import { ToolTip, WorkflowTimerIcon } from "@platformx/utilities";
import { useStyles } from "./WorkflowHistoryIcon.styles";

const WorkflowHistoryIcon = ({ workflow_status, enableWorkflowHistory }) => {
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
              src={WorkflowTimerIcon}
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
      Title={workflow_status === "draft" ? "No Workflow history" : "View Workflow history"}
      position='bottom'
    />
  );
};

export default WorkflowHistoryIcon;
