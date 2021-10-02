import {
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CLabel,
  CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import { thunks } from "../../store/index";
import { getProfileData, getUserData } from "../../store/user/select";
import CIcon from "@coreui/icons-react";

class ProfileEdit extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
    },
    image: "",
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    firstName: Joi.string().label("first name"),
    lastName: Joi.string().label("last name"),
    mobileNumber: Joi.string().min(9).max(13).required().label("Mobile Number"),
  };

  async componentDidMount() {
    console.log(this.props);
    //dispatch the event to get the district and cities
    //set to the local states
    const res = await this.props.getUserDataById(this.props.userData.userId);
    console.log(res);
    if (res) {
      const temp = { ...res };
      const data = {
        firstName: temp.firstName,
        lastName: temp.lastName,
        mobileNumber: temp.mobileNumber,
      };
      this.setState({ data, loading: false });
    } else {
      this.setState({ loading: false, error: false });
      toast.error(res.message);
    }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CardContainer
              error={this.state.error}
              loading={this.state.loading}
              header="Edit Profile"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("firstName", "Name", "text", {
                      placeholder: "Enter Your Name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("lastName", "Name", "text", {
                      placeholder: "Enter Your Name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("mobileNumber", "Mobile Number", "text", {
                      placeholder: "Enter Your Mobile Number",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="userType">Account Type</CLabel>
                    <CInput
                      id="userType"
                      readOnly
                      value={this.props.userData.accountType}
                    />
                  </CCol>
                </CRow>
                {/* <CRow>
                  <CCol xs="12" md="6">
                    {this.renderImageInput("image", "Profile Picture", "file", {
                      placeholder: "Upload your profile picture",
                    })}
                  </CCol>
                </CRow> */}
                <CRow className="mt-3">
                  <CCol>{this.renderButton("Save", "success", "danger")}</CCol>
                </CRow>
              </CForm>
            </CardContainer>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  async callServer() {
    this.setState({ spinner: true });
    let filledData = {
      firstName: this.state.data.firstName,
      lastName: this.state.data.lastName,
      mobileNumber: this.state.data.mobileNumber,
      accountType: this.props.userData.accountType,
    };

    const res1 = await this.props.updateProfileDetails(
      this.props.userData.userId,
      filledData
    );
    console.log(res1);
    this.setState({ spinner: false });
    if (res1.status === 200) {
      toast.success(res1.message);
      this.props.history.push("/customer/profile");
    } else {
      if (res1.status !== 200) toast.error(res1.message);
    }
  }
}

const mapStateToProps = (state) => ({
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getUserDataById: (userId) => dispatch(thunks.user.getUserDataById(userId)),
  updateProfileDetails: (userId, profileData) =>
    dispatch(thunks.user.updateUserProfile(userId, profileData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
