import CIcon from "@coreui/icons-react";
import Avatar from "react-avatar";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import React from "react";
import {
  getImage,
  getImageFromProfile,
  getUserData,
} from "../../store/user/select";
import { useSelector } from "react-redux";
import { BACK_END_URL } from "../../api/index";

const AVATAR_URL = BACK_END_URL.DEFAULT_FILE_URL;

const BMHeaderDropdown = () => {
  // const image_url1 = useSelector(getImage);
  // const image_url2 = useSelector(getImageFromProfile);
  //const userData = { name: "Nagitha" }//useSelector(getUserData); //todo:remove mock
  const userData = useSelector(getUserData);
  let image_url;
  // if(image_url1 != undefined) {
  //   image_url = image_url1;
  // }else{
  //   image_url = image_url2;
  // }
  image_url =
    "data:image/jpeg;base64,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";
  //"https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"; //todo:remove mock
  //todo: remove mock

  const handleLogout = () => {
    if (localStorage.getItem("hrms-access-token")) {
      localStorage.removeItem("hrms-access-token");
    }
    if (localStorage.getItem("hrms-refresh-token")) {
      localStorage.removeItem("hrms-refresh-token");
    }
    window.location = "/branch-manager/auth/login"; //todo: implement route
  };
  //console.log(AVATAR_URL+image_url);
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <Avatar
          color="#FF9030"
          name={"N A"}
          round
          size="50px"
          src={image_url}
          textSizeRatio={1}
        />
        <div className="ml-2 h7">{userData ? userData.email : ""}</div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>

        <CDropdownItem>
          <Avatar
            color="#FF9030"
            name={"N A"}
            round
            size="50px"
            src={image_url}
            textSizeRatio={1}
          />
        </CDropdownItem>

        <CDropdownItem to="/branch-manager/profile">
          {" "}
          {/*todo:update routes*/}
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default BMHeaderDropdown;
