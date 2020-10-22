import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import UploadCodeDialog from "../UploadCodeDialog";

import NavbarLink from "./NavbarLink";
import NavbarNotification from "./NavbarNotification";
import NavbarProfile from "./NavbarProfile";

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    backgroundColor: theme.darkPurple,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 60,
    padding: "0 20px",
  },
}));

const NavBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.navbarContainer}>
      <NavbarLink path={"/reviews"} text={"Reviews"} />
      <NavbarLink path={"/balance"} text={"Balance"} />
      <NavbarNotification />
      <UploadCodeDialog />
      <NavbarProfile />
    </div>
  );
};

export default NavBar;
