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

class Bookingform extends Form {
  state = {
    data: {
      answer: "",
      question: "",
    },
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

  async componentDidMount() {}

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CardContainer error={this.state.error} header="Ask Questions">
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("question", "Question", "text", {
                      placeholder: "type your question",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("answer", "Answer", "text", {
                      placeholder: "",
                      disabled: true,
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Bookingform);
