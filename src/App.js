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


const MLayout = React.lazy(() => import("./containers/Layouts/MLayout"));

function App() {
  const dispatch = useDispatch();
  dispatch(thunks.user.checkToken());

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <ProtectedRoute
            isLoggedIn={false}
            path="/manager"
            name="Home"
            render={(props) => <MLayout {...props} />}
          />
          <Redirect from="/" to="/manager" />  {/*todo:update routes*/}
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
