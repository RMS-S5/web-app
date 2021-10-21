import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api";
import Form from "../../components/common/NewForm";
import { thunks } from "../../store/index";
import { getUserData } from "../../store/user/select";
class ChangePassword extends Form {
  state = {
    data: {
      currentPassword: "",
      password: "",
      repeatNewPassword: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
  };

  schema = {
    currentPassword: Joi.string().required().label("Current Password"),
    password: Joi.string().required().label("New Password"),
    repeatNewPassword: Joi.string()
      .custom(this.comparePassword())
      .required()
      .label("Repeat New Password")
      .messages({
        "any.invalid": "Repeat password does not match with the above password",
      }),
  };

  comparePassword() {
    return (value, helper) => {
      if (value !== this.state.data.password) {
        return helper.error("any.invalid");
      }
      return value;
    };
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Change Password</CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.handleSubmit}>
                  <CRow>
                    <CCol>
                      {this.renderInput(
                        "currentPassword",
                        "Current Password",
                        "password",
                        {
                          placeholder: "Enter Your Current Password",
                        }
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {this.renderInput(
                        "password",
                        "New Password",
                        "password",
                        {
                          placeholder: "Enter Your New Password",
                        }
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {this.renderInput(
                        "repeatNewPassword",
                        "Repeat New Password",
                        "password",
                        {
                          placeholder: "Repeat New Password",
                        }
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {this.renderButton("Change", "danger", "light")}
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardFooter></CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  async callServer() {
    this.setState({ spinner: true });
    const data = { ...this.state.data };
    delete data.repeatNewPassword;
    // console.log(data, this.props);
    const res = await api.user.update.changePassword(
      this.props.userData.userId,
      data
    );
    this.setState({ spinner: false });
    if (res[0].status === 200) {
      toast.success("Password successfully changed");
      if (this.props.userData.accountType === "Customer") {
        this.props.history.push("/customer/profile");
      } else if (this.props.userData.accountType === "Receptionist") {
        this.props.history.push("/receptionist/profile");
      } else if (this.props.userData.accountType === "Manager") {
        this.props.history.push("/manager/profile");
      } else if (this.props.userData.accountType === "Branch Manager") {
        this.props.history.push("/branch-manager/profile");
      }
    } else {
      toast.error(res[0].message);
    }
  }
}

const mapStateToProps = (state) => ({
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  // changePassword: (userId, data) =>
  //   dispatch(api.user.update.changePassword(userId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
