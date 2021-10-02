const RENav = [
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
    to: "/receptionist/check-availability",
    icon: "cil-home",
    accountType: "any",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Update Booking Status",
    to: "/receptionist/update-booking-status",
    icon: "cil-people",
    accountType: "Customer",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Room Categories",
    to: "/receptionist/view-room-categories",
    icon: "cil-people",
    accountType: "any",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Report a problem",
    to: "/receptionist/report-a-problem",
    icon: "cil-library",
    accountType: "any",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Other"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Settings",
    to: "/customer/settings",
    icon: "cil-settings",
    accountType: "any",
  },
];

export default RENav;
