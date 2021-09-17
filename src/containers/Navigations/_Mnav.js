import CIcon from "@coreui/icons-react";
import React from "react";

const _Mnav = [ //todo:add account type to each item if needed
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/manager/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Staff Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Staff",
    color: "bg-success",
    to: "/manager/staff/add-staff",
    icon: "cil-user",

  },
  {
    _tag: "CSidebarNavItem",
    name: "View Staff",
    to: "/manager/staff/view-staffm",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Room Type Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Room Type",
    to: "/manager/room-type/add-room-type",
    icon: "cil-library-add",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Room Types",
    to: "/manager/room-type/view-room-types",
    icon: "cil-library",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Other"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Settings",
    to: "/manager/settings",
    icon: "cil-settings",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Subscription",
    to: "/manager/subscription",
    icon: "cil-cart",
  },
];

export default _Mnav;
