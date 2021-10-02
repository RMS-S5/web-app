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
  CSelect,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import { thunks } from "../../store/index";
//import {getAllCategories} from "../../store/product/select"; //todo:change
import { getAllBranches } from "../../store/staff/select";
import { getAllAccountTypes } from "../../store/staff/select";
import CIcon from "@coreui/icons-react";
import humanize from "../../utils/humanize";

class StaffAdd extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      accountType: "",
      branchId: "",
      birthday: "",
      mobileNumber: "",
      nic: "",
    },
    branches: [],
    accountTypes: [],
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    firstName: Joi.string().label("First Name"),
    lastName: Joi.string().label("Last Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().label("Password"),
    accountType: Joi.string().label("Account Type"),
    branchId: Joi.string().label("Branch ID"),
    birthday: Joi.date().less("now").label("Birthday"),
    mobileNumber: Joi.string().label("Mobile Number"),
    nic: Joi.string().label("NIC"),
  };

  async componentDidMount() {
    let res = await this.props.getAllBranches();
    if (res.status === 200) {
      const branchesData = this.props.branches;
      let pairValue = [];
      branchesData.forEach((item, index) => {
        pairValue.push({
          value: item.branchId,
          label: item.branchName,
        });
      });
      this.setState({ branches: pairValue, loading: false });
    } else {
      this.setState({ loading: false, error: false }); //todo:set error to true
      toast.error(res.message);
    }

    res = await this.props.getAllAccountTypes();
    if (res.status === 200) {
      let accountTypesData = this.props.accountTypes;

      if (this.props.accountType === "manager") {
        accountTypesData =accountTypesData.filter(item => item.accountType === "Branch Manager")
      }
      else if(this.props.accountType === "branch-manager"){
        accountTypesData = accountTypesData.filter(item => item.accountType === "Waiter" || item.accountType === "Kitchen Staff" || item.accountType === "Receptionist")
      }

      let pairValue = [];
      accountTypesData.forEach((item, index) => {
        pairValue.push({
          value: item.accountType,
          label: item.accountType,
        });
      });
      this.setState({ accountTypes: pairValue, loading: false });
    } else {
      this.setState({ loading: false, error: false }); //todo:set error to true
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
              header="Add Staff"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("firstName", "First Name", "text", {
                      placeholder: "Enter first name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("lastName", "Last Name", "text", {
                      placeholder: "Enter last name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("email", "Email", "text", {
                      placeholder: "Enter email",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("password", "Password", "password", {
                      placeholder: "Enter product stock",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                      "accountType",
                      "Account Type",
                      this.state.accountTypes
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                      "branchId",
                      "Branch",
                      this.state.branches
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("birthday", "Date of Birth", "date", {
                      placeholder: "Enter date of birth",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("mobileNumber", "Mobile Number", "text", {
                      placeholder: "Enter mobile number",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("nic", "NIC", "text", {
                      placeholder: "Enter NIC number",
                    })}
                  </CCol>
                </CRow>
                <CRow>
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

    const formData = new FormData();
    // Update the formData object
    formData.append("firstName", this.state.data.firstName);
    formData.append("lastName", this.state.data.lastName);
    formData.append("email", this.state.data.email);
    formData.append("password", this.state.data.password);
    formData.append("accountType", this.state.data.accountType);
    formData.append(
      "branchId",
      this.state.data.branchId 
    );
    formData.append("birthday", this.state.data.birthday);
    formData.append("mobileNumber", this.state.data.mobileNumber);

    console.log("########"); //test
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log("########"); //test
    const res = await this.props.addStaff(this.state.data); //todo:formData

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message);
      this.props.history.push(
        "/" + this.props.accountType + "/staff/view-staffm"
      );
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  branches: getAllBranches(state),
  accountTypes: getAllAccountTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllBranches: () => dispatch(thunks.staff.getAllBranches()),
  getAllAccountTypes: () => dispatch(thunks.staff.getAllAccountTypes()),
  addStaff: (staffData) => dispatch(thunks.staff.addStaff(staffData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffAdd);
