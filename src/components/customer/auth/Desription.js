import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";
import HomeCardData from "./HomeCardData";
import useWindowPosition from "./useWindowPosition";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    allignItems: "center",
    paddingTop: "100px",
  },
}));

export default function (params) {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="descrip-cards">
      <ImageCard card={HomeCardData[0]} checked={checked} />
      <ImageCard card={HomeCardData[1]} checked={checked} />
      <ImageCard card={HomeCardData[2]} checked={checked} />
    </div>
  );
}
