import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import React, { forwardRef, useEffect } from "react";
import Styles from "./DialogContainerStyles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogContainer = ({
  openedDialog,
  handleCloseDialog = () => {},
  dialog,
}) => {
  console.log("DIALOG", dialog);
  const { title, text, isError } = dialog;

  return (
    <Dialog
      open={openedDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div style={Styles.dialogContainer}>
          <DialogContentText>{text}</DialogContentText>
          {!isError ? (
            <CheckCircleOutlineOutlinedIcon
              color="success"
              fontSize="large"
              sx={{ marginTop: 3 }}
            />
          ) : (
            <CancelOutlinedIcon
              color="error"
              fontSize="large"
              sx={{ marginTop: 2 }}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogContainer;
