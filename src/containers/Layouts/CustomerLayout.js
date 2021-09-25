import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/style.scss";
import {
  CustomerContent,
  CustomerFooter,
  CustomerHeader,
  CustomerSidebar,
} from "../index"; //todo:add to index.js

const CustomerLayout = () => {
  return (
    <React.Fragment>
      <div className="c-app c-default-layout">
        <CustomerSidebar />
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

export default CustomerLayout;
