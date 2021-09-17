import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/index"))

/**
 * Staff Management Component
 */
 const CreateStaff = React.lazy(() =>
 import("./views/staff/addStaff"));
const StaffTable = React.lazy(() =>
 import("./views/staff/staffTable"));
const StaffView = React.lazy(() =>
 import("./views/staff/staffView"));

 /**
 * Room Type Management Component
 */
  const CreateRoomType = React.lazy(() =>
  import("./views/roomType/addRoomType"));
 const RoomTypeTable = React.lazy(() =>
  import("./views/roomType/roomTypeTable"));
 const RoomTypeView = React.lazy(() =>
  import("./views/roomType/roomTypeView"));




const routes = [

  /**
   * Manager routes
   */
  { path: "/manager/", exact: true, name: "Home" },
  {
    path: "/manager/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/manager/staff/add-staff",
    name: "Staff",
    component: CreateStaff,
  },
  {
    path: "/manager/staff/view-staffm",
    name: "Staff",
    component: StaffTable,
  },
  {
    path: "/manager/staff/update-staff/:user_id",
    name: "Staff",
    component: StaffView,
  },
  {
    path: "/manager/room-type/add-room-type",
    name: "room-type",
    component: CreateRoomType,
  },
  {
    path: "/manager/room-type/view-room-types",
    name: "room-type",
    component: RoomTypeTable,
  },
  {
    path: "/manager/room-type/update-room-type/:room_type",
    name: "room-type",
    component: RoomTypeView,
  },
];

export default routes;
