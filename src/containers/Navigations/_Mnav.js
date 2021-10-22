import CIcon from "@coreui/icons-react";
import React from "react";

const _Mnav = [
  //todo:add account type to each item if needed
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
    _children: ["Category Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Category",
    to: "/manager/category/add-category",
    icon: "cil-burger",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Categories",
    to: "/manager/category/view-categories",
    icon: "cil-library",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Branch Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Branch",
    to: "/manager/branch/add-branch",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Branches",
    to: "/manager/branch/view-branches",
    icon: "cil-library",
  },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Other"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Settings",
  //   to: "/manager/settings",
  //   icon: "cil-settings",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Subscription",
  //   to: "/manager/subscription",
  //   icon: "cil-cart",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Orders"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Orders",
    to: "/manager/order/view-orders",
    icon: "cil-list",
  },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Manage Food Items"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Add Food Item",
  //   to: "/manager/food-item/add-food-item",
  //   icon: "cil-fast-food",

  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "View Food Items",
  //   to: "/manager/food-item/view-food-items",
  //   icon: "cil-people",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Customer Reports"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View Customer Reports",
    to: "/manager/customer-report/view-customer-reports",
    icon: "cil-warning",
  },
];

export default _Mnav;
