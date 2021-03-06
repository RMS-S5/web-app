import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks, cleanQuery } from "../../store/index";
import {
  getAllBranches,
  getAllAccountTypes,
  getAllStaffm,
} from "../../store/staff/select";

class StaffView extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      accountType: "",
      branchId: "",
      birthday: "",
      mobileNumber: "",
      nic: "",
    },
    branches: [],
    accountTypes: [],
    //status : ["Available" , "Not Available"],
    userId: "",
    image: "",
    errors: {},
    btnDisable: false,
    spinner: false,
  };

  getStaffByID = (userId) => {
    console.log(userId, this.props.staffm);
    const staff = this.props.staffm.find((item) => {
      return item.userId == userId;
    });
    if (!staff) {
      toast.error("Staff Not found");
      return;
    }
    return staff;
  };

  schema = {
    //status: Joi.string().optional().label("Staff Status"),
    firstName: Joi.string().optional().label("First Name"),
    lastName: Joi.string().optional().label("Last Name"),
    email: Joi.string()
      .optional()
      .email({ tlds: { allow: false } })
      .label("Email"),
    accountType: Joi.string().optional().label("Account Type"),
    branchId: Joi.string().optional().label("Branch ID"),
    birthday: Joi.date().optional().label("Birthday"),
    mobileNumber: Joi.string().optional().label("Mobile Number"),
    nic: Joi.string().optional().label("NIC"),
  };

  async componentDidMount() {
    const res = await this.props.getAllBranches();
    const res1 = await this.props.getAllStaffm();
    const res2 = await this.props.getAllAccountTypes();
    if (res.status === 200 && res1.status === 200 && res2.status === 200) {
      const branchesData = this.props.branches;
      const accountTypesData = this.props.accountTypes;
      let pairValue = [];
      branchesData.forEach((item, index) => {
        pairValue.push({
          value: item.branchId,
          label: item.branchName,
        });
      });
      this.setState({ branches: pairValue, loading: false });

      let pairValue1 = [];
      accountTypesData.forEach((item, index) => {
        pairValue1.push({
          value: item.accountType,
          label: item.accountType,
        });
      });
      this.setState({ accountTypes: pairValue1, loading: false });
    } else {
      this.setState({ loading: false, error: true });
      toast.error(res.message);
    }

    const staff = this.getStaffByID(this.props.match.params.userId);
    if (staff) {
      const updateData = cleanQuery(staff, [
        "firstName",
        "lastName",
        "email",
        "accountType",
        "branchId",
        "birthday",
        "mobileNumber",
        "nic",
      ]); //todo: include status when implemented
      const userId = staff.userId;
      this.setState({ data: { ...updateData }, userId });
    }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>Change Staff</CCardHeader>
              <CCardBody>
                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                  <CRow>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="name">User ID</CLabel>
                      <CInput id="name" readOnly value={this.state.userId} />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6">
                      {this.renderInput(
                        "firstName",
                        "First Name",
                        "text",
                        {
                          placeholder: "Enter first name",
                        },
                        false
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6">
                      {this.renderInput(
                        "lastName",
                        "Last Name",
                        "text",
                        {
                          placeholder: "Enter last name",
                        },
                        false
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6">
                      {this.renderInput(
                        "email",
                        "Email",
                        "text",
                        {
                          placeholder: "Enter email",
                        },
                        false
                      )}
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
                      {this.renderInput(
                        "mobileNumber",
                        "Mobile Number",
                        "text",
                        {
                          placeholder: "Enter mobile number",
                        }
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6">
                      {this.renderInput("nic", "NIC", "text", {
                        placeholder: "Enter NIC number",
                      })}
                    </CCol>
                  </CRow>
                  {/* <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelect(
                                                "status", "Status", this.state.status
                                            )}
                                        </CCol>
                                    </CRow> */}

                  <CRow>
                    <CCol xs="12" md="6">
                      {this.renderImageInput(
                        "image",
                        "Product Image",
                        "file",
                        {
                          placeholder: "Upload profile image",
                        },
                        false
                      )}
                    </CCol>
                  </CRow>
                  {this.renderButton("Submit", "primary", "danger")}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  async callServer() {
    this.setState({ spinner: true });

    const formData = new FormData();
    // Update the formData object
    formData.append("image", this.state.image);
    // formData.append(
    //     "userId",
    //     this.state.data.userId
    // )
    formData.append("firstName", this.state.data.firstName);
    formData.append("lastName", this.state.data.lastName);
    formData.append("email", this.state.data.email);
    formData.append("accountType", this.state.data.accountType);
    formData.append(
      "branchId",
      this.state.data.branchId //todo:branch must have an id property
    );
    formData.append("birthday", this.state.data.birthday);
    formData.append("mobileNumber", this.state.data.mobileNumber);
    console.log("########"); //test
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log("########"); //test

    const res = await this.props.updateStaff(this.state.userId, this.state.data);

    this.setState({ spinner: false });
    if (res.status === 200) {
      this.props.history.push(
        "/" + this.props.accountType + "/staff/view-staffm"
      );
    } else {
      toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  staffm: getAllStaffm(state),
  branches: getAllBranches(state),
  accountTypes: getAllAccountTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllStaffm: () => dispatch(thunks.staff.getAllStaffm()),
  getAllBranches: () => dispatch(thunks.staff.getAllBranches()),
  getAllAccountTypes: () => dispatch(thunks.staff.getAllAccountTypes()),
  updateStaff: (userId, staffData) =>
    dispatch(thunks.staff.updateStaff(userId, staffData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffView);
