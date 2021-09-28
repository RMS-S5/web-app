import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import HomePage from "./home";
import "bootstrap/dist/css/bootstrap.css";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import {
  AppBar,
  Collapse,
  IconButton,
  Toolbar,
  Button,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import backgroundImage from "./../../../assets/img/auth.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minheight: "100vh",
    maxheight: "200vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  appbar: {
    background: "rgba(113, 113, 107, 0.5)",
    fontFamily: "Gluten",
  },
  appbarTitle: {
    flexGrow: "1",

    paddingTop: "1",
  },
  toolbar: {
    width: "80%",
    margin: "0 auto",
  },
  sortIcon: {
    color: "#fff",
    fontSize: "2rem",
    fontFamily: "Ubuntu",
  },
  colorText: {
    color: "#F2C94C",
  },
}));
const Home = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appbar} elevation={0}>
          <Toolbar className={classes.toolbar}>
            <h1 className={classes.appbarTitle}>
              <Link
                to={`/home`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                HR<span className={classes.colorText}>MS</span>
              </Link>
            </h1>

            {/* <IconButton>
            <SortIcon className={classes.sortIcon} />
          </IconButton> */}
            <div className={classes.sortIcon}>
              <Button
                className="m-2"
                variant="contained"
                // onClick={this.props.history.push("/login")}
              >
                <Link
                  to={`/home/register`}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Register
                </Link>
              </Button>

              <Button variant="contained">
                <Link
                  to={`/home/login`}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Link>
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route
            path="/home"
            exact
            name="Home Page"
            render={(props) => <HomePage {...props} />}
          />
          <Route
            path="/home/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            path="/home/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Home;
