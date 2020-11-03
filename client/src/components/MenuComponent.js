import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const reviewStatus = 1;
  // eslint-disable-next-line
  const [status, setStatus] = React.useState(null);

  let menuOption;

  if (reviewStatus === 1) {
    menuOption = "Accept Review";
  } else if (reviewStatus === 2) {
    menuOption = "Reject Review";
  } else if (reviewStatus === 3) {
    menuOption = "Close Review";
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        ...
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{menuOption}</MenuItem>
      </Menu>
    </div>
  );
}
