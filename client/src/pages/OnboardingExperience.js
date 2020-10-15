import React, { useState, useMemo } from "react";
import OnboardingContainer from "../components/OnboardingContainer";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import useStyles from "./LoginSignupStyles";

// Signup experience level dropdown options
const experienceOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Junior", label: "Junior" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Senior", label: "Senior" },
];

const OnboardingExperience = () => {
  const classes = useStyles(); // makeStyles MaterialUI hook from styles.js

  const [form, setForm] = useState({ experience: experienceOptions[0].value });

  const experience_list = useMemo(
    () =>
      experienceOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    []
  ); // memoization of options to save some computations on re-render

  const handleFormInput = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`experience: ${form.experience}`);
    return false;
    // Implement API call to send data to flask backend :: reminder
  };

  return (
    <>
      <OnboardingContainer>
        <form action="" onSubmit={handleLogin} method="POST" autoComplete="off">
          <Grid container direction="column">
            <Typography
              className={classes.mainHeading}
              variant="h4"
              align="center"
              display="block"
            >
              Your experience:
            </Typography>
            <TextField
              select
              value={form.experience}
              name="experience"
              onChange={handleFormInput}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              className={classes.input}
            >
              {experience_list}
            </TextField>
            <Button
              variant="contained"
              className={classes.loginButton}
              type="submit"
            >
              Get Started
            </Button>
          </Grid>
        </form>
      </OnboardingContainer>
    </>
  );
};

export default OnboardingExperience;
