import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { thunks } from "./store/index";

let path = require("path");
// require('dotenv').config({path: path.join(__dirname,'../.env')});

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// const Layout = React.lazy(() => import("./containers/Layout"));
const MLayout = React.lazy(() => import("./containers/Layouts/MLayout"));
const BMLayout = React.lazy(() => import("./containers/Layouts/BMLayout"));
// const Auth = React.lazy(() => import("./views/pages/auth"));
// const Layout = React.lazy(() => import("./containers/Layout"));
const CustomerLayout = React.lazy(() =>
  import("./containers/Layouts/CustomerLayout")
);
const Home = React.lazy(() => import("./views/pages/home"));

function App() {
  const dispatch = useDispatch();
  dispatch(thunks.user.checkToken());

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <div>404 Component</div>}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <div>500 Component</div>}
          />
          <Route
            path="/home"
            name="Home"
            render={(props) => <Home {...props} />}
          />

          <ProtectedRoute
            isLoggedIn={true}
            userType="Manager"
            path="/manager"
            name="Home"
            render={(props) => <MLayout {...props} />}
          />
          {/* <Redirect from="/" to="/manager" /> */}
          <ProtectedRoute
            isLoggedIn={true}
            userType="Branch Manager"
            path="/branch-manager"
            name="Home"
            render={(props) => <BMLayout {...props} />}
          />
          {/* <Redirect from="/" to="/branch-manager" /> */}

          <ProtectedRoute
            isLoggedIn={false}
            path="/customer"
            name="Home"
            render={(props) => <CustomerLayout {...props} />}
          />
          <Redirect from="/" to="/home" />
        </Switch>
      </React.Suspense>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
