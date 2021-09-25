import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import cardImage1 from "./../../../assets/img/auth.jpg";
import cardImage2 from "./../../../assets/img/auth.jpg";
import { Collapse } from "@material-ui/core";

const useStyles = makeStyles({
  mainRoot: {
    width: 400,
  },
  root: {
    maxWidth: 600,
    background: "rgba(0,0,0,0.5)",
    margin: "10px",
  },
  media: {
    height: 300,
  },
  title: {
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
  },
  desc: {
    fontFamily: "Ubuntu",
    fontSize: "1rem",
    color: "#ddd",
  },
});

export default function ImageCard({ card, checked }) {
  const classes = useStyles();
  console.log(checked);
  return (
    <div className={classes.mainRoot}>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
        collapsedHeight={10}
      >
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={card.image}
            title="Contemplative Reptile"
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              {card.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      </Collapse>
    </div>
  );
}
