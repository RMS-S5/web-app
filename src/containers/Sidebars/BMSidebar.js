import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarMinimizer,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSidebarShow, setSidebarShow } from "../../store/ui";
import { getAccountType } from "../../store/user/select";
// sidebar nav config
import navigation from "../Navigations/_BMnav";

const Sidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(getSidebarShow);
  const accountType = useSelector(getAccountType);
  

  let navItems = navigation.filter((item) => { //todo:clarify after login implementation
    if (item.accountType) {
      if (item.accountType.indexOf(accountType) !== -1) {
        delete item.accountType;
        return item;
      }
    } else {
      return item;
    }
  });

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(setSidebarShow({ sidebarShow: val }))}
    >
      <CSidebarBrand className="d-md-down-none" to="/my/dashboard">
        <img
          className="c-sidebar-brand-full"
          src={"/img/hrms-logo.png"}
          alt={"hrms logo"}
          style={{ width: "70px" }}
        />
        <p
          className="c-sidebar-brand-minimized"
          style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
        >
          <img
            className="c-sidebar-rest-full"
            src={"/img/icon-rest.jpg"}
            alt={"rest logo"}
            style={{ width: "30px" }}
        />
        </p>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navItems}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(Sidebar);
