import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../api/index";
import "../../../../assets/local-css/auth.css";
import Form from "../../../../components/common/NewForm";
import _ from "lodash";

class Register extends Form {
  state = {
    data: {
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
  };

  /**
   * Schema for joi validation
   */
  schema = {
    first_name: Joi.string().label("first name"),
    last_name: Joi.string().label("last name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    mobile: Joi.string().min(10).max(13).required().label("Mobile Number"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string()
      .custom(this.comparePassword())
      .required()
      .label("Confrim Password")
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
      <React.Fragment>
        <CContainer fluid>
          <CRow className="justify-content-center">
            <CCol md="7"></CCol>
            <CCol md="4">
              <CCard
                className=""
                style={{
                  marginTop: `${`200px`}`,
                }}
              >
                <CCardBody className="p-4">
                  <CForm onSubmit={this.handleSubmit}>
                    <h3>HRMS Application</h3>
                    <p className="text-muted">Create your account</p>
                    <div>
                      {this.renderInputGroup(
                        "first_name",
                        "text",
                        "First name",
                        "cil-user"
                      )}
                      {this.renderInputGroup(
                        "last_name",
                        "text",
                        "Last Name",
                        "cil-user"
                      )}
                      {this.renderInputGroup(
                        "mobile",
                        "text",
                        "Mobile Number",
                        "cil-mobile"
                      )}
                      {this.renderInputGroup(
                        "email",
                        "text",
                        "Email",
                        "cil-at"
                      )}
                      {this.renderInputGroup(
                        "password",
                        "password",
                        "Password",
                        "cil-lock-locked"
                      )}
                      {this.renderInputGroup(
                        "confirmPassword",
                        "password",
                        "Confirm Password",
                        "cil-lock-locked"
                      )}
                    </div>
                    {this.renderButton("Create Account", "success", "danger", {
                      style: { width: "100%" },
                    })}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </React.Fragment>
    );
  }

  async callServer() {
    this.setState({ spinner: true });

    const inputData = { ...this.state.data };
    delete inputData.confirmPassword;
    let res, data;
    const filteredData = _.pick(inputData, [
      "first_name",
      "last_name",
      "mobile",
      "email",
      "password",
    ]);

    [res, data] = await api.user.add.register(
      // filteredData
      {
        firstName: filteredData.first_name,
        lastName: filteredData.last_name,
        mobileNumber: filteredData.mobile,
        email: filteredData.email,
        password: filteredData.password,
      }
      // filteredData.first_name,
      // filteredData.last_name,
      // filteredData.mobile,
      // filteredData.email,
      // filteredData.password
    );

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success("Registration successful");
      this.props.history.push("/home/login");
    } else {
      toast.error(res.message);
    }
  }
}

export default Register;
