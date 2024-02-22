import { Box, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { RootState } from "@platformx/authoring-state";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function MainMenuDialog({ open, setOpen, setSubMenuValue, setMenuId }) {
  const { navTreeArray } = useSelector((state: RootState) => state.menu);

  const [leftSideBarContent] = useState(navTreeArray);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        sx={{
          display: { sm: "none" },
          ".Platform-x-Dialog-paper": {
            boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
            borderRadius: "10px 10px 0 0",
            width: "100%",
            margin: 0,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle sx={{ marginLeft: "13px" }}>Select main menu item</DialogTitle>
        <Divider />
        {leftSideBarContent.map(
          (val, i) =>
            val.ParentId === "0" && (
              <Box
                key={val.Menu_Id}
                onClick={() => {
                  setSubMenuValue(val.Label);
                  setMenuId(val.Menu_Id);
                  handleClose();
                }}
                sx={{ display: "flex", marginLeft: "23px", p: "15px" }}>
                <Box sx={{ fontSize: "16px" }}>{val.Label}</Box>
              </Box>
            ),
        )}
      </Dialog>
    </div>
  );
}
