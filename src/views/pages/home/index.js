import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import "bootstrap/dist/css/bootstrap.css";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import backgroundImage from "./../../../assets/img/auth.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));
const Home = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
      </div>
      <Switch>
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
    </React.Fragment>
  );
};

export default Home;
