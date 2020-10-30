import React, { useState, useEffect, useContext } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Typography, Backdrop } from "@material-ui/core";
import { UserContext } from "../context/userContext";
import ProfileEdit from "../components/ProfileEdit";
import EditIcon from "@material-ui/icons/Edit";
import images from "../images";

const PROFILE_IMG_URL =
  "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    paddingTop: 50,
    top: 0,
    left: 0,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    borderStyle: 1,
    backgroundColor: "#f6f0fa",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  profileContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  profileImage: {
    transform: "translateY(-50%)",
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "white",
    boxShadow: "10px 9px 48px -16px rgba(0,0,0,0.75);",
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
  },
  statsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderColor: "#f6f0fa",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    padding: "20px 0px",
    margin: "25px 0px",
  },
  statBlock: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  statNumber: {
    color: theme.darkPurple,
    fontSize: 30,
    fontWeight: "bold",
  },
  statName: {
    fontSize: 15,
  },
  projectsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  langContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  langImg: {
    position: "relative",
    width: "auto",
    height: 70,
  },
  langLvl: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 13,
  },
  editIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 30,
    height: 30,
    color: theme.darkPurple,
    cursor: "pointer",
  },
}));

const ProfilePage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const userContext = useContext(UserContext);
  const { dispatch } = userContext;
  const { image, userId, experience, name } = userContext.state;
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      {showEdit && (
        <ProfileEdit
          dispatch={dispatch}
          showEdit={true}
          setShowEdit={setShowEdit}
        />
      )}
      <div className={classes.container}>
        <div className={classes.profileContainer}>
          <EditIcon
            className={classes.editIcon}
            onClick={() => {
              setShowEdit(true);
            }}
          />
          <img src={image} className={classes.profileImage} />
          <Typography className={classes.profileName}>{name}</Typography>
          <Typography className={classes.title}>
            Senior Developer at Google
          </Typography>
          <div className={classes.statsContainer}>
            <Stat name={"years of experience"} number={5} classes={classes} />
            <Stat name={"reviews"} number={24} classes={classes} />
            <Stat name={"raiting"} number={0.8} classes={classes} />
          </div>
          <Typography className={classes.profileName}>Experience</Typography>
          <div className={classes.statsContainer}>
            {Object.keys(experience).map((name) => {
              return (
                <div className={classes.langContainer}>
                  <img className={classes.langImg} src={selectImg(name)} />
                  <Typography className={classes.langLvl}>
                    {selectLevel(experience[name])}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const Stat = ({ number, name, classes }) => {
  return (
    <div className={classes.statBlock}>
      <Typography className={classes.statNumber}>{number}</Typography>
      <Typography className={classes.statName}>{name}</Typography>
    </div>
  );
};

const selectImg = (name) => {
  switch (name) {
    case "javascript":
      return images.jsImg;
    case "c++":
      return images.cplusplusImg;
    case "csharp":
      return images.csharpImg;
    case "java":
      return images.javaImg;
    case "python":
      return images.pythonImg;
    case "c":
      return images.cImg;
  }
};

const selectLevel = (lvl) => {
  switch (lvl) {
    case 0:
      return "Beginner";
    case 1:
      return "Junior";
    case 2:
      return "Intermediate";
    case 3:
      return "Senior";
  }
};
export default ProfilePage;
