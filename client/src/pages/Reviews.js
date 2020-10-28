import React, { useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Paper,
  makeStyles,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import OnboardingContainer from "../components/LoginSignupContainer";
import { ReviewsData } from "../utils/Constants";
import Editor from "for-editor";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: "calc(100vh - 60px)",
    minWidth: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100px",
    },
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "auto",
  },
  contentBox: {
    minHeight: "calc(100vh - 60px - 2.5vh)",
    minWidth: "65%",
    [theme.breakpoints.down("sm")]: {
      top: "calc(2.5vh + 40px)",
      right: 0,
      width: "100%",
      minHeight: "calc(100vh - 100px - 2.5vh)",
    },
    backgroundColor: "white",
    position: "absolute",
    right: "2.5%",
    top: "2.5vh",
    overflow: "auto",
  },
  smScreenGridContainer: {
    paddingTop: "0.7rem",
  },
  smScreenGridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarHeader: {
    fontWeight: 700,
  },
  sidebarReviewsCount: {
    fontSize: "1.25rem",
    color: "#6E3ADB",
  },
  regScreenGridItem: {
    paddingTop: "3rem",
    margin: "0 auto",
    width: "70%",
  },
  regScreenGridReviewItem: {
    width: "70%",
    height: "7rem",
    margin: "3rem auto",
    border: "2px solid #DEE4EF",
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    cursor: "pointer",
  },
  focusedItem: {
    border: `2px solid ${theme.turquoise}`,
  },
  moreButon: {
    position: "absolute",
    right: 7,
    top: 0,
    color: "#DEE4EF",
    fontWeight: 900,
    fontSize: 20,
    cursor: "pointer",
  },
  title: {
    margin: "1.35rem 0 0.25rem 2rem",
    fontWeight: 900,
  },
  date: {
    marginLeft: "2rem",
    color: "#CDCDCD",
  },
}));

const ReviewsPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [reviews, setReviews] = useState(ReviewsData);
  const [selectedReview, setSelectedReview] = useState(
    reviews.length > 0 ? reviews[0] : null
  );
  const handleEditor = (e) => {
    const value = e;
    setSelectedReview((prev) => {
      return {
        ...prev,
        code: value,
      };
    });
  };

  return (
    <OnboardingContainer containerOnly>
      <Paper className={classes.sidebar}>
        {isScreenSmall ? (
          <>
            <Grid container className={classes.smScreenGridContainer}>
              <Grid item xs={6} className={classes.smScreenGridItem}>
                <Typography variant="h5" className={classes.sidebarHeader}>
                  Reviews{" "}
                  <span className={classes.sidebarReviewsCount}>
                    {" "}
                    ({reviews.length})
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.smScreenGridItem}>
                <TextField
                  select
                  value={reviews.title}
                  name="reviewTitle"
                  variant="outlined"
                  classes={{ input: classes.select }}
                  SelectProps={{
                    native: true,
                    style: {
                      fontSize: 18,
                      height: 40,
                      fontWeight: 700,
                    },
                  }}
                >
                  {reviews.map((review) => (
                    <option key={review.title} value={review.title}>
                      {review.title}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6} className={classes.regScreenGridItem}>
              <Typography variant="h5" className={classes.sidebarHeader}>
                Reviews{" "}
                <span className={classes.sidebarReviewsCount}>
                  {" "}
                  ({reviews.length})
                </span>
              </Typography>
            </Grid>
            {reviews.map((review, index) => {
              return (
                <Grid
                  key={review.title}
                  item
                  xs={6}
                  className={`${classes.regScreenGridReviewItem} ${
                    index === 0 && classes.focusedItem
                  }`}
                >
                  <span className={classes.moreButon}>...</span>
                  <Typography variant="h6" className={classes.title}>
                    {review.title}
                  </Typography>
                  <Typography className={classes.date}>
                    {review.submitted_date}
                  </Typography>
                </Grid>
              );
            })}
          </>
        )}
      </Paper>
      <Paper className={classes.contentBox}>
        <Typography variant="h4" className={classes.title}>
          {selectedReview.title}
        </Typography>
        <Typography variant="body1" className={classes.date}>
          {selectedReview.submitted_date}
        </Typography>
        <Editor
          value={selectedReview.code}
          toolbar={{
            lineNum: true,
          }}
          language="en"
          placeholder=" "
          height="250px"
          onChange={handleEditor}
          preview={true}
          style={{
            marginTop: "20px",
          }}
        />
      </Paper>
    </OnboardingContainer>
  );
};

export default ReviewsPage;
