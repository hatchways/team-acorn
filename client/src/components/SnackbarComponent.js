import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const SnackbarComponent = ({ open, message, error, setOpen }) => {
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const styles = {
    backgroundColor: error ? "#ef5350" : "#43DDC1",
    color: "#fff",
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <SnackbarContent style={styles} message={message} />
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
