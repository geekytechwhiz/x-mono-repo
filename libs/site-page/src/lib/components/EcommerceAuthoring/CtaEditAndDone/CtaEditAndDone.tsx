/* eslint-disable react/require-default-props */
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./CtaEditAndDone.css";

interface ICtaEditAndDone {
  cancelClick: any;
  doneClick: any;
  cancelStyle?: object;
  doneStyle?: object;
}

const CtaEditAndDone = ({
  cancelClick,
  doneClick,
  cancelStyle = {},
  doneStyle = {},
}: ICtaEditAndDone) => {
  const { t } = useTranslation();

  return (
    <Box justifyContent='end'>
      <Button style={cancelStyle} variant='secondaryButton' onClick={cancelClick}>
        {t("cancel")}
      </Button>
      <Button
        style={doneStyle}
        disabled={false}
        onClick={doneClick}
        variant='primaryButton'
        sx={{ marginLeft: "12px" }}>
        {t("done")}
      </Button>
    </Box>
  );
};

export default CtaEditAndDone;
