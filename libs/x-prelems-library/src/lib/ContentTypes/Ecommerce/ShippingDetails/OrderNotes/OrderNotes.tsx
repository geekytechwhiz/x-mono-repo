import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import "./OrderNotes.css";
import StringTextBox from "../../../../components/TextBox/StringTextBoxComponent/StringOnChangeTextBox";

const EcomOrderNotes = () => {
  const { t } = useTranslation();
  return (
    <Box className='order-notes'>
      <Typography variant='h4bold'>{`${t("order_note")}(${t("optional")})`}</Typography>
      <StringTextBox
        name='city'
        label=''
        rows={3}
        multiline={true}
        cssClass='input-control-textbox'></StringTextBox>
    </Box>
  );
};

export default EcomOrderNotes;
