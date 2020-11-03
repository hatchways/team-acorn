import React, { useState, useEffect, useContext } from "react";
import {
  Button,
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
import { ReviewsData } from "../utils/Constants";
import Editor from "for-editor";
import MessageComponent from "../components/MessageComponent";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { UserContext } from "../context/userContext";

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
  responseButtonWrapper: {
    position: "absolute",
    top: 26,
    right: 45,
  },
  acceptButton: {
    backgroundColor: theme.turquoise,
    color: "#fff",
    borderRadius: 25,
    padding: "0.5rem 1rem",
    margin: "0 0.5rem",
  },
  rejectButton: {
    backgroundColor: theme.primary,
    color: "#fff",
    borderRadius: 25,
    padding: "0.5rem 1rem",
    margin: "0 0.5rem",
  },
}));

const ReviewsPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const {
    reviewee_reviews: my_requests,
    reviewer_reviews: my_reviews,
    update,
  } = state;
  console.log(my_requests);
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

  const fetchReview = (e) => {
    e.stopPropagation();
    const review_id = e.target.id;
    console.log(review_id);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    fetch("/reviewer_reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // handle error if we recieve error from server
          alert(data.error);
        } else {
          dispatch({
            type: "review",
            payload: data,
          });
        }
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [update]);

  const handleResponse = (e, option) => {
    const id = 3;
    fetch("/review_respond", {
      method: option === "accept" ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        review_id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // handle error if we recieve error from server
          alert(data.error);
        } else {
          setReviews(data);
        }
      })
      .catch((err) => console.log(err));
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
                    ({my_requests.length})
                  </span>
                </Typography>
              }
            >
              <Grid container={true} justify="flex-start">
                {[...my_requests].map((review, index) => {
                  return (
                    <Grid
                      key={review.review_id}
                      id={review.review_id}
                      onClick={fetchReview}
                      className={`${classes.regScreenGridReviewItem} ${
                        index === 0 && classes.focusedItem
                      }`}
                    >
                      <span id={review.review_id} className={classes.moreButon}>
                        ...
                      </span>
                      <Typography
                        variant="h6"
                        id={review.review_id}
                        className={`${classes.title} ${classes.sidebarItemTitle}`}
                      >
                        {review.title}
                      </Typography>
                      <Typography
                        id={review.review_id}
                        className={`${classes.date} ${classes.sidebarItemTitle}`}
                      >
                        {new Date(review.timestamp).toDateString()}
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
                    ({my_reviews.length})
                  </span>
                </Typography>
              }
            >
              <Grid container={true} justify="flex-start">
                {[...my_reviews].map((review, index) => {
                  return (
                    <Grid
                      key={review.review_id}
                      id={review.review_id}
                      onClick={fetchReview}
                      className={`${classes.regScreenGridReviewItem} ${
                        index === 0 && classes.focusedItem
                      }`}
                    >
                      <span id={review.review_id} className={classes.moreButon}>
                        ...
                      </span>
                      <Typography
                        variant="h6"
                        id={review.review_id}
                        className={`${classes.title} ${classes.sidebarItemTitle}`}
                      >
                        {review.title}
                      </Typography>
                      <Typography
                        id={review.review_id}
                        className={`${classes.date} ${classes.sidebarItemTitle}`}
                      >
                        {new Date(review.timestamp).toDateString()}
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

        <div className={classes.responseButtonWrapper}>
          {/* use state to only show this when review hasnt been accepted yet */}
          <Button
            variant="contained"
            className={classes.acceptButton}
            onClick={(e) => handleResponse(e, "accept")}
          >
            <CheckIcon />
            Accept
          </Button>
          <Button
            variant="contained"
            className={classes.rejectButton}
            onClick={(e) => handleResponse(e, "reject")}
          >
            <ClearIcon /> Reject
          </Button>
        </div>

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

        <MessageComponent />
      </Paper>
    </OnboardingContainer>
  );
};

export default ReviewsPage;
