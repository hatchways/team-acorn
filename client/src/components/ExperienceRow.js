import React from "react";
import { Typography, Button, Select, MenuItem } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";

import useStyles from "../pages/LoginSignupStyles";

const ExperienceRow = ({
  language,
  languages,
  experience,
  experienceOptions,
  upadateRow,
  deleteRow,
}) => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js

  return (
    <div className={classes.experienceRowContainer}>
      <Button classes={{ root: classes.buttonDeleteRoot }}>
        <RemoveIcon
          className={classes.buttonDeleteIcon}
          onClick={() => {
            const tempObj = {};
            tempObj[language] = null;
            upadateRow(tempObj);
            deleteRow();
          }}
        />
      </Button>
      <Typography
        variant="h6"
        classes={{
          h6: classes.experienceRowText,
        }}
      >
        Language:
      </Typography>
      <Select
        disableUnderline={true}
        value={language}
        onChange={(event) => {
          let tempObj = {};
          tempObj[event.target.value] = experience;
          tempObj[language] = null;
          upadateRow(tempObj);
        }}
        classes={{ root: classes.dropDown }}
      >
        {languages.map((lang) => {
          return (
            <MenuItem key={lang} value={lang} className={classes.dropDownText}>
              {lang === "cplusplus" ? "c++" : lang}
            </MenuItem>
          );
        })}
      </Select>
      <Typography
        variant="h6"
        classes={{
          h6: classes.experienceRowText,
        }}
      >
        Level:
      </Typography>
      <Select
        disableUnderline={true}
        value={experience}
        onChange={(event) => {
          let tempObj = {};
          tempObj[language] = event.target.value;
          upadateRow(tempObj);
        }}
        classes={{ root: classes.dropDown }}
      >
        {experienceOptions.map((lang) => {
          return (
            <MenuItem key={lang} value={lang} className={classes.dropDownText}>
              {lang}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default ExperienceRow;
