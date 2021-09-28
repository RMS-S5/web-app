const _Customernav = [
  //todo:add account type to each item if needed
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Dashboard",
  //   to: "/customer/dashboard",
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Bookings"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "New Booking",
    to: "/customer/check-availability",
    icon: "cil-home",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Previous Bookings",
    to: "/customer/previous-bookings",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Room Categories",
    to: "/customer/view-room-categories",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["ChatBot Services"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ask Questions",
    to: "/customer/ask-questions",
    icon: "cil-library-add",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Report a problem",
    to: "/customer/report-a-problem",
    icon: "cil-library",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add a review",
    to: "/customer/add-a-review",
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

export default _Customernav;
