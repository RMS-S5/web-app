import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Collapse,
  IconButton,
  Toolbar,
  Button,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import SimpleImageSlider from "react-simple-image-slider";
import image1 from "../../../assets/img/1.jpg";
import image3 from "../../../assets/img/3.jpg";
import image4 from "../../../assets/img/4.jpg";
import image5 from "../../../assets/img/5.jpg";
import image2 from "../../../assets/img/2.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  //   appbar: {
  //     background: "rgba(113, 113, 107, 0.5)",
  //     fontFamily: "Gluten",
  //   },
  //   appbarTitle: {
  //     flexGrow: "1",

  //     paddingTop: "1",
  //   },
  //   toolbar: {
  //     width: "80%",
  //     margin: "0 auto",
  //   },
  //   sortIcon: {
  //     color: "#fff",
  //     fontSize: "2rem",
  //     fontFamily: "Ubuntu",
  //   },
  //   colorText: {
  //     color: "#F2C94C",
  //   },
  title: {
    color: "#fff",
    fontFamily: "Ubuntu",
    fontSize: "3rem",
    fontWeight: "800",

    // position: "absolute",
    // width: "596px",
    // height: "222px",
    // left: "calc(50% - 596px/2 + 366px)",
    // top: "calc(50% - 222px/2 + 6px)",
  },
  container: {
    textAlign: "center",
  },
  colContainer: {
    marginLeft: "55%",
  },
  expand: {
    color: "#F2C94C",
    fontSize: "4rem",
  },
  slider: {
    marginLeft: "10px",
  },
  boarder: {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: 1,
    style: { width: "5rem", height: "5rem" },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  const images = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 },
    { url: image5 },
  ];
  return (
    <div className={classes.root} id="header">
      <div className={classes.slider}>
        <SimpleImageSlider
          width={"50%"}
          height={500}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div>
      <div className={classes.colContainer}>
        <Collapse
          in={checked}
          {...(checked ? { timeout: 3000 } : {})}
          collapsedHeight={10}
        >
          <div className={classes.container}>
            <h1 className={classes.title}>
              Welcome to the Au<span className={classes.colorText}>gora</span>{" "}
              Hotel & Restaurant
            </h1>

            <Scroll to="descrip-cards" smooth={true} offset={500}>
              <IconButton>
                <ExpandMoreIcon className={classes.expand} />
              </IconButton>
            </Scroll>
            <Button
              className="m-2"
              variant="contained"
              // onClick={this.props.history.push("/login")}
            >
              <Link
                to="/customer/check-availability"
                style={{
                  textDecoration: "none",
                  color: "Black",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Booking
              </Link>
            </Button>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
