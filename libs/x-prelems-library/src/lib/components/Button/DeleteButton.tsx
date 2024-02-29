import React from "react";
import { Button } from "@mui/material";
import "./Button.css";
import Delete from "../../assets/svgIcon/Delete.svg";
import { useCustomStyle } from "./Button.style";
import Image from "next/image";

const DeleteButton = () => {
  const classes = useCustomStyle();
  return (
    <Button
      variant='whitebutton'
      className={`ecom-delete-button-small ${classes.buttonwhite}`}
      startIcon={<Image src={Delete} alt='delete' />}></Button>
  );
};
export default DeleteButton;
