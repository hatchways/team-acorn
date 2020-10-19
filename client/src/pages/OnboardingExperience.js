import React, { useState, useMemo, useContext } from "react";
import { UserContext } from "../context/userContext";
import OnboardingContainer from "../components/OnboardingContainer";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import useStyles from "./LoginSignupStyles";

// Signup experience level dropdown options
const experienceOptions = [
  { value: 0, label: "Beginner" },
  { value: 1, label: "Junior" },
  { value: 2, label: "Intermediate" },
  { value: 3, label: "Senior" },
];

const uploadUserExperience = (experience, dispatch) => {
  fetch("/experience", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
    body: JSON.stringify({
      experience: experience,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // handle error if we recieve error from server
      } else {
        dispatch({
          type: "sotreUserExperience",
          payload: {
            javascript: experience,
          },
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
  const userContext = useContext(UserContext);
  const { dispatch } = userContext;

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
    uploadUserExperience(form.experience, dispatch);

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
