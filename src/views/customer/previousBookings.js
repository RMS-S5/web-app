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
  CCardBody,
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
import api from "../../api/index";
import { thunks } from "../../store/index";
import { getAllBookings } from "../../store/customer/select";
import { getUserData } from "../../store/user/select";

class Bookingform extends Form {
  state = {
    data: {
      answer: "",
      question: "",
    },
    previousBookings: [],
    currentUser: [],
    fields: ["customerId", "bookingId", "arrival", "departure", "active"],
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
    question: Joi.string().label("Question"),
    first_name: Joi.string().label("First Name"),
    last_name: Joi.string().label("Last Name"),
    email: Joi.string().label("Email"),

    mobile_number: Joi.string().label("Mobile Number"),
    nic: Joi.string().label("NIC"),
  };

  async componentDidMount() {
    console.log(this.props.currentUser.userId);
    const res = await this.props.getAllBookings(this.props.currentUser.userId);
    console.log(res);
    // if (res.status === 200) {
    //   console.log(this.props.previousBookings);
    //   console.log(this.props);
    //   this.state.previousBookings = this.props.previousBookings;
    // const category = this.getCategoryById(this.props.match.params.categoryId);
    // if (category) {
    //   const categoryId = this.props.match.params.categoryId;
    //   const updateData = cleanQuery(category, [
    //     "status",
    //     "name",
    //     "description",
    //   ]);
    //   this.setState({ data: { ...updateData }, categoryId });
    // } else {
    //   this.setState({ loading: false, error: true });
    //   toast.error("Category not found");
    // }
    // } else {
    //   this.setState({ loading: false, error: true });
    // toast.error(res.message);
    // }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CardContainer error={this.state.error} header="Previous Bookings">
              {/* <table className="table">
                <thead>
                  {console.log(this.state.previousBookings)}
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Booking id</th>
                    <th scope="col">Arrival</th>
                    <th scope="col">Departure</th>
                    <th scope="col">Active</th>
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table> */}
            </CardContainer>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  async callServer() {
    this.setState({ spinner: true });

    const formData = new FormData();
    formData.append("question", this.state.data.question);

    const res = { status: 200, message: "OK" }; //await this.props.addBookingData(formData);

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message);
      this.props.history.push("/customer/ask-questions");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: getUserData(state),
  // previousBookings: getAllBookings(state),
  // branches: getAllBranches(state),
  // roles: getAllRoles(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllBookings: (customerId) =>
    dispatch(thunks.customer.getAllPreviousBookings(customerId)),
  // addProduct : (productData) => dispatch(thunks.product.addProduct(productData))
  // getAllBranches : () => dispatch(thunks.staff.getAllBranches()),
  // getAllRoles : () => dispatch(thunks.staff.getAllRoles()),
  // addBookingData : (bookingData) => dispatch(thunks.booking.addBookingData(bookingData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookingform);
