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
import { getMonthlyCompletedOrders} from "../../store/order/select";
import { getMonthlyCompletedBookings } from "../../store/booking/select";

const MWidgetsDropdown = lazy(() => import('../widgets/MWidgetsDropdown.js'))

const MDashboard = (props) => {
  const dispatch = useDispatch();
  const monthlyCompletedOrders = useSelector(getMonthlyCompletedOrders);
  const monthlyCompletedBookings = useSelector(getMonthlyCompletedBookings);

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

  const makeOrderCounts = () => {
    const counts = {
      daily: 0,
      dailyRevenue: 0,
      monthly: 0,
      monthlyRevenue: 0,
      dailyDataSet: [0, 0, 0, 0, 0, 0],
      monthlyDataSet: [0, 0, 0, 0, 0, 0],
    };

    //todo: verify date object values
    let date = new Date();
    let thisYear = date.getFullYear();
    let thisMonth = date.getMonth();
    let today = date.getDate();

    let todayStart = new Date(thisYear, thisMonth, today);
    let todayEnd = new Date(thisYear, thisMonth, today, 23, 59, 59);

    let monthStart = new Date(thisYear, thisMonth);
    let monthEnd = new Date(thisYear, thisMonth + 1, 0, 23, 59, 59);

    let tSlots = [];
    let dSlots = [];

    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        tSlots.push(todayStart);
        dSlots.push(monthStart);
      }
      else if (i === 6) {
        tSlots.push(todayEnd);
        dSlots.push(monthEnd);
      }
      else {
        let tempDate1 = new Date(todayStart);
        tempDate1.setHours(tempDate1.getHours() + i * 4);
        tSlots.push(tempDate1);
        let tempDate2 = new Date(monthStart);
        tempDate2.setDate(tempDate2.getDate() + i * 5);
        dSlots.push(tempDate2);

      }
    }

    // console.log("######");
    // console.log("tSlots:", tSlots);
    // console.log("######");
    // console.log("dSlots:", dSlots);

    monthlyCompletedOrders.forEach((element) => {
      let elementDate = new Date(element.placed_time);
      counts.monthly = counts.monthly + 1;
      counts.monthlyRevenue = counts.monthlyRevenue + parseInt(element.total_amount)
      for (let i = 0; i < dSlots.length - 1; i++) {
        // console.log("######");
        // console.log("i:", i);
        // console.log("######");
        // console.log("dSlots[i].getTime():", dSlots[i]);
        // console.log("######");
        // console.log("elementDate.getTime():", elementDate);
        // console.log("######");
        // console.log("dSlots[i + 1].getTime():", dSlots[i + 1]);
        // console.log("######");
        // console.log("statement:", dSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < dSlots[i + 1].getTime());
        if (dSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < dSlots[i + 1].getTime()) {
          counts.monthlyDataSet[i] = counts.monthlyDataSet[i] + 1;
          break;
        }
      }

      if (elementDate.getDate() === today) {
        counts.daily = counts.daily + 1;
        counts.dailyRevenue = counts.dailyRevenue + parseInt(element.total_amount)

        for (let i = 0; i < tSlots.length - 1; i++) {
          // console.log("######");
          // console.log("i:", i);
          // console.log("######");
          // console.log("tSlots[i].getTime():", tSlots[i]);
          // console.log("######");
          // console.log("elementDate.getTime():", elementDate);
          // console.log("######");
          // console.log("tSlots[i + 1].getTime():", tSlots[i + 1]);
          // console.log("######");
          // console.log("statement:", tSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < tSlots[i + 1].getTime());
          if (tSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < tSlots[i + 1].getTime()) {
            counts.dailyDataSet[i] = counts.dailyDataSet[i] + 1;
            break;
          }
        }
      }

    })
    // console.log("######");
    // console.log("counts:", counts);
    return counts;
  };

  const makeBookingCounts = () => {
    const counts = {
      daily: 0,
      dailyRevenue: 0,
      monthly: 0,
      monthlyRevenue: 0,
      dailyDataSet: [0, 0, 0, 0, 0, 0],
      monthlyDataSet: [0, 0, 0, 0, 0, 0],
    };

    //todo: verify date object values
    let date = new Date();
    let thisYear = date.getFullYear();
    let thisMonth = date.getMonth();
    let today = date.getDate();

    let todayStart = new Date(thisYear, thisMonth, today);
    let todayEnd = new Date(thisYear, thisMonth, today, 23, 59, 59);

    let monthStart = new Date(thisYear, thisMonth);
    let monthEnd = new Date(thisYear, thisMonth + 1, 0, 23, 59, 59);

    let tSlots = [];
    let dSlots = [];

    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        tSlots.push(todayStart);
        dSlots.push(monthStart);
      }
      else if (i === 6) {
        tSlots.push(todayEnd);
        dSlots.push(monthEnd);
      }
      else {
        let tempDate1 = new Date(todayStart);
        tempDate1.setHours(tempDate1.getHours() + i * 4);
        tSlots.push(tempDate1);
        let tempDate2 = new Date(monthStart);
        tempDate2.setDate(tempDate2.getDate() + i * 5);
        dSlots.push(tempDate2);

      }
    }

    // console.log("######");
    // console.log("tSlots:", tSlots);
    // console.log("######");
    // console.log("dSlots:", dSlots);

    monthlyCompletedBookings.forEach((element) => {
      let elementDate = new Date(element.placed_time);
      counts.monthly = counts.monthly + 1;
      counts.monthlyRevenue = counts.monthlyRevenue + parseInt(element.total_amount)
      for (let i = 0; i < dSlots.length - 1; i++) {
        // console.log("######");
        // console.log("i:", i);
        // console.log("######");
        // console.log("dSlots[i].getTime():", dSlots[i]);
        // console.log("######");
        // console.log("elementDate.getTime():", elementDate);
        // console.log("######");
        // console.log("dSlots[i + 1].getTime():", dSlots[i + 1]);
        // console.log("######");
        // console.log("statement:", dSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < dSlots[i + 1].getTime());
        if (dSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < dSlots[i + 1].getTime()) {
          counts.monthlyDataSet[i] = counts.monthlyDataSet[i] + 1;
          break;
        }
      }

      if (elementDate.getDate() === today) {
        counts.daily = counts.daily + 1;
        counts.dailyRevenue = counts.dailyRevenue + parseInt(element.total_amount)

        for (let i = 0; i < tSlots.length - 1; i++) {
          // console.log("######");
          // console.log("i:", i);
          // console.log("######");
          // console.log("tSlots[i].getTime():", tSlots[i]);
          // console.log("######");
          // console.log("elementDate.getTime():", elementDate);
          // console.log("######");
          // console.log("tSlots[i + 1].getTime():", tSlots[i + 1]);
          // console.log("######");
          // console.log("statement:", tSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < tSlots[i + 1].getTime());
          if (tSlots[i].getTime() <= elementDate.getTime() && elementDate.getTime() < tSlots[i + 1].getTime()) {
            counts.dailyDataSet[i] = counts.dailyDataSet[i] + 1;
            break;
          }
        }
      }

    })
    // console.log("######");
    // console.log("counts:", counts);
    return counts;
  };

  const completedOrderCount = makeOrderCounts(); 
  const completedBookingCount = makeBookingCounts();

  useEffect(() => {
    return () => toast.dismiss();
    }, []);

  return (
    <React.Fragment>
      <CRow hidden={amountError} className="justify-content-center">
        <MWidgetsDropdown completedOrderCount={completedOrderCount} completedBookingCount={completedBookingCount}/>
      </CRow>
    </React.Fragment>
  );
};

export default MDashboard;
