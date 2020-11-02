import React, { useState, useContext, useRef } from "react";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";

import useStyles from "./LoginSignupStyles";
import OnboardingContainer from "../components/OnboardingContainer";
import { UserContext } from "../context/userContext";
import ExperiencePicker from "../components/ExperiencePicker";

const OnboardingExperience = () => {
  const userExpPickerRef = useRef();

  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
  const userContext = useContext(UserContext);
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
          <ExperiencePicker ref={userExpPickerRef} />
          <Button
            variant="contained"
            className={classes.loginButton}
            type="submit"
            onClick={() => {
              userExpPickerRef.current.uploadExperience();
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
