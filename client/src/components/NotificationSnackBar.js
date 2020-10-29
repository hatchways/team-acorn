import React from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
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
          // In the future will redirect to a speific review id pdage
          history.push("/reviews");
        }}
      >
        <SnackbarContent message={message} style={styles} />
      </Snackbar>
    </div>
  );
};

export default NotificationSnackBar;
