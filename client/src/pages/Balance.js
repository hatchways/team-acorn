import React, { useState, useContext } from "react";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import OnboardingContainer from "../components/LoginSignupContainer";
import useStyles from "../pages/LoginSignupStyles";
import Snackbar from "../components/SnackbarComponent";
import CheckoutForm from "../components/CheckoutForm";
import { UserContext } from "../context/userContext";

const stripePublicKey = process.env.REACT_APP_STRIPE_PK;

const BalancePage = () => {
  const { state: UserData } = useContext(UserContext);
  const classes = useStyles();
  const [balance, setBalance] = useState(UserData.balance);
  const [topup, setTopup] = useState(0);
  const [payScreen, setPayScreen] = useState(false); // state to switch UI from balance form to payment form
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    message: "",
  });

  const handleTopup = (option) => {
    if (option === "-") {
      if (topup === 0) setTopup(0);
      else setTopup((prev) => prev - 1);
    }
    if (option === "+") {
      setTopup((prev) => prev + 1);
    }
  };

  const handleCheckout = (e) => {
    // handle checkout here...
    if (topup === 0) {
      setSnackbar({
        open: true,
        message: "Please click + button to add credits before checkout",
        error: true,
      });
    } else {
      setPayScreen(true);
    }
  };

  const styles = {
    buttonsWrapper: {
      border: "2px solid #ECF0FA",
      minWidth: "9rem",
      height: "3rem",
      display: "flex",
      justifyContent: "center",
      margin: "auto",
      borderRadius: 15,
    },
    topupCounter: {
      fontWeight: 900,
      padding: "0.5rem",
      width: "3rem",
    },
    checkoutButton: {
      textTransform: "capitalize",
      fontSize: 16,
    },
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        setOpen={setSnackbar}
        error={snackbar.error}
      />
      <OnboardingContainer>
        {!payScreen ? (
          <Grid container direction="column">
            <Typography
              className={classes.mainHeading}
              variant="h4"
              align="center"
              display="block"
            >
              Your balance:
            </Typography>
            <Typography
              className={classes.balance}
              variant="h5"
              align="center"
              display="block"
            >
              {balance} credits
            </Typography>
            <Divider variant="fullWidth" classes={classes.divider} />
            <Typography
              className={classes.topup}
              variant="h6"
              align="center"
              display="block"
            >
              Top up:
            </Typography>
            <div style={styles.buttonsWrapper}>
              <div
                className={classes.topupButton}
                onClick={() => handleTopup("-")}
              >
                -
              </div>
              <Typography
                style={styles.topupCounter}
                variant="h6"
                align="center"
                display="block"
              >
                {topup}
              </Typography>
              <div
                className={classes.topupButton}
                onClick={() => handleTopup("+")}
              >
                +
              </div>
            </div>
            <Button
              variant="contained"
              className={classes.loginButton}
              style={styles.checkoutButton}
              onClick={handleCheckout}
              id="checkout-button"
              role="link"
            >
              Checkout
            </Button>
          </Grid>
        ) : (
          <Grid container direction="column">
            <CheckoutForm
              stripePublicKey={stripePublicKey}
              topup={topup}
              setBalance={setBalance}
            />
          </Grid>
        )}
      </OnboardingContainer>
    </>
  );
};

export default BalancePage;
