import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { UserContext } from "../../App";

const PROFILE_IMG_URL =
  "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg";
const useStyles = makeStyles((theme) => ({
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
  },
  buttonLabel: {
    color: "white",
    ...theme.typography,
    textTransform: "capitalize",
  },
  profileImage: {
    borderRadius: 50,
    widht: 40,
    height: 40,
  },
}));

const NavbarProfile = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const context = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option === "logout") {
      localStorage.removeItem("token");
      context.setIsLogged(false);
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
    }
  };

  return (
    <div className={classes.profileContainer}>
      <img
        src={PROFILE_IMG_URL}
        className={classes.profileImage}
        alt="Profile Pic"
      />
      <Button
        onClick={handleClick}
        classes={{
          label: classes.buttonLabel,
        }}
      >
        Profile
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default NavbarProfile;
