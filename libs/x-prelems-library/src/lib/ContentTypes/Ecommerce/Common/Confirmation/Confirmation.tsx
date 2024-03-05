import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import "./Confirmation.css";
import { useCustomStyle } from "./Confirmation.style";

type ConfirmationProps = {
  img?: string;
  text?: string;
  title?: string;
  open?: boolean;
  buttonOne?: string;
  buttonTwo?: string;
  handleClose?: () => void;
  buttonOneFunc?: () => void;
  buttonTwoFunc?: () => void;
};
export default function Confirmation(props: ConfirmationProps) {
  const {
    img = "",
    text = "",
    title = "",
    open = false,
    buttonOne = "",
    buttonTwo = "",
    handleClose = () => {},
    buttonOneFunc = () => {},
    buttonTwoFunc = () => {},
  } = props;

  const classes = useCustomStyle();
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className={`order-confirmation-wrapper ${classes.dialogWrapper} orderConfirmationPlaced`}>
      <Box className='modal-close'>
        <CloseIcon onClick={handleClose} className={`close-icon closeIcon`} />
      </Box>
      <Box className='closeWrapper'>
        <img src={img} alt='Delete Icon' width={120} />
      </Box>

      {title && (
        <Box className='dialogTitle' id='alert-dialog-title'>
          <Typography variant='h2medium'>{title}</Typography>
        </Box>
      )}

      {text && (
        <DialogContent className='dialogContent'>
          <Box className='dialogContentText' id='alert-dialog-description'>
            <Typography variant='p3regular'>{text}</Typography>
          </Box>
        </DialogContent>
      )}

      <Box style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} mt={2}>
            {buttonOne && (
              <Button variant='primaryButton2' onClick={buttonOneFunc}>
                {buttonOne}
              </Button>
            )}
            {buttonTwo && (
              <Button variant='primaryButton1' onClick={buttonTwoFunc}>
                {buttonTwo}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
