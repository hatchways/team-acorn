import React, { useState, useMemo, useContext } from "react";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./LoginSignupStyles";
import { UserContext } from "../context/userContext";
import OnboardingContainer from "../components/OnboardingContainer";
import ExperienceRow from "../components/ExperienceRow";

// Signup experience level dropdown options
const experienceOptions = {
  Beginner: 0,
  Junior: 1,
  Intermediate: 2,
  Senior: 3,
};
const experienceLabelList = Object.keys(experienceOptions);
let availableLanguages = ["JavaScript", "Java", "C++", "C#", "C", "Python"];

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
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      experience: experiences,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // handle error if we recieve error from server
      } else {
        dispatch({
          type: "sotreUserExperience",
          payload: experiences,
        });

        // Redirect user to Home page..
        // history.push("/onboard");
      }
    })
    .catch((err) => console.log(err));
  alert();
};
const OnboardingExperience = () => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const [rows, setRows] = useState(() => {
    let tempObj = {};
    availableLanguages.forEach((lang) => {
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
          {Object.keys(rows).map((languageRow, i) => {
            if (rows[languageRow] != null) {
              return (
                <ExperienceRow
                  key={i}
                  language={languageRow}
                  experience={rows[languageRow]}
                  experienceOptions={experienceLabelList}
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
          })}
          {availableLanguages.length != 0 && (
            <IconButton
              disableRipple
              classes={{ root: classes.buttonAddRoot }}
              onClick={() => {
                let currentLang = availableLanguages.splice(0, 1);
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
              console.log(isExperienceEmpty(rows));
              if (!isExperienceEmpty(rows)) {
                uploadUserExperience(rows, dispatch);
              } else {
                alert("Add at least one Language");
              }
            }}
          >
            Get Started
          </Button>
        </Grid>
      </OnboardingContainer>
    </>
  );
};

export default OnboardingExperience;
