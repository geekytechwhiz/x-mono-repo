/* eslint-disable no-unused-vars */
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { contentTypeAPIs, pageApi } from "@platformx/authoring-apis";
import { Loader, SITE_PAGE, TaskNotFound, capitalizeFirstLetter } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStepperCount, lineBreak } from "../WorkflowStepper/Utils/helper";
import "./WorkflowStepper.css";

type WorkflowStepperProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  path: string;
  contentType: string;
};
const WorkflowStepper = ({ open, setOpen, path, contentType }: WorkflowStepperProps) => {
  const { t } = useTranslation();
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const getStages = async () => {
    try {
      if (contentType.toLowerCase() === SITE_PAGE.toLowerCase()) {
        const arr = path?.split("/");
        const response: any = await pageApi.getPageDetails({
          folder: arr[6],
          path: arr[10],
        });
        if (
          response?.authoring_getCmsItemByPath?.stages &&
          response?.authoring_getCmsItemByPath?.is_workflow_enabled
        ) {
          setStages(response?.authoring_getCmsItemByPath?.stages);
        }
      } else {
        const response: any = await contentTypeAPIs.fetchContent({
          contentType: capitalizeFirstLetter(contentType),
          path: path,
        });
        if (
          response?.authoring_getCmsContentByPath?.stages &&
          response?.authoring_getCmsContentByPath?.is_workflow_enabled
        ) {
          setStages(response.authoring_getCmsContentByPath.stages);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStages();
  }, []);

  return (
    <Dialog open={open} onClose={handleClickOpen} maxWidth='em' fullWidth={true}>
      <DialogTitle>
        {t("approval_status")}
        <IconButton
          onClick={handleClickOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className='stepperWrapper'>
        {isLoading && <Loader />}
        {stages.length === 0 && !isLoading ? (
          <Box sx={{ padding: "0px 20px 50px" }}>
            <TaskNotFound />
          </Box>
        ) : (
          <Stepper activeStep={getStepperCount(stages)} alternativeLabel className='stepperWrapper'>
            {stages.map((stage: any) => (
              <Step key={stage.label} className='stepperStep'>
                <StepLabel className='stepperStepLabel'>
                  {stage.state === "request_review"
                    ? lineBreak("Request", stage.user_name)
                    : stage.status === "Completed"
                      ? lineBreak(`${capitalizeFirstLetter(stage.role)} Approved`, stage.user_name)
                      : lineBreak(
                          `${capitalizeFirstLetter(stage.role)} ${stage.status}`,
                          stage.user_name,
                        )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowStepper;
