import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardGroup,
  CCol,
  CDataTable,
  CPopover,
  CRow,
  CWidgetProgressIcon,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import {
  CChartBar,
} from '@coreui/react-chartjs'
import React, { useEffect, useState, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { thunks } from "../../store/index";
import { getMonthlyCompletedOrders } from "../../store/order/select";
import { getMonthlyCompletedBookings } from "../../store/booking/select";
import { getAllBranches } from "../../store/staff/select";

const MWidgetsDropdown = lazy(() => import('../widgets/MWidgetsDropdown.js'))

const MDashboard = (props) => {
  const graphColors = ["#EF7512", "#F4A261"];

  const dispatch = useDispatch();
  const monthlyCompletedOrders = useSelector(getMonthlyCompletedOrders);
  const monthlyCompletedBookings = useSelector(getMonthlyCompletedBookings);
  const branches = useSelector(getAllBranches);

  const [amountError, setAmountError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ordersChartButtons, setOrdersChartButtons] = useState("Month");


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

    res = await dispatch(thunks.staff.getAllBranches());
    if (res.status !== 200) {
      toast.error(res.message);
    }
    setLoading(false);
  }, []);

  const makeGraphData = (monthlyCompletedData) => {
    const graphData = {
      today: 0,
      daily: 0,
      dailyRevenue: 0,
      monthly: 0,
      monthlyRevenue: 0,
      dailyDataSet: [0, 0, 0, 0, 0, 0],
      monthlyDataSet: [0, 0, 0, 0, 0, 0],
      dailyBranchDataSets: [],
      monthlyBranchDataSets: [],
      dailyDataSetLabels: [],
      monthlyDataSetLabels: [],
    };

    let branchIds = branches.map(element => element.id)

    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    let thisDate = today.getDate();
    graphData.today = today;

    let todayStart = new Date(thisYear, thisMonth, thisDate);
    let todayEnd = new Date(thisYear, thisMonth, thisDate, 23, 59, 59);

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

    let dailyDataSetLabels = [];
    let monthlyDataSetLabels = [];

    for (let i = 0; i < dSlots.length - 1; i++) {
      monthlyDataSetLabels.push(dSlots[i].getDate().toString() + "-" + dSlots[i + 1].getDate().toString());
    }

    for (let i = 0; i < tSlots.length - 1; i++) {
      dailyDataSetLabels.push(tSlots[i].getHours().toString() + ":" + tSlots[i].getMinutes().toString() + "-" + tSlots[i + 1].getHours().toString() + ":" + tSlots[i+1].getMinutes().toString());
    }
    // console.log("######");
    // console.log("tSlots:", tSlots);
    // console.log("######");
    // console.log("dSlots:", dSlots);
    let dailyBranchDataSets = []
    let monthlyBranchDataSets = []
    branchIds.map(element => dailyBranchDataSets[element] = [0, 0, 0, 0, 0, 0])
    branchIds.map(element => monthlyBranchDataSets[element] = [0, 0, 0, 0, 0, 0])



    monthlyCompletedData.forEach((element) => {
      let elementDate = new Date(element.placed_time);
      graphData.monthly = graphData.monthly + 1;
      graphData.monthlyRevenue = graphData.monthlyRevenue + parseInt(element.total_amount)
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
          graphData.monthlyDataSet[i] = graphData.monthlyDataSet[i] + 1;
          for (let j = 0; j < branchIds.length; j++) {
            if (element.branch_id === branchIds[j]) {
              monthlyBranchDataSets[branchIds[j]][i] += 1;
              break;
            }
          }
          break;
        }
      }

      if (elementDate.getDate() === thisDate) {
        graphData.daily = graphData.daily + 1;
        graphData.dailyRevenue = graphData.dailyRevenue + parseInt(element.total_amount)

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
            graphData.dailyDataSet[i] = graphData.dailyDataSet[i] + 1;
            for (let j = 0; j < branchIds.length; j++) {
              if (element.branch_id === branchIds[j]) {
                dailyBranchDataSets[branchIds[j]][i] += 1;
                break;
              }
            }
            break;
          }
        }
      }

    })
    graphData.monthlyDataSetLabels = monthlyDataSetLabels;
    graphData.dailyDataSetLabels = dailyDataSetLabels;
    graphData.monthlyBranchDataSets = monthlyBranchDataSets;
    graphData.dailyBranchDataSets = dailyBranchDataSets;
    // console.log("######");
    // console.log("monthlyDataSetLabels:", graphData.monthlyDataSetLabels);
    // console.log("######");
    // console.log("dailyDataSetLabels:", graphData.dailyDataSetLabels);
    // console.log("######");
    // console.log("counts:", counts);
    return graphData;
  };

  const completedOrderData = makeGraphData(monthlyCompletedOrders);
  const completedBookingData = makeGraphData(monthlyCompletedBookings);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <React.Fragment>
      <CRow hidden={amountError} className="justify-content-center">
        <MWidgetsDropdown completedOrderData={completedOrderData} completedBookingData={completedBookingData} />
      </CRow>
      <CCardGroup columns className="cols-2" >
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">Orders</h4>
                <div className="small text-muted">{ordersChartButtons === "Day" ? completedOrderData.today.getFullYear().toString() + " " + completedOrderData.today.toLocaleString('default', { month: 'long' }) + " " + completedOrderData.today.getDate().toString() : ordersChartButtons === "Month" ? completedOrderData.today.getFullYear().toString() + " " + completedOrderData.today.toLocaleString('default', { month: 'long' }) : ordersChartButtons === "Year" ? completedOrderData.today.getFullYear().toString() : ""}</div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButtonGroup className="float-right mr-3">
                  {
                    ['Day', 'Month', 'Year'].map(value => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === "Year" ? false : value === ordersChartButtons}
                        disabled={value === "Year" ? true : false}
                        onClick={(e) => {
                          value === "Year" ? false : setOrdersChartButtons(value);
                        }}
                      >
                        {value}
                      </CButton>
                    ))
                  }
                </CButtonGroup>
              </CCol>
            </CRow>

          </CCardHeader>
          <CCardBody>



            <CChartBar
              datasets={
                branches.map((value, index) => (
                  {
                    label: value.name,
                    backgroundColor: graphColors[index],
                    data: ordersChartButtons === "Day"? completedOrderData.dailyBranchDataSets[value.id]: ordersChartButtons === "Month"? completedOrderData.monthlyBranchDataSets[value.id]: ordersChartButtons === "Year"? []: []
                  }
                ))
              }
              // {[
              //   {
              //     label: 'GitHub Commits',
              //     backgroundColor: '#F4A261',
              //     data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              //   },
              //   {
              //     label: 'GitHub Commits',
              //     backgroundColor: '#F4A261',
              //     data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              //   }
              // ]}
              labels={ordersChartButtons === "Day"? completedOrderData.dailyDataSetLabels: ordersChartButtons === "Month"? completedOrderData.monthlyDataSetLabels: ordersChartButtons === "Year"? "": ""}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>
    </React.Fragment>
  );
};

export default MDashboard;
