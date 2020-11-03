import React, {
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import SnackBar from "./SnackbarComponent";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../context/userContext";
import useStyles from "../pages/LoginSignupStyles";
import ExperienceRow from "./ExperienceRow";

// Signup experience level dropdown options

const experienceOptions = {
  Beginner: 0,
  Junior: 1,
  Intermediate: 2,
  Senior: 3,
};

const experienceLabelList = Object.keys(experienceOptions);
const uploadUserExperience = (experiences, dispatch) => {
  const outObj = {};
  Object.keys(experiences).forEach((lang) => {
    const exp = experiences[lang];
    if (exp !== null) outObj[lang] = experiences[lang];
  });
  fetch("/experience", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      experience: outObj,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // handle error if we recieve error from server
      } else {
        dispatch({
          type: "storeUserExperience",
          payload: experiences,
        });
      }
    })
    .catch((err) => console.log(err));
};

const ExperiencePicker = forwardRef((props, ref) => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: "",
  });

  const experience = experienceLabelList[0];
  const userContext = useContext(UserContext);
  const userExperience = userContext.state.experience;
  const [rows, setRows] = useState(userExperience);
  const { dispatch } = userContext;
  const availableLanguages = Object.keys(userExperience).filter((lang) => {
    return rows[lang] == null;
  });

  const upadateRow = (rowObj) => {
    setRows({ ...rows, ...rowObj });
  };
  const isExperienceEmpty = (rows) => {
    let isEmpty = true;
    for (let key in rows) {
      const value = rows[key];
      if (value) {
        isEmpty = false;
        break;
      }
    }
    return isEmpty;
  };

  const upload = () => {
    if (!isExperienceEmpty(rows)) {
      uploadUserExperience(rows, dispatch);
    } else {
      setSnackbar({
        open: true,
        error: true,
        message: "Please add at least one language.",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    uploadExperience() {
      upload();
    },
  }));

  return (
    <div className={classes.expPickerContainer}>
      {Object.keys(rows).map((languageRow) => {
        if (rows[languageRow] != null) {
          return (
            <ExperienceRow
              key={languageRow}
              language={languageRow}
              experience={rows[languageRow]}
              experienceOptions={experienceOptions}
              upadateRow={upadateRow}
              deleteRow={() => {
                availableLanguages.push(languageRow);
              }}
              languages={[
                languageRow,
                ...Object.keys(rows).filter((lang) => {
                  return rows[lang] == null;
                }),
              ]}
            />
          );
        }
        return null;
      })}
      {availableLanguages.length !== 0 && (
        <IconButton
          disableRipple
          classes={{ root: classes.buttonAddRoot }}
          onClick={() => {
            let currentLang = availableLanguages.splice(0, 1);
            let temp = {};
            temp[currentLang] = experienceOptions[experience];
            setRows({ ...rows, ...temp });
          }}
        >
          <AddIcon className={classes.buttonAddIcon} />
          <Typography className={classes.addButtonText}>
            Add Language
          </Typography>
        </IconButton>
      )}
      <SnackBar
        open={snackbar.open}
        message={snackbar.message}
        setOpen={setSnackbar}
        error={snackbar.error}
      />
    </div>
  );
});

export default ExperiencePicker;
