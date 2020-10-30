import React, { useEffect, useContext, useState } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import UploadCodeDialog from "../UploadCodeDialog";
import NavbarLink from "./NavbarLink";
import NavbarNotification from "./NavbarNotification";
import NavbarProfile from "./NavbarProfile";
import NotificationSnackBar from "../NotificationSnackBar";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const navBarHeight = 60;
const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    backgroundColor: theme.purple,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: navBarHeight,
    padding: "0 20px",
  },
  buttonRoot: {
    background: "transparent",
    height: 40,
    borderRadius: 50,
    border: 1,
    borderColor: theme.turquoise,
    borderStyle: "solid",
    margin: 25,
    padding: "0 15px",
  },
  buttonLabel: {
    ...theme.typography,
    textTransform: "capitalize",
    color: theme.turquoise,
  },
  anchorOriginTopRight: {
    justifyContent: "center",
    top: navBarHeight + 5,
  },
  logo: {
    display: "flex",
    marginRight: "auto",
    marginLeft: "1rem",
  },
}));

const NavBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { state } = useContext(UserContext);
  const { hasNewNotification } = state;

  const [snackbarNotification, setSnackbarNotification] = useState({
    open: hasNewNotification !== false,
    error: false,
    message: hasNewNotification.message,
  });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    code: "",
    language: "javascript",
  });

  useEffect(() => {
    setSnackbarNotification({
      open: hasNewNotification !== false,
      error: false,
      message: hasNewNotification.message,
    });
  }, [hasNewNotification]);

  useEffect(() => {
    if (open === true) {
      setForm({
        title: "",
        code: "",
        language: "javascript",
      });
    }
  }, [open]);

  return (
    <>
      <NotificationSnackBar
        open={snackbarNotification.open}
        message={hasNewNotification.message}
        setOpen={setSnackbarNotification}
        classes={{ anchorOriginTopRight: classes.anchorOriginTopRight }}
      />
      <div className={classes.navbarContainer}>
        <Link className={classes.logo} to="/">
          <img src="https://i.ibb.co/kQRn784/logo.png" alt="logo" height="40" />
        </Link>
        <NavbarLink path={"/reviews"} text={"Reviews"} />
        <NavbarLink path={"/balance"} text={"Balance"} />
        <NavbarNotification />
        <UploadCodeDialog
          form={form}
          setForm={setForm}
          open={open}
          setOpen={setOpen}
        />
        <NavbarProfile />
      </div>
    </>
  );
};

export default NavBar;
