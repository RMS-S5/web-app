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
import { getAllRoles } from "../../store/staff/select";
import CIcon from "@coreui/icons-react";
import { getUserData } from "../../store/user/select";
import api from "../../api";

class customerReport extends Form {
  state = {
    data: {
      userId: "",
      report: "",
      mobileNumber: "",
      customerName: "",
    },
    image: "",
    imageSrc: "",
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
    report: Joi.string().min(5).label("Report").required(),
    userId: Joi.string().label("user id"),
    mobileNumber: Joi.string().allow(null, "").label("Mobile number"),
    customerName: Joi.string().label("customer name"),
  };

  async componentDidMount() {
    if (this.props.userData.hasOwnProperty("userId")) {
      let userData = await this.props.getUserDataById(
        this.props.userData.userId
      );

      this.setState({ userData: userData, isLoggedIn: true });

      this.setState({
        data: {
          customerName: userData.firstName,
          mobileNumber: userData.mobileNumber,
          userId: userData.userId,
        },
      });
    } else {
      toast.error("You must login to continue");
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
            <CardContainer error={this.state.error} header="Report a problem">
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderTextArea(
                      "report",
                      "Type your issue here",
                      "10",
                      {
                        placeholder: "type your question",
                      }
                    )}
                  </CCol>
                </CRow>
                <img height="300" src={this.state.imageSrc} />
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderImageInput(
                      "image",
                      "report picture",
                      "file",
                      {
                        placeholder: "Upload a picture for the report",
                      },
                      true
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>{this.renderButton("Send", "success", "danger")}</CCol>
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
    console.log("he");
    const report = {
      userId: this.state.data.userId,
      mobileNumber: this.state.data.mobileNumber,
      description: this.state.data.report,
      customerName: this.state.data.customerName,
    };
    console.log(report);
    const res = await api.report.add.customerReport(report);
    //console.log(this.props);
    this.setState({ spinner: false });

    if (res[0].status === 200) {
      toast.success("Our team will contact you. Thanks for your feedback.");
      this.state.data.report = "";
      this.state.image = "";
      this.setState({ data: { report: "" }, image: "" });
      if (this.props.userData.AccountType === "Customer") {
        this.props.history.push("/customer/report-a-problem");
      } else if (this.props.userData.AccountType === "Receptionist") {
        this.props.history.push("/receptionist/report-a-problem");
      }
    } else {
      if (res[0].status !== 200) toast.error(res[0].message);
    }
  }
}

const mapStateToProps = (state) => ({
  //categories: getAllCategories(state),
  // branches: getAllBranches(state),
  // roles: getAllRoles(state),
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getUserDataById: (customerId) =>
    dispatch(thunks.user.getUserDataById(customerId)),

  // getAllCategories : () => dispatch(thunks.product.getAllCategory()),
  // addProduct : (productData) => dispatch(thunks.product.addProduct(productData))
  // getAllBranches : () => dispatch(thunks.staff.getAllBranches()),
  // getAllRoles : () => dispatch(thunks.staff.getAllRoles()),
  // addBookingData : (bookingData) => dispatch(thunks.booking.addBookingData(bookingData))
});

export default connect(mapStateToProps, mapDispatchToProps)(customerReport);
