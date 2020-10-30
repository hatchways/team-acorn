import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { UserContext } from "../../context/userContext";

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
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const { image } = userContext.state;
  const theme = useTheme();
  const classes = useStyles(theme);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    switch (option) {
      case "logout": {
        localStorage.removeItem("token");
        dispatch({ type: "logout" });
        setAnchorEl(null);
        break;
      }
      case "profile": {
        history.push("/profile");
      }
      default: {
        setAnchorEl(null);
        break;
      }
    }
  };

  return (
    <div className={classes.profileContainer}>
      <img src={image} className={classes.profileImage} alt="Profile Pic" />
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
        <MenuItem onClick={() => handleClose("profile")}>My Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default NavbarProfile;
