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

class AskQuestions extends Form {
  state = {
    data: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      nic: "",
      isPaid: false,
    },
    //image : "",
    //categories : [],
    branches: [],
    roles: [],
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
    first_name: Joi.string().label("First Name"),
    last_name: Joi.string().label("Last Name"),
    email: Joi.string().label("Email"),
    isPaid: Joi.boolean().label("isPaid"),

    mobile_number: Joi.string().label("Mobile Number"),
    nic: Joi.string().label("NIC"),
  };

  async componentDidMount() {}

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CardContainer error={this.state.error} header="Add Booking Data">
              <CForm onSubmit={this.handleSubmit}>
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
                    {this.renderInput(
                      "mobile_number",
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

                <CRow>
                  <CCol>
                    {this.renderButton("Go to payment", "success", "danger")}
                  </CCol>
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
    const self = this;
    var payment = {
      sandbox: true,
      merchant_id: "1218700", // Replace your Merchant ID
      return_url: undefined, // Important
      cancel_url: undefined, // Important
      notify_url: "http://sample.com/notify",
      order_id: "ItemNo12345",
      items: "Door bell wireles",
      amount: "31.00",
      currency: "LKR",
      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
      delivery_address: "No. 46, Galle road, Kalutara South",
      delivery_city: "Kalutara",
      delivery_country: "Sri Lanka",
      custom_1: "",
      custom_2: "",
    };
    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      self.state.data.isPaid = true;
      const formData = new FormData();
      // Update the formData object
      // formData.append("image", self.state.image);
      console.log(self.state.data.first_name);
      formData.append("first_name", self.state.data.first_name);
      formData.append("last_name", self.state.data.last_name);
      formData.append("email", self.state.data.email);
      formData.append("mobile_number", self.state.data.mobile_number);
      formData.append("nic", self.state.data.nic);

      const res = { status: 200, message: "OK" }; //await self.props.addBookingData(formData);

      self.setState({ spinner: false });

      if (res.status === 200) {
        toast.success(res.message);
        self.props.history.push("/customer/previous-bookings");
      } else {
        if (res.status !== 200) toast.error(res.message);
      }
      //Note: validate the payment and show success or failure page to the customer
    };

    // Called when user closes the payment without completing
    payhere.onDismissed = function onDismissed() {
      //Note: Prompt user to pay again or show an error page
      console.log("Payment dismissed");
      self.setState({ spinner: false });
      toast.error("Payment dismissed!");
    };

    // Called when error happens when initializing payment such as invalid parameters
    payhere.onError = function onError(error) {
      // Note: show an error page
      console.log("Error:" + error);
      self.setState({ spinner: false });
      toast.error("Payment Error", error);
    };
    payhere.startPayment(payment);
  }
}

const mapStateToProps = (state) => ({
  //categories: getAllCategories(state),
  // branches: getAllBranches(state),
  // roles: getAllRoles(state),
});

const mapDispatchToProps = (dispatch) => ({
  // getAllCategories : () => dispatch(thunks.product.getAllCategory()),
  // addProduct : (productData) => dispatch(thunks.product.addProduct(productData))
  // getAllBranches : () => dispatch(thunks.staff.getAllBranches()),
  // getAllRoles : () => dispatch(thunks.staff.getAllRoles()),
  // addBookingData : (bookingData) => dispatch(thunks.booking.addBookingData(bookingData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestions);
