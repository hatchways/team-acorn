import React, { useState, useEffect, useContext } from "react";
import {
  useTheme,
  useMediaQuery,
  Paper,
  makeStyles,
  Typography,
  TextField,
  Grid,
  Divider,
  Avatar,
} from "@material-ui/core";
import OnboardingContainer from "../components/LoginSignupContainer";
import CollapsibleSideMenu from "../components/CollapsibleSideMenu";
import Editor from "for-editor";
import MessageComponent from "../components/MessageComponent";
import { UserContext } from "../context/userContext";
import ResponseButtons from "../components/ResponseButtons";
import { socket } from "../utils/SocketConfig";
import { Link } from "react-router-dom";

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
  msgAvatar: {
    width: "5rem",
    height: "5rem",
    margin: "1rem",
  },
  msgUserContainer: {
    display: "flex",
  },
  msgName: {
    textTransform: "capitalize",
    fontSize: 18,
    marginTop: "2rem",
    marginBottom: "-0.1rem",
  },
  msgDesignation: {
    textTransform: "capitalize",
    fontSize: 15,
  },
  msgContent: {
    margin: "1.5rem 0 3rem 0",
    width: "100%",
  },
  msgDate: {
    fontSize: 10,
    width: "100%",
    color: "grey",
  },
  msgTime: {
    fontSize: 10,
    width: "100%",
    color: "grey",
  },
  msgUserName: {
    width: "100%",
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
    messageUpdate,
  } = state;
  const [selectedReview, setSelectedReview] = useState({
    title: "",
    submitted_date: "",
    code: "",
    messages: [],
  });
  const [value, setValue] = useState(""); // for message editor
  const handleEditor = (e) => {
    const value = e;
    setSelectedReview((prev) => {
      return {
        ...prev,
        code: value,
      };
    });
  };

  const fetchReview = (e, id = "") => {
    const review_id = id ? id : e.target.id;
    if (!id) setValue("");
    fetch("/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ review_id: review_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // handle error if we receive error from server
          alert(data.error);
        } else {
          setSelectedReview((prev) => {
            return { ...prev, ...data["review"] };
          });
        }
      })
      .catch((err) => console.log(err));
  };

  socket.on(selectedReview.review_id, ({ message_id }) => {
    dispatch({
      type: "messageUpdate",
      payload: message_id,
    });
  });

  useEffect(() => {
    if (selectedReview.review_id) {
      const e = new Event("event");
      fetchReview(e, selectedReview.review_id);
    } else if (my_reviews.length > 0 || my_requests.length > 0) {
      const e = new Event("event");
      fetchReview(
        e,
        my_requests.length !== 0
          ? my_requests[0].review_id
          : my_reviews.length !== 0 && my_reviews[0].review_id
      );
    }
    // eslint-disable-next-line
  }, [messageUpdate, my_requests, my_reviews]);

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
          // handle error if we receive error from server
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
                    ({my_requests.length})
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.smScreenGridItem}>
                <TextField
                  select
                  value={my_requests.title}
                  name="reviewTitle"
                  variant="outlined"
                  classes={{ input: classes.select }}
                  onChange={fetchReview}
                  SelectProps={{
                    native: true,
                    style: {
                      fontSize: 18,
                      height: 40,
                      fontWeight: 700,
                    },
                  }}
                >
                  {[...my_requests].map((review) => (
                    <option
                      id={review.review_id}
                      key={review.review_id}
                      value={review.title}
                    >
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
                        selectedReview.review_id === review.review_id &&
                        classes.focusedItem
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
              defaultExpanded={true}
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
                        selectedReview.review_id === review.review_id &&
                        classes.focusedItem
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
          {selectedReview.title || ""}
        </Typography>
        <Typography variant="body1" className={classes.date}>
          {selectedReview.submitted_date || ""}
        </Typography>
        {selectedReview.status === "assigned" &&
          selectedReview.reviewer.id === state.userId && (
            <ResponseButtons
              dispatch={dispatch}
              fn={setSelectedReview}
              review_id={selectedReview.review_id}
            />
          )}

        <Divider className={classes.divider} />
        <Editor
          value={selectedReview.code || ""}
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
            marginBottom: "1rem",
          }}
        />

        {[...selectedReview.messages].map((message) => {
          const sender =
            selectedReview.reviewee.id === message.owner_id
              ? "reviewee"
              : "reviewer";
          return (
            <div key={message.message_id} style={{ position: "relative" }}>
              <Grid container direction="column">
                <div className={classes.msgUserContainer}>
                  <Link to={`/profile/${message.owner_id}`}>
                    <Avatar
                      className={classes.msgAvatar}
                      alt="Profile"
                      src={selectedReview[`${sender}`].dp}
                    />
                  </Link>
                  <div className={classes.msgUserName}>
                    <h4 className={classes.msgName}>
                      <Link to={`/profile/${message.owner_id}`}>
                        {selectedReview[`${sender}`].full_name}
                      </Link>
                    </h4>
                    <span className={classes.msgDesignation}>
                      {selectedReview[`${sender}`].designation}
                    </span>
                    <div className={classes.msgContent}>
                      <Editor
                        value={message.content}
                        toolbar={{
                          lineNum: true,
                        }}
                        language="en"
                        placeholder=" "
                        height="100px"
                        onChange={handleEditor}
                        preview={true}
                        style={{
                          border: "none",
                          marginBottom: "1rem",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ position: "absolute", right: 0, bottom: 0 }}
                  className={classes.msgTimestamp}
                >
                  <span className={classes.msgDate}>
                    {new Date(message.timestamp).toDateString()}
                  </span>
                  <br />
                  <span className={classes.msgTime}>
                    {new Date(message.timestamp).toLocaleTimeString("en-US")}
                  </span>
                </div>
              </Grid>
              <Divider />
            </div>
          );
        })}
        {selectedReview.status === "in_review" && (
          <MessageComponent
            value={value}
            setValue={setValue}
            review_id={selectedReview.review_id}
          />
        )}
      </Paper>
    </OnboardingContainer>
  );
};

export default ReviewsPage;
