import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/style.scss";
import { BMContent, BMFooter, BMHeader, BMSidebar } from "../index"; 

const BMLayout = () => {
  return (
    <React.Fragment>
      <div className="c-app c-default-layout">
        <BMSidebar />
        <div className="c-wrapper">
          <BMHeader />
          <div className="c-body">
            <BMContent />
          </div>
          <BMFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BMLayout;
