import {
  CButton,
  CCol,
  CContainer,
  CFormGroup,
  CImg,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CardContainer from "../../components/common/CardContainer";
import { thunks } from "../../store";
import { getProfileData, getUserData } from "../../store/user/select";
import api, { BACK_END_URL } from "../../api/index";

const AVATAR_URL = BACK_END_URL.DEFAULT_FILE_URL;

const Profile = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const data = useSelector(getUserData);

  useEffect(async () => {
    setLoading(true);
    const res = dispatch(thunks.user.getUserDataById(data.userId));
    setLoading(false);
    // if (res && res.status !== 200) {
    //   //setError(true);
    //   toast.error(res.message);
    // }
  }, []);
  // const userdataApi = await api.user.get.customerById(data.userId);
  // console.log(userdataApi);
  useEffect(() => {
    return () => toast.dismiss();
  }, []);
  let passwordChange = "";
  let userAccountEdit = "";
  if (data.accountType === "Customer") {
    userAccountEdit = "/customer/profile-edit";
    passwordChange = "/customer/change-password";
  } else if (data.accountType === "Manager") {
    userAccountEdit = "/manager/profile-edit";
    passwordChange = "/manager/change-password";
  } else if (data.accountType === "Branch Manager") {
    userAccountEdit = "/branch-manager/profile-edit";
    passwordChange = "/branch-manager/change-password";
  } else if (data.accountType === "Receptionist") {
    userAccountEdit = "/receptionist/profile-edit";
    passwordChange = "/receptionist/change-password";
  }
  console.log(userAccountEdit, passwordChange);

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CardContainer error={error} loading={loading} header="My Profile">
            <CRow>
              <CCol xs="12" md="6">
                <div className="c-avatar-xl mb-4">
                  <CImg
                    // src={AVATAR_URL+data.image}
                    src="https://th.bing.com/th/id/R.3e9abd489c888df31a21e03346d91b8b?rik=%2bHHCzEqWYez2bA&pid=ImgRaw&r=0"
                    className="c-avatar-xl"
                    alt=""
                  />
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">First name</CLabel>
                  <CInput id="name" readOnly value={data.firstName} />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">Last name</CLabel>
                  <CInput id="name" readOnly value={data.lastName} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">Email</CLabel>
                  <CInput id="email" readOnly value={data.email} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">Account Type</CLabel>
                  <CInput id="userType" readOnly value={data.accountType} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="mobile">Mobile Number</CLabel>
                  <CInput id="mobile" readOnly value={data.mobileNumber} />
                </CFormGroup>
              </CCol>
            </CRow>

            <CContainer>
              <CRow>
                <CButton
                  color="primary"
                  className="mr-2 mb-1"
                  to={userAccountEdit}
                >
                  {" "}
                  {/*todo:add route */}
                  Edit
                </CButton>
                <CButton color="danger" to={passwordChange}>
                  {" "}
                  {/*todo:add route */}
                  Change Password
                </CButton>
              </CRow>
            </CContainer>
          </CardContainer>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Profile;
