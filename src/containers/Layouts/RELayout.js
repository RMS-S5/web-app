import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/style.scss";
import {
  CustomerContent,
  CustomerFooter,
  CustomerHeader,
  RESidebar,
} from "../index"; //todo:add to index.js

const RELayout = () => {
  return (
    <React.Fragment>
      <div className="c-app c-default-layout">
        <RESidebar />
        <div className="c-wrapper">
          <CustomerHeader />
          <div className="c-body">
            <CustomerContent />
          </div>
          <CustomerFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RELayout;
