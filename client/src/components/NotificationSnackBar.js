import React from "react";
import { useHistory } from "react-router-dom";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const NotificationSnackBar = ({ open, message, error, setOpen, classes }) => {
  const history = useHistory();
  const theme = useTheme();
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const styles = {
    minWidth: 0,
    backgroundColor: "white",
    color: theme.darkPurple,
    fontWeight: "bold",
    minWidth: 0,
    cursor: "pointer",
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        classes={classes}
        onClick={() => {
          history.push("/reviwes");
        }}
      >
        <SnackbarContent message={message} style={styles} />
      </Snackbar>
    </div>
  );
};

export default NotificationSnackBar;