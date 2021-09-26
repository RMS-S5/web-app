import React from "react";


const MDashboard = React.lazy(() => import("./views/dashboard/MDashboard"))
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

/**
 * Manager Profile Components
 */
const ManagerProfile = React.lazy(() =>
  import("./views/accountSettings/profile")
);


/**
* Order Management Component
*/
const OrderTable = React.lazy(() =>
  import("./views/order/orderTable"));

/**
* Customer Report Management Component
*/
const CustomerReportTable = React.lazy(() =>
  import("./views/customerReport/customerReportTable"));

/**
 * Room Management Component
 */
 const CreateRoom = React.lazy(() =>
 import("./views/room/addRoom"));
const RoomTable = React.lazy(() =>
 import("./views/room/roomTable"));
const RoomView = React.lazy(() =>
 import("./views/room/roomView"));

 /**
 * Food Item Management Component
 */
  const CreateFoodItem = React.lazy(() =>
  import("./views/foodItem/addFoodItem"));
 const FoodItemTable = React.lazy(() =>
  import("./views/foodItem/foodItemTable"));
 const FoodItemView = React.lazy(() =>
  import("./views/foodItem/foodItemView"));

/**
 * Booking Management Component
 */
const BookingTable = React.lazy(() =>
 import("./views/booking/bookingTable"));

const routes = [

  //Manager routes
  { path: "/manager/", exact: true, name: "Home" },
  {
    path: "/manager/dashboard",
    name: "Dashboard",
    component: MDashboard,
    accountType: "manager",
  },
  {
    path: "/manager/profile",
    name: "Profile",
    component: ManagerProfile,
    accountType: "manager",
  },
  {
    path: "/manager/staff/add-staff",
    name: "Staff",
    component: CreateStaff,
    accountType: "manager",
  },
  {
    path: "/manager/staff/view-staffm",
    name: "Staff",
    component: StaffTable,
    accountType: "manager",
  },
  {
    path: "/manager/staff/update-staff/:user_id",
    name: "Staff",
    component: StaffView,
    accountType: "manager",
  },
  {
    path: "/manager/room-type/add-room-type",
    name: "room-type",
    component: CreateRoomType,
    accountType: "manager",
  },
  {
    path: "/manager/room-type/view-room-types",
    name: "room-type",
    component: RoomTypeTable,
    accountType: "manager",
  },
  {
    path: "/manager/room-type/update-room-type/:room_type",
    name: "room-type",
    component: RoomTypeView,
    accountType: "manager",
  },
  {
    path: "/manager/order/view-orders",
    name: "order",
    component: OrderTable,
    accountType: "manager",
  },
  {
    path: "/manager/customer-report/view-customer-reports",
    name: "customer-report",
    component: CustomerReportTable,
    accountType: "manager",
  },

  //Branch manager routes
  { path: "/branch-manager/", exact: true, name: "Home" },
  {
    path: "/branch-manager/dashboard",
    name: "Dashboard",
    component: MDashboard,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/profile",
    name: "Profile",
    component: ManagerProfile,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/staff/add-staff",
    name: "Staff",
    component: CreateStaff,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/staff/view-staffm",
    name: "Staff",
    component: StaffTable,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/staff/update-staff/:user_id",
    name: "Staff",
    component: StaffView,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/room/add-room",
    name: "Room",
    component: CreateRoom,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/room/view-rooms",
    name: "Room",
    component: RoomTable,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/room/update-room/:room_number", //todo:clairfy URL parameter passing
    name: "Room",
    component: RoomView,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/food-item/add-food-item",
    name: "Food Item",
    component: CreateFoodItem,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/food-item/view-food-items",
    name: "Food Item",
    component: FoodItemTable,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/food-item/update-food-item/:id", //todo:clairfy URL parameter passing
    name: "Food Item",
    component: FoodItemView,
    accountType: "branch-manager",
  },
  {
    path: "/branch-manager/booking/view-bookings",
    name: "Booking",
    component: BookingTable,
    accountType: "branch-manager",
    
  },
  {
    path: "/branch-manager/order/view-orders",
    name: "order",
    component: OrderTable,
    accountType: "branch-manager",
  },
];

export default routes;
