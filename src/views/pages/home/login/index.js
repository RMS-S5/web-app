import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CRow,
} from "@coreui/react";
import { Email } from "@material-ui/icons";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../../assets/local-css/auth.css";
import Form from "../../../../components/common/NewForm";
import { thunks } from "../../../../store/index";
import {
  getUserData,
  getAccessToken,
  getRefreshToken,
  getUserId,
} from "../../../../store/user/select";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    rememberMe: true,
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    if (this.props.currentUserId != "") {
      this.props.history.push("/home/login");
    }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <React.Fragment>
        <CRow className="justify-content-center">
          <CCol md="6"></CCol>
          <CCol md="4">
            <CCardGroup className="ml-4 mr-4" style={{ marginTop: "150px" }}>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={this.handleSubmit}>
                    <h3>HRMS Application</h3>
                    <p className="text-muted">Log In to your account</p>
                    {this.renderInputGroup(
                      "email",
                      "text",
                      "Email",
                      "cil-user"
                    )}
                    {this.renderInputGroup(
                      "password",
                      "password",
                      "Password",
                      "cil-lock-locked"
                    )}
                    <CFormGroup variant="checkbox" className="checkbox mb-2">
                      <CInputCheckbox
                        id="rememberMe"
                        name="rememberMe"
                        onChange={this.handleChangeCheckBox}
                        checked={this.state.rememberMe}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="rememberMe"
                      >
                        Remember Me
                      </CLabel>
                    </CFormGroup>
                    <CRow>
                      <CCol xs="6">
                        {this.renderButton("Log In", "success", "danger")}
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton> */}
                      </CCol>
                    </CRow>
                    <CRow className="text-center justify-content-center mt-2">
                      <div>
                        <p style={{ fontWeight: "bold" }}>
                          If you are not a user already, please register to HRMS
                          System.
                        </p>
                        <Link to="/home/register">
                          <CButton color="primary" className="mt-1">
                            Register Now!
                          </CButton>
                        </Link>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </React.Fragment>
    );
  }

  handleChangeCheckBox = () => {
    const bool = this.state.rememberMe;
    this.setState({ rememberMe: !bool });
  };

  async callServer() {
    this.setState({ spinner: true });

    const res = await this.props.login(
      this.state.data.email,
      this.state.data.password
    );
    console.log(res);

    this.setState({ spinner: false });

    if (res.status === 200) {
      if (this.state.rememberMe) {
        localStorage.setItem("hrms-access-token", this.props.accessToken);
        localStorage.setItem("hrms-refresh-token", this.props.refreshToken);
      }
      let userAccountType = this.props.userData.accountType;
      console.log(this.props);
      if (this.props.userData.accountType === "Customer") {
        this.props.history.push("/customer/check-availability");
      } else if (this.props.userData.accountType === "Manager") {
        console.log("manager login success");
        this.props.history.push("/manager");
      } else if (this.props.userData.accountType === "Branch Manager") {
        console.log("branch manager login success");
        this.props.history.push("/branch-manager");
      } else if (this.props.userData.accountType === "Receptionist") {
        this.props.history.push("/receptionist/update-booking-status");
      }

      // this.props.history.push("/customer");
    } else {
      toast.error(res.message);
    }
  }
}

/**
 * Attach state and dispatch to props
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({
  userData: getUserData(state),
  accessToken: getAccessToken(state),
  refreshToken: getRefreshToken(state),
  currentUserId: getUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(thunks.user.login(email, password)),
});

/**
 * Connect states and dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login);
