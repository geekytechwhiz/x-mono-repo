import { Button } from "@mui/material";
import Delete from "../../assets/svgIcon/Delete.svg";
import "./Button.css";
import { useCustomStyle } from "./Button.style";

const DeleteButton = () => {
  const classes = useCustomStyle();
  return (
    <Button
      variant='whitebutton'
      className={`ecom-delete-button-small ${classes.buttonwhite}`}
      startIcon={<img src={Delete} alt='delete' />}></Button>
  );
};
export default DeleteButton;
