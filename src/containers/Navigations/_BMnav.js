import CIcon from "@coreui/icons-react";
import React from "react";



const _BMnav = [ //todo:prioritize each sidebar element based on uasge
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/branch-manager/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Staff Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Staff",
    to: "/branch-manager/staff/add-staff",
    icon: "cil-user",

  },
  {
    _tag: "CSidebarNavItem",
    name: "View Staff",
    to: "/branch-manager/staff/view-staffm",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Room Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Room",
    to: "/branch-manager/room/add-room",
    icon: "cilBed",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Rooms",
    to: "/branch-manager/room/view-rooms",
    icon: "cil-list",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Food Item Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Food Item",
    to: "/branch-manager/food-item/add-food-item",
    icon: "cilFastfood", 
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Food Items",
    to: "/branch-manager/food-item/view-food-items",
    icon: "cil-list",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Booking Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Bookings",
    to: "/branch-manager/booking/view-bookings",
    icon: "cil-list",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Table Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Table",
    to: "/branch-manager/table/add-table",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Tables",
    to: "/branch-manager/table/view-tables",
    icon: "cil-library",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Orders"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Orders",
    to: "/branch-manager/order/view-orders",
    icon: "cil-list",
  },
  
  
];

export default _BMnav;
