import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/style.scss";
import { MContent, MFooter, MHeader, MSidebar } from "../index"; //todo:add to index.js

const MLayout = () => {
  return (
    <React.Fragment>
      <div className="c-app c-default-layout">
        <MSidebar />
        <div className="c-wrapper">
          <MHeader />
          <div className="c-body">
            <MContent />
          </div>
          <MFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MLayout;
