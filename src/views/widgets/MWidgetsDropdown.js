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
import intToCurrencey from "../../utils/intToCurrency";
import { thunks } from "../../store/index";


const MWidgetsDropdown = ({ completedOrderData, completedBookingData }) => {
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(false); //todo:use if needed

  const [totCompOrdersWidget, setTotCompOrdersWidget] = useState("monthly");
  const [totCompBookingsWidget, setTotCompBookingsWidget] = useState("monthly");
  const [totCompOrdersRevWidget, setTotCompOrdersRevWidget] = useState("monthly");
  const [totCompBookingsRevWidget, setTotCompBookingsRevWidget] = useState("monthly");





  // render
  return (
    <CRow >
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="widgetColor1"
          color="gradient-warning"
          header={totCompOrdersWidget === "monthly" ? completedOrderData.monthly : totCompOrdersWidget === "daily" ? completedOrderData.daily : "N/A"}
          text={"Orders Completed " + humanize(totCompOrdersWidget)}
          footerSlot={
            <ChartBarSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={totCompOrdersWidget === "monthly" ? completedOrderData.monthlyDataSet : totCompOrdersWidget === "daily" ? completedOrderData.dailyDataSet : []}
              pointHoverBackgroundColor="warning"
              backgroundColor="rgb(250, 220, 130)"
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
          color="gradient-danger"
          header={totCompBookingsWidget === "monthly" ? completedBookingData.monthly : totCompBookingsWidget === "daily" ? completedBookingData.daily : "N/A"}
          text={"Bookings Completed " + humanize(totCompBookingsWidget)}
          footerSlot={
            <ChartBarSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={totCompBookingsWidget === "monthly" ? completedBookingData.monthlyDataSet : totCompBookingsWidget === "daily" ? completedBookingData.dailyDataSet : []}
              pointHoverBackgroundColor="danger"
              backgroundColor="rgb(250, 152, 152)"
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
          header={"Rs. " + (totCompOrdersRevWidget === "monthly" ? intToCurrencey(completedOrderData.monthlyRevenue) : totCompOrdersRevWidget === "daily" ? intToCurrencey(completedOrderData.dailyRevenue) : "N/A")}
          text={humanize(totCompOrdersRevWidget) + " Order Revenue"}
          footerSlot={
            <CIcon className="mt-3" style={{ height: '90px' }} size={'5xl'} name="cil-dollar" />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-settings" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                onClick={(e) => {
                  setTotCompOrdersRevWidget("daily");
                }}
              >
                Daily
              </CDropdownItem>
              <CDropdownItem
                onClick={(e) => {
                  setTotCompOrdersRevWidget("monthly");
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
          color="gradient-danger"
          header={"Rs. " + (totCompBookingsRevWidget === "monthly" ? intToCurrencey(completedBookingData.monthlyRevenue) : totCompBookingsRevWidget === "daily" ? intToCurrencey(completedBookingData.dailyRevenue) : "N/A")}
          text={humanize(totCompBookingsRevWidget) + " Booking Revenue"}
          footerSlot={
            <CIcon className="mt-3" style={{ height: '90px' }} size={'5xl'} name="cil-dollar" />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              {/* <CIcon name="cil-settings" /> */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                onClick={(e) => {
                  setTotCompBookingsRevWidget("daily");
                }}
              >
                Daily
              </CDropdownItem>
              <CDropdownItem
                onClick={(e) => {
                  setTotCompBookingsRevWidget("monthly");
                }}
              >
                Monthly
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default MWidgetsDropdown
