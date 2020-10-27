import React, { useEffect } from "react";
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
}));

const NavBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    code: "",
    language: "javascript",
  });

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
    <div className={classes.navbarContainer}>
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
  );
};

export default NavBar;
