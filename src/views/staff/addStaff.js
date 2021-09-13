import {
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend, CInputGroupText, CInvalidFeedback,
  CLabel,
  CRow, CSelect
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
import {getAllBranches} from "../../store/staff/select";
import {getAllRoles} from "../../store/staff/select";
import CIcon from "@coreui/icons-react";

class StaffAdd extends Form {
  state = {
    data: {
      // pCode : "",
      // categoryId : "",
      // pName : "",
      // color : "",
      // size : "",
      // stock : "",
      // price : "",
      // description : "",
      //user_id : "",
      first_name : "",
      last_name : "",
      email : "",
      password : "",
      account_type : "",
      role : "",
      branch_id : "",
      birthday : "",
      mobile_number : "",
      nic : "",
    },
    //image : "",
    //categories : [],
    branches:[],
    roles:[],
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    // pCode: Joi.string().label("Product Code"),
    // pName: Joi.string().label("Product Name"),
    // categoryId: Joi.number().label("Category Id"),
    // stock: Joi.number().label("Stock"),
    // price: Joi.number().label("Price"),
    // color: Joi.string().label("Color"),
    // size: Joi.string().label("Size"),
    // description: Joi.string().label("Description"),
    // status: Joi.string().label("Available"),
    //user_id: Joi.string().label("User ID"),
    first_name: Joi.string().label("First Name"),
    last_name: Joi.string().label("Last Name"),
    email: Joi.string().email({ tlds: { allow: false } }).label("Email"),
    password: Joi.string().label("Password"),
    account_type: Joi.string().label("Account Type"),
    role: Joi.string().label("Role"),
    branch_id: Joi.string().label("Branch ID"),
    birthday: Joi.date().less("now").label("Birthday"),
    mobile_number: Joi.string().label("Mobile Number"),
    nic: Joi.string().label("NIC"),

  };

  async componentDidMount() {
    //dispatch the event to get the categories
    //set to the local states
    //const res = await this.props.getAllCategories();
    // if (res.status === 200) {
    //   const categoriesData = this.props.categories;
    //   let pairValue = [];
    //   categoriesData.forEach(
    //       (item, index) => {
    //         pairValue.push({
    //           value : item.categoryId,
    //           label : item.name
    //         })
    //       }
    //   )
    //   this.setState({ categories:pairValue,loading: false });
    // } else {
    //   this.setState({ loading: false, error: true });
    //   toast.error(res.message);
    // }

    let res = await this.props.getAllBranches();
    if (res.status === 200) {
      const branchesData = this.props.branches;
      let pairValue = [];
      branchesData.forEach(
          (item, index) => {
            pairValue.push({
              value : item.id,
              label : item.name
            })
          }
      )
      this.setState({ branches:pairValue,loading: false });
    } else {
      this.setState({ loading: false, error: false }); //todo:set error to true
      toast.error(res.message);
    }

    res = await this.props.getAllRoles();
    if (res.status === 200) {
      const rolesData = this.props.roles;
      
      let pairValue = [];
      rolesData.forEach(
          (item, index) => {
            pairValue.push({
              value : item.role,
              label : item.description
            })
          }
      )
      this.setState({ roles:pairValue,loading: false });
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
                {/* <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("user_id", "User ID", "text", {
                      placeholder: "Enter user ID",// todo:remove since id is autogenerated
                    })}
                  </CCol>
                </CRow> */}
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("first_name", "First Name", "text", {
                      placeholder: "Enter first name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("last_name", "Last Name", "text", {
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
                    {this.renderInput("account_type", "Account Type", "text", {
                      placeholder: "Enter account type",
                    },
                    true,
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                        "role", "Role", this.state.roles
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                        "branch_id", "Branch", this.state.branches
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
                    {this.renderInput("mobile_number", "Mobile Number", "text", {
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
                  <CCol xs="12" md="6">
                    {this.renderImageInput("image", "Profile Image", "file", {
                      placeholder: "Upload profile image",
                    },
                    true,
                    )}
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
    formData.append(
        "image",
        this.state.image
    );
    // formData.append(
    //     "user_id",
    //     this.state.data.user_id
    // )
    formData.append(
        "first_name",
        this.state.data.first_name
    )
    formData.append(
        "last_name",
        this.state.data.last_name
    )
    formData.append(
        "email",
        this.state.data.email
    )
    formData.append(
        "password",
        this.state.data.password
    )
    formData.append(
        "role",
        this.state.data.role
    )
    formData.append(
        "branch_id",
        this.state.data.branch_id //todo:branch must have an id property
    )
    formData.append(
        "birthday",
        this.state.data.birthday
    )
    formData.append(
        "mobile_number",
        this.state.data.mobile_number
    )

    console.log("########") //test
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    console.log("########") //test
    const res = await this.props.addStaff(formData);

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message)
      this.props.history.push("/manager/staff");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  //categories: getAllCategories(state),
  branches: getAllBranches(state),
  roles: getAllRoles(state),
});

const mapDispatchToProps = (dispatch) => ({
  // getAllCategories : () => dispatch(thunks.product.getAllCategory()),
  // addProduct : (productData) => dispatch(thunks.product.addProduct(productData))
  getAllBranches : () => dispatch(thunks.staff.getAllBranches()),
  getAllRoles : () => dispatch(thunks.staff.getAllRoles()),
  addStaff : (staffData) => dispatch(thunks.staff.addStaff(staffData))

});

export default connect(mapStateToProps, mapDispatchToProps)(StaffAdd);