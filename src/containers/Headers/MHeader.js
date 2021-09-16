import {
  CBreadcrumbRouter,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CToggler,
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// routes config
import routes from "../../routes";
import { getSidebarShow, setSidebarShow } from "../../store/ui";
import { getUserData } from "../../store/user/select";
import { MHeaderDropdown } from "../index"; //todo:add to index.js

const MHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector(getSidebarShow);

  const userData = useSelector(getUserData);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(setSidebarShow({ sidebarShow: val }));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(setSidebarShow({ sidebarShow: val }));
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <img
          src={"/img/hrms-logo.png"}
          alt={"hrms logo"}
          style={{ width: "130px" }}
        />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

        {/*<CHeaderNav className="px-3">*/}
        {/*    Hy {(userData) ? userData.name : ''}*/}
        {/*</CHeaderNav>*/}

      <CHeaderNav className="px-3">
        {/* <MHeaderDropdown /> */}
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default MHeader;
