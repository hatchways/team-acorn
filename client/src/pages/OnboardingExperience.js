import React, { useState, useContext } from "react";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import Snackbar from "../components/SnackbarComponent";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./LoginSignupStyles";
import { UserContext } from "../context/userContext";
import OnboardingContainer from "../components/OnboardingContainer";
import ExperienceRow from "../components/ExperienceRow";
import { languages } from "../utils/Constants";

// Signup experience level dropdown options
const experienceOptions = {
  Beginner: 0,
  Junior: 1,
  Intermediate: 2,
  Senior: 3,
};
const experienceLabelList = Object.keys(experienceOptions);

const uploadUserExperience = (experiences, dispatch) => {
  let outObj = {};
  Object.keys(experiences).forEach((lang) => {
    const exp = experiences[lang];
    if (exp != null) outObj[lang] = experienceOptions[exp];
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
          payload: outObj,
        });
        // Redirect user to Home page..
        // history.push("/onboard");
      }
    })
    .catch((err) => console.log(err));
};
const OnboardingExperience = () => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: "",
  });
  const [rows, setRows] = useState(() => {
    let tempObj = {};
    languages.forEach((lang) => {
      tempObj[lang] = null;
    });
    return tempObj;
  });
  const experience = experienceLabelList[0];
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const upadateRow = (rowObj) => {
    setRows({ ...rows, ...rowObj });
  };
  const isExperienceEmpty = (rows) => {
    let isEmpty = true;
    for (var key in rows) {
      const value = rows[key];
      if (value) {
        isEmpty = false;
        break;
      }
    }
    return isEmpty;
  };
  return (
    <>
      <OnboardingContainer>
        <Grid container direction="column">
          <Typography
            className={classes.mainHeading}
            variant="h4"
            align="center"
            display="block"
          >
            Your experience:
          </Typography>
          {Object.keys(rows).map((languageRow) => {
            if (rows[languageRow] != null) {
              return (
                <ExperienceRow
                  key={languageRow}
                  language={languageRow}
                  experience={rows[languageRow]}
                  experienceOptions={experienceLabelList}
                  upadateRow={upadateRow}
                  deleteRow={() => {
                    languages.push(languageRow);
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
          {languages.length !== 0 && (
            <IconButton
              disableRipple
              classes={{ root: classes.buttonAddRoot }}
              onClick={() => {
                let currentLang = languages.splice(0, 1);
                let temp = {};
                temp[currentLang] = experience;
                setRows({ ...rows, ...temp });
              }}
            >
              <AddIcon className={classes.buttonAddIcon} />
              <Typography className={classes.addButtonText}>
                Add Language
              </Typography>
            </IconButton>
          )}
          <Button
            variant="contained"
            className={classes.loginButton}
            type="submit"
            onClick={() => {
              if (!isExperienceEmpty(rows)) {
                uploadUserExperience(rows, dispatch);
              } else {
                setSnackbar({
                  open: true,
                  error: true,
                  message: "Please add at least one language.",
                });
              }
            }}
          >
            Get Started
          </Button>
        </Grid>
      </OnboardingContainer>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        setOpen={setSnackbar}
        error={snackbar.error}
      />
    </>
  );
};

export default OnboardingExperience;
