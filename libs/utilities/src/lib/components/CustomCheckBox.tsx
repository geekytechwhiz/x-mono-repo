import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const BpIcon = styled("span")(() => ({
  borderRadius: 5,
  width: 24,
  height: 24,
  background: "#D9DBE9",
}));

const XCheckbox = (props: CheckboxProps) => {
  return <Checkbox icon={<BpIcon />} {...props} />;
};

export default XCheckbox;
