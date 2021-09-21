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
import React, { useEffect, useState,lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { thunks } from "../../store/index";
const MWidgetsDropdown = lazy(() => import('../widgets/MWidgetsDropdown.js'))

const MDashboard = (props) => {
  const dispatch = useDispatch();

  const [amountError, setAmountError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    // let res = await dispatch(thunks.order.getOrderCounts()); //sample only. tood:remove
    // if (res.status !== 200) {
    //   //setAmountError(true);
    //   toast.error(res.message);
    // }
    setLoading(false);
  }, []);


  useEffect(() => {
    return () => toast.dismiss();
    }, []);

  return (
    <React.Fragment>
      <CRow hidden={amountError} className="justify-content-center">
        <MWidgetsDropdown />
      </CRow>
    </React.Fragment>
  );
};

export default MDashboard;
