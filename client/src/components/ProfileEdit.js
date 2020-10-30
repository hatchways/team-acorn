import React, { useState, useContext } from "react";
import ImageUploader from "react-images-upload";
import {
  Typography,
  Backdrop,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: theme.zIndex.drawer + 2,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "white",
    boxShadow: "2px 2px 3px 0 rgba(0, 0, 0, 0.05)",
    margin: 20,
  },
  imgDrop: {
    marginLeft: 30,
  },
  uploadButton: {
    backgroundColor: theme.darkPurple,
  },
  editImgContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 30,
  },
  editImgText: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.darkPurple,
    cursor: "pointer",
  },
  backdrop: {
    zIndex: 0,
    color: "#fff",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 30,
    width: "80%",
  },
  buttonText: {
    color: theme.darkPurple,
  },
}));

const uploadImg = (img, userId, dispatch) => {
  img = img.split(",")[1];
  fetch("/user/profile_img", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      img: img,
      id: userId,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.img && !data.error) {
        dispatch({ type: "updateProfileImage", payload: data.img });
      } else {
      }
    })
    .catch((er) => console.log(er));
};

const updateName = (name, userId, dispatch) => {};

const ProfileEdit = ({ showEdit, setShowEdit }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userContext = useContext(UserContext);

  const { dispatch } = userContext;
  const { image, userId, experience, name } = userContext.state;
  const [nameText, setNameText] = useState(name);
  const [profileImg, setProfileImg] = useState(image);
  cons;
  //   let nameText = name;
  const onDrop = (_, base64) => {
    // uploadImg(base64[0], userId, dispatch);
    setProfileImg(base64[0]);
  };
  const handleNameChange = (e) => {
    setNameText(e.target.value);
  };
  return (
    <Backdrop className={classes.backdrop} open={showEdit}>
      <Paper className={classes.profileContainer}>
        <div className={classes.editImgContainer}>
          <img src={profileImg} className={classes.profileImage} />
          {/* <Typography className={classes.editImgText}>Change Image</Typography> */}
          <ImageUploader
            withIcon={true}
            buttonText="Choose image"
            onChange={onDrop}
            imgExtension={[".png"]}
            maxFileSize={5242880}
            singleImage={true}
            buttonStyles={{
              backgroundColor: theme.darkPurple,
              ...theme.typography,
            }}
          />
        </div>
        <TextField
          variant="outlined"
          value={nameText}
          onChange={handleNameChange}
          autoComplete="off"
          //   className={`${classes.textFieldStyling} ${classes.input}`}
          inputProps={{
            style: {
              height: 3,
              fontWeight: 700,
            },
          }}
        />
        <div className={classes.buttonContainer}>
          <Button>
            <Typography className={classes.buttonText}>Save</Typography>
          </Button>
          <Button
            onClick={() => {
              setShowEdit(false);
            }}
          >
            <Typography className={classes.buttonText}>Cancel</Typography>
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default ProfileEdit;
