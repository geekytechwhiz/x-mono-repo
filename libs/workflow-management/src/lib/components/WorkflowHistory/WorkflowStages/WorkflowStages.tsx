import { Box } from "@mui/material";
import Step from "@mui/material/Step";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CompletedIcon } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { getStepperCount } from "../../WorkflowStepper/Utils/helper";
import StepperLabel from "../StepperLabel/StepperLabel";
import { icons } from "../Utils/helper";
import { StyledConnector, StyledStepIcon, useStyles } from "./WorkflowStages.styles";
import { StepperProps, WorkflowStagesProps } from "./WorkflowStages.types";

function GetStepIcon(props: StepIconProps, role: any) {
  const { active, completed, className } = props;
  return (
    <StyledStepIcon ownerState={{ active, completed }} className={className}>
      {completed ? (
        <img src={CompletedIcon} alt={role.slice(0, 1)} />
      ) : (
        <img src={icons[String(role.toLowerCase())]} alt={role.slice(0, 1)} />
      )}
    </StyledStepIcon>
  );
}

export default function WorkflowStages({ stages }: WorkflowStagesProps) {
  const [steps, setSteps] = useState<StepperProps[]>([]);
  const theme = useTheme();
  const classes = useStyles();
  const ifTab = useMediaQuery(theme.breakpoints.up("sm"));

  const getBreakPoint = () => {
    return ifTab;
  };

  useEffect(() => {
    setSteps(stages || []);
  }, [stages]);

  return (
    <Box className={classes.container}>
      <Stepper
        alternativeLabel={getBreakPoint() ? true : false}
        activeStep={getStepperCount(steps)}
        connector={
          <StyledConnector
            sx={{
              top: "25px",
              left: "calc(-50% + 45px)",
              right: "calc(50% + 45px)",
              "& .Platform-x-StepConnector-line": { borderTopWidth: 4 },
            }}
          />
        }
        orientation={getBreakPoint() ? "horizontal" : "vertical"}>
        {steps.map((step, index) => (
          <Step key={step.role}>
            <StepLabel
              className={classes.labelContainer}
              StepIconComponent={(stepIconProps) => GetStepIcon(stepIconProps, step.state)}>
              <StepperLabel
                index={index + 1}
                role={step.role}
                status={step.status}
                user_name={step.user_name}
              />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
