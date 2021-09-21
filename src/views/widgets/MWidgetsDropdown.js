import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

import humanize from "../../utils/humanize";
import { thunks } from "../../store/index";
import { getMonthlyCompletedOrders} from "../../store/order/select";
import { getMonthlyCompletedBookings } from "../../store/booking/select";

const MWidgetsDropdown = () => {
  const dispatch = useDispatch();
  const monthlyCompletedOrders = useSelector(getMonthlyCompletedOrders);
  const monthlyCompletedBookings = useSelector(getMonthlyCompletedBookings);

  const [loading, setLoading] = useState(false); //todo:use if needed

  const [totCompOrdersWidget, setTotCompOrdersWidget] = useState("monthly");
  const [totCompBookingsWidget, setTotCompBookingsWidget] = useState("monthly");


  const makeOrderCounts = () => {
    const counts = {
      daily: 0,
      monthly: 0,
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
      monthly: 0,
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

  useEffect(async () => {
    setLoading(true);
    let res = await dispatch(thunks.order.getMonthlyCompletedOrders()); 
    if (res.status !== 200) {
      toast.error(res.message);
    }

    res = await dispatch(thunks.booking.getMonthlyCompletedBookings()); 
    if (res.status !== 200) {
      toast.error(res.message);
    }
    setLoading(false);
  }, []);

  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="widgetColor1"
          color="gradient-primary"
          header={totCompOrdersWidget === "monthly" ? completedOrderCount.monthly : totCompOrdersWidget === "daily" ? completedOrderCount.daily : "N/A"}
          text={"Orders Completed " + humanize(totCompOrdersWidget)}
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={totCompOrdersWidget === "monthly" ? completedOrderCount.monthlyDataSet : totCompOrdersWidget === "daily" ? completedOrderCount.dailyDataSet : []}
              pointHoverBackgroundColor="primary"
              label="Orders"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-settings" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                onClick={(e) => {
                  setTotCompOrdersWidget("daily");
                }}
              >
                Daily
              </CDropdownItem>
              <CDropdownItem
                onClick={(e) => {
                  setTotCompOrdersWidget("monthly");
                }}
              >
                Monthly
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={totCompBookingsWidget === "monthly" ? completedBookingCount.monthly : totCompBookingsWidget === "daily" ? completedBookingCount.daily : "N/A"}
          text={"Bookings Completed " + humanize(totCompBookingsWidget)}
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={totCompBookingsWidget === "monthly" ? completedBookingCount.monthlyDataSet : totCompBookingsWidget === "daily" ? completedBookingCount.dailyDataSet : []}
              pointHoverBackgroundColor="info"
              // options={{ elements: { line: { tension: 0.00001 } } }}
              label="Bookings"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-location-pin" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                onClick={(e) => {
                  setTotCompBookingsWidget("daily");
                }}
              >
                Daily
              </CDropdownItem>
              <CDropdownItem
                onClick={(e) => {
                  setTotCompBookingsWidget("monthly");
                }}
              >
                Monthly
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="9.823"
          text="Members online"
          footerSlot={
            <CIcon className="mt-3" style={{ height: '90px' }} size={'5xl'} name="cil-dollar" />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Members online"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default MWidgetsDropdown
