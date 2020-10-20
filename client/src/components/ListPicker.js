import React from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pickerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: 1,
    borderStyle: "solid",
    borderRadius: 20,
    borderColor: theme.purple,
    minHeight: 50,
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
  },
  pickerLabel: {
    ...theme.typography,
  },
  select: {
    border: 0,
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
}));
const ListPicker = ({ value, setValue, list, label }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.pickerContainer}>
      <InputLabel
        id="demo-controlled-open-select-label"
        className={classes.pickerLabel}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={value}
        onChange={handleChange}
        classes={{
          select: classes.select,
        }}
        disableUnderline
      >
        {list.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ListPicker;
