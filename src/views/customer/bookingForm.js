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
import { current } from "immer";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/user/select";
import user from "../../store/user";
import { v4 as uuidv4 } from "uuid";

class AskQuestions extends Form {
  state = {
    data: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      nic: "",
      isPaid: false,
      amount: 0,
    },
    //image : "",
    //categories : [],
    isLoggedIn: false,
    userData: [],
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
    amount: Joi.number().label("Amount"),

    mobile_number: Joi.string().label("Mobile Number"),
    nic: Joi.string().label("NIC"),
  };

  async componentDidMount() {
    console.log(this.props);
    console.log(this.props.userData);
    if (
      this.props.location.hasOwnProperty("branchData") &&
      this.props.location.hasOwnProperty("roomData")
    ) {
      if (
        this.props.userData.hasOwnProperty("userId") &&
        this.props.userData.accountType === "Customer"
      ) {
        let userData = await this.props.getUserDataById(
          this.props.userData.userId
        );
        // console.log(userData);
        // console.log(this.props.userData.userId);
        this.setState({ userData: userData, isLoggedIn: true });
        // console.log(this.state.userData);
        this.state.data.amount = this.props.location.roomData.amount;
        this.state.data.first_name = userData.firstName;
        this.state.data.last_name = userData.lastName;
        this.state.data.email = userData.email;
        this.state.data.mobile_number = userData.mobileNumber;
        this.setState({
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            mobile_number: userData.mobileNumber,
            amount: this.props.location.roomData.amount,
          },
        });
      }
    } else {
      toast.error("Data Not found, Start booking again");
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
            <CardContainer error={this.state.error} header="Add Booking Data">
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("first_name", "First Name", "text", {
                      placeholder: "Enter first name",
                      disabled: this.state.isLoggedIn,
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("last_name", "Last Name", "text", {
                      placeholder: "Enter last name",
                      disabled: this.state.isLoggedIn,
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("email", "Email", "text", {
                      placeholder: "Enter email",
                      disabled: this.state.isLoggedIn,
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
                        disabled: this.state.isLoggedIn,
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
    console.log(this.props);
    console.log({
      first_name: this.state.data.first_name,
      last_name: this.state.data.last_name,
      email: this.state.data.email,
      phone: this.state.data.mobile_number,
    });
    if (
      this.props.location.hasOwnProperty("branchData") &&
      this.props.location.hasOwnProperty("roomData")
    ) {
      // const userData = useSelector(getUserData);
      let bookingId = uuidv4();
      const self = this;
      var payment = {
        sandbox: true,
        merchant_id: "1218700", // Replace your Merchant ID
        return_url: undefined, // Important
        cancel_url: undefined, // Important
        notify_url: "http://sample.com/notify",
        order_id: bookingId,
        items: "Room Bookings",
        amount: this.props.location.roomData.amount,
        currency: "LKR",
        first_name: this.state.data.first_name,
        last_name: this.state.data.last_name,
        email: this.state.data.email,
        phone: this.state.data.mobile_number,
        address: "not added",
        city: "not added",
        country: "Sri Lanka",
        delivery_address: "No. 46, Galle road, Kalutara South",
        delivery_city: "Kalutara",
        delivery_country: "Sri Lanka",
        custom_1: "",
        custom_2: "",
      };
      console.log(payment);
      // console.log("Payment completed. BookingId:" + bookingId);
      // self.state.data.isPaid = true;
      // const formData = new FormData();
      // // Update the formData object
      // // formData.append("image", self.state.image);
      // formData.append("first_name", self.state.data.first_name);
      // formData.append("email", self.state.data.email);
      // if (self.state.isLoggedIn) {
      //   console.log(self.props.userData.userId);
      //   formData.append("customerId", self.props.userData.userId);
      // }

      // // formData.append("last_name", self.state.data.last_name);

      // // formData.append("mobile_number", self.state.data.mobile_number);
      // // formData.append("nic", self.state.data.nic);
      // formData.append("bookingId", bookingId);
      // formData.append("branchId", self.props.location.branchData.branchId);
      // formData.append("arrival", self.props.location.branchData.arrival);
      // formData.append("departure", self.props.location.branchData.departure);
      // formData.append("amount", self.state.data.amount);
      // let roomDataV = "";
      // self.props.location.roomData.rooms.forEach((room) => {
      //   roomDataV = roomDataV + room.roomNumber + ",";
      // });
      // console.log(roomDataV);
      // formData.append(
      //   "roomNumbers",
      //   roomDataV.substring(0, roomDataV.length - 1)
      // );
      // roomDataV = roomDataV.substring(0, roomDataV.length - 1);
      // let allData = {
      //   bookingId,
      //   branchId: self.props.location.branchData.branchId,
      //   arrival: self.props.location.branchData.arrival,
      //   departure: self.props.location.branchData.departure,
      //   roomNumbers: roomDataV,
      //   first_name: self.state.data.first_name,
      //   email: self.state.data.email,
      //   customerId: self.props.userData.userId,
      //   amount: self.state.data.amount,
      // };
      // console.log(allData);

      // const res = await self.props.addBookingData(allData);

      // self.setState({ spinner: false });

      // if (res.status === 200) {
      //   toast.success(res.message);
      //   //self.props.history.push("/customer/previous-bookings");
      // } else {
      //   if (res.status !== 200) toast.error(res.message);
      // }
      //Note: validate the payment and show success or failure page to the customer
      payhere.onCompleted = async function onCompleted(orderId) {
        console.log("Payment completed. BookingId:" + orderId);
        self.state.data.isPaid = true;
        const formData = new FormData();
        // Update the formData object
        // formData.append("image", self.state.image);
        formData.append("first_name", self.state.data.first_name);
        formData.append("email", self.state.data.email);
        if (self.state.isLoggedIn) {
          console.log(self.props.userData.userId);
          formData.append("customerId", self.props.userData.userId);
        }

        // formData.append("last_name", self.state.data.last_name);

        // formData.append("mobile_number", self.state.data.mobile_number);
        // formData.append("nic", self.state.data.nic);
        formData.append("bookingId", bookingId);
        formData.append("branchId", self.props.location.branchData.branchId);
        formData.append("arrival", self.props.location.branchData.arrival);
        formData.append("departure", self.props.location.branchData.departure);
        formData.append("amount", self.state.data.amount);
        let roomDataV = "";
        self.props.location.roomData.rooms.forEach((room) => {
          roomDataV = roomDataV + room.roomNumber + ",";
        });
        console.log(roomDataV);
        formData.append(
          "roomNumbers",
          roomDataV.substring(0, roomDataV.length - 1)
        );
        roomDataV = roomDataV.substring(0, roomDataV.length - 1);
        let allData = {
          bookingId,
          branchId: self.props.location.branchData.branchId,
          arrival: self.props.location.branchData.arrival,
          departure: self.props.location.branchData.departure,
          roomNumbers: roomDataV,
          first_name: self.state.data.first_name,
          email: self.state.data.email,
          // customerId: self.props.userData.userId,
          amount: self.props.location.roomData.amount,
        };
        if (self.state.isLoggedIn) {
          allData = {
            bookingId,
            branchId: self.props.location.branchData.branchId,
            arrival: self.props.location.branchData.arrival,
            departure: self.props.location.branchData.departure,
            roomNumbers: roomDataV,
            first_name: self.state.data.first_name,
            email: self.state.data.email,
            customerId: self.props.userData.userId,
            amount: self.props.location.roomData.amount,
          };
        }
        console.log(allData);

        const res = await self.props.addBookingData(allData);

        self.setState({ spinner: false });

        if (res.status === 200) {
          toast.success(res.message);
          if (self.props.userData.accountType === "Receptionist") {
            self.props.history.push("/receptionist/update-booking-status");
          } else {
            self.props.history.push("/customer/previous-bookings");
          }
        } else {
          if (res.status !== 200) toast.error(res.message);
        }
        // console.log("Payment completed. BookingId:" + orderId);
        // self.state.data.isPaid = true;
        // const formData = new FormData();
        // // Update the formData object
        // // formData.append("image", self.state.image);
        // formData.append("first_name", self.state.data.first_name);
        // formData.append("email", self.state.data.email);
        // if (self.state.isLoggedIn) {
        //   console.log(self.props.userData.userId);
        //   formData.append("customerId", self.props.userData.userId);
        // }

        // // formData.append("last_name", self.state.data.last_name);

        // // formData.append("mobile_number", self.state.data.mobile_number);
        // // formData.append("nic", self.state.data.nic);
        // formData.append("bookingId", bookingId);
        // formData.append("branchId", self.props.location.branchData.branchId);
        // formData.append("arrival", self.props.location.branchData.arrival);
        // formData.append("departure", self.props.location.branchData.departure);
        // formData.append("amount", self.state.data.amount);
        // let roomDataV = "";
        // self.props.location.roomData.forEach((room) => {
        //   roomDataV = roomDataV + room.roomNumber + ",";
        // });
        // formData.append(
        //   "roomNumbers",
        //   roomDataV.substring(0, roomDataV.length - 1)
        // );

        // const res = await self.props.addBookingData(formData);

        // self.setState({ spinner: false });

        // if (res.status === 200) {
        //   toast.success(res.message);
        //   //self.props.history.push("/customer/previous-bookings");
        // } else {
        //   if (res.status !== 200) toast.error(res.message);
        // }
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
    } else {
      toast.error("Data not found. Start booking again", error);
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
  // getAllCategories : () => dispatch(thunks.product.getAllCategory()),
  // addProduct : (productData) => dispatch(thunks.product.addProduct(productData))
  // getAllBranches : () => dispatch(thunks.staff.getAllBranches()),
  // getAllRoles : () => dispatch(thunks.staff.getAllRoles()),
  getUserDataById: (customerId) =>
    dispatch(thunks.user.getUserDataById(customerId)),

  addBookingData: (bookingData) =>
    dispatch(thunks.booking.addBookingData(bookingData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestions);
