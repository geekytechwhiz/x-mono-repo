import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ChatView from "./chatView";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/material";

const styles: any = (theme: any) => {
  return {
    root: {
      margin: 0,
      padding: theme?.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme?.spacing(1),
      top: theme?.spacing(1),
      color: theme?.palette?.grey[500],
    },
  };
};

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle className={classes.root}>
      <Typography variant='h5' style={{ textAlign: "center", color: "black", fontWeight: "bold" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon fontSize='large' style={{ color: "black" }} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const ChatPopUp = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!open && (
        <Box
          data-testid='check-ChatPopUp-Box-id'
          className='float'
          onClick={handleClickOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <IconButton
            sx={{
              color: "white",
              width: "inherit",
              height: "inherit",
              borderRadius: "50%",
            }}>
            <SmartToyOutlinedIcon sx={{ width: "0.9em", height: "0.9em" }} fontSize='large' />
          </IconButton>
        </Box>
      )}
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
          fullScreen={true}
          fullWidth={true}
          PaperProps={{
            style: {
              height: "95%",
              width: "95%",
              maxWidth: "100%",
              margin: "auto",
              borderRadius: "10px",
            },
          }}>
          <DialogTitle
            id='customized-dialog-title'
            onClose={handleClose}
            style={{ textAlign: "center", color: "black" }}>
            Chatbot
          </DialogTitle>
          <DialogContent dividers>
            <ChatView />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default ChatPopUp;
