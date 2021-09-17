import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPopover,
  CRow,
  CWidgetProgressIcon,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { thunks } from "../../store/index";

const Dashboard = (props) => {

  return (
    <React.Fragment>
        
        <img
          src={"/img/under-construction-2.jpg"}
          alt={"under construction"}
          className="h-16 bgimage"
        />
    </React.Fragment>
  );
};

export default Dashboard;
