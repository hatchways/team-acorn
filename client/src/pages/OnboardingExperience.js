import React, { useRef } from "react";
import { Grid, Typography, Button } from "@material-ui/core";

import useStyles from "./LoginSignupStyles";
import OnboardingContainer from "../components/OnboardingContainer";
import ExperiencePicker from "../components/ExperiencePicker";

const OnboardingExperience = () => {
  const userExpPickerRef = useRef();

  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js
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
