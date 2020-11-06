import React, { useState } from "react";
import { UserContext } from "../context/userContext";
import {
  makeStyles,
  Button,
  Typography,
  CircularProgress,
  Backdrop,
  useTheme,
  Paper,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 2,
  },
  paperConainer: {
    padding: "5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  rateContainer: {
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
    height: "90%",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  star: {
    margin: 10,
    fontSize: 30,
    color: theme.darkPurple,
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    width: "80%",
  },
  buttonText: {
    color: theme.darkPurple,
  },
}));

const submitRating = (reviewerId, rating, dispatch, callback) => {
  fetch("/submit_rating", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      reviewerId: reviewerId,
      rating: rating,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.rating) {
        // dispatch({ type: "updateProfileImage", payload: data.img });
        // callback();
      } else {
      }
    })
    .catch((er) => console.log(er));
};

const RatingPicker = ({ open, onCancel, reviewerId, onSubmit, dispatch }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedRating, setSelectedRating] = useState(1);

  return (
    <Backdrop className={classes.container} open={open}>
      <Paper className={classes.paperConainer}>
        <Typography className={classes.title}>
          Please rate the reviewer
        </Typography>
        <div className={classes.rateContainer}>
          {[1, 2, 3, 4, 5].map((i) => {
            if (i <= selectedRating) {
              return (
                <StarIcon
                  className={classes.star}
                  onClick={() => {
                    setSelectedRating(i);
                  }}
                />
              );
            }
            return (
              <StarBorderIcon
                className={classes.star}
                onClick={() => {
                  setSelectedRating(i);
                }}
              />
            );
          })}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => {
              submitRating(reviewerId, selectedRating, dispatch, onSubmit);
            }}
          >
            <Typography className={classes.buttonText}>Submit</Typography>
          </Button>
          <Button onClick={onCancel}>
            <Typography className={classes.buttonText}>Cancel</Typography>
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default RatingPicker;
