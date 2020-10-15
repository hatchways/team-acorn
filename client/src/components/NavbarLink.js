import React from "react";

import { NavLink } from "react-router-dom";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  navlinkButton: {
    "&:active": {
      textDecoration: "none",
    },
  },
  navlinkLabel: {
    color: "white",
    ...theme.typography,
    textTransform: "capitalize",
  },
  navlinkRoot: {
    margin: 20,
  },
}));
const NavbarLink = ({ path, text, children }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <NavLink exact to={path} class={classes.navlinkButton}>
      {children && children}
      {!children && (
        <Button
          disableRipple={true}
          classes={{
            root: classes.navlinkRoot,
            label: classes.navlinkLabel,
          }}
        >
          {text}
        </Button>
      )}
    </NavLink>
  );
};

export default NavbarLink;
