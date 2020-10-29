import React, { useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Paper,
  makeStyles,
  Typography,
  TextField,
  Grid,
  Divider,
} from "@material-ui/core";
import OnboardingContainer from "../components/LoginSignupContainer";
import CollapsibleSideMenu from "../components/CollapsibleSideMenu";

import MenuComponent from "../components/MenuComponent";
import SendMessageComponent from "../components/SendMessageComponent";

import { ReviewsData } from "../utils/Constants";
import Editor from "for-editor";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: "calc(100vh - 60px)",
    width: "20%",
    minWidth: "325px",
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
    height: "calc(100vh - 60px - 2.5vh)",
    width: "75%",
    maxWidth: "calc(95% - 325px)",
    padding: "5px 50px",
    [theme.breakpoints.down("sm")]: {
      top: "calc(2.5vh + 40px)",
      right: 0,
      width: "100%",
      maxWidth: "100%",
      minHeight: "calc(100vh - 100px - 2.5vh)",
      padding: 5,
    },
    backgroundColor: "white",
    position: "absolute",
    right: "2.5%",
    top: "2.5vh",
    overflow: "auto",
    boxSizing: "border-box",
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
    width: "100%",
    height: "7rem",
    margin: "1rem",
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
    margin: "1.35rem 0 0.25rem 0",
    fontWeight: 900,
  },
  date: {
    color: "#CDCDCD",
  },
  sidebarItemTitle: {
    marginLeft: "1rem",
  },
  divider: {
    margin: "1rem 0",
  },
  forPreview: {
    border: "none",
    boxShadow: "none",
    marginBottom: -70,
  },
}));

const ReviewsPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  // eslint-disable-next-line
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
            <CollapsibleSideMenu
              defaultExpanded={true}
              summary={
                <Typography variant="h5" className={classes.sidebarHeader}>
                  Reviews{" "}
                  <span className={classes.sidebarReviewsCount}>
                    {" "}
                    ({reviews.length})
                  </span>
                </Typography>
              }
            >
              <Grid container={true} justify="flex-start">
                {reviews.map((review, index) => {
                  return (
                    <Grid
                      key={review.title}
                      className={`${classes.regScreenGridReviewItem} ${
                        index === 0 && classes.focusedItem
                      }`}
                    >
                      <span className={classes.moreButon}></span>
                      <Typography
                        variant="h6"
                        className={`${classes.title} ${classes.sidebarItemTitle}`}
                      >
                        {review.title}
                      </Typography>
                      <Typography
                        className={`${classes.date} ${classes.sidebarItemTitle}`}
                      >
                        {review.submitted_date}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </CollapsibleSideMenu>
            <CollapsibleSideMenu
              summary={
                <Typography variant="h5" className={classes.sidebarHeader}>
                  Reviewing{" "}
                  <span className={classes.sidebarReviewsCount}>
                    {" "}
                    ({reviews.length})
                  </span>
                </Typography>
              }
            >
              <Grid container={true} justify="flex-start">
                {reviews.map((review, index) => {
                  return (
                    <Grid
                      key={review.title}
                      className={`${classes.regScreenGridReviewItem} ${
                        index === 0 && classes.focusedItem
                      }`}
                    >
                      <span className={classes.moreButon}><MenuComponent></MenuComponent></span>
                      <Typography
                        variant="h6"
                        className={`${classes.title} ${classes.sidebarItemTitle}`}
                      >
                        {review.title}
                      </Typography>
                      <Typography
                        className={`${classes.date} ${classes.sidebarItemTitle}`}
                      >
                        {review.submitted_date}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </CollapsibleSideMenu>
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
        <Divider className={classes.divider} />
        <Editor
          value={selectedReview.code}
          toolbar={{
            lineNum: true,
          }}
          language="en"
          placeholder=" "
          height="300px"
          onChange={handleEditor}
          preview={true}
          style={{
            border: "none",
            boxShadow: "none",
            marginBottom: "1rem",
          }}
        />
        <SendMessageComponent></SendMessageComponent>


      </Paper>
    </OnboardingContainer>
  );
};

export default ReviewsPage;
