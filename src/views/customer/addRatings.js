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
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class customerRating extends Form {
  state = {
    data: {
      review: "",
      recommendation: "",
    },
    userData: [],
    rating: 3,
    image: "",
    imageSrc: "",
    isLoggedIn: false,
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
    review: Joi.string().label("review"),
    recommendation: Joi.string().label("recommendation"),
  };

  async componentDidMount() {
    console.log(this.props);
    if (this.props.userData.hasOwnProperty("userId")) {
      let userData = await this.props.getUserDataById(
        this.props.userData.userId
      );

      this.setState({ userData: userData, isLoggedIn: true });
    } else {
      toast.error("You must login to continue");
    }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    function IconContainer(props) {
      const { value, ...other } = props;
      return <span {...other}>{customIcons[value].icon}</span>;
    }
    // IconContainer.propTypes = {
    //   value: PropTypes.number.isRequired,
    // };
    const customIcons = {
      1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: "Very Dissatisfied",
      },
      2: {
        icon: <SentimentDissatisfiedIcon />,
        label: "Dissatisfied",
      },
      3: {
        icon: <SentimentSatisfiedIcon />,
        label: "Neutral",
      },
      4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: "Satisfied",
      },
      5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: "Very Satisfied",
      },
    };
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CardContainer
              error={this.state.error}
              header="Rate us | Add a review | Add a recommendation"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    <h5>Rate us</h5>
                  </CCol>
                </CRow>
                <Rating
                  defaultValue={2}
                  size="large"
                  name="customized-icons"
                  value={this.state.rating}
                  getLabelText={(value) => customIcons[value].label}
                  IconContainerComponent={IconContainer}
                  onChange={(event, newValue) => {
                    this.setState({ rating: newValue });
                  }}
                />
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderTextArea("review", "Type your review", "5", {
                      placeholder: "type your review",
                    })}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderTextArea(
                      "recommendation",
                      "Type your any recommendation",
                      "5",
                      {
                        placeholder: "type your any recommendation",
                      },
                      true
                    )}
                  </CCol>
                </CRow>

                {/* <CRow>
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
                </CRow> */}
                {/* <StarRatings
                  rating={this.state.rating}
                  starRatedColor="blue"
                  changeRating={this.changeRating}
                  numberOfStars={6}
                  name="rating"
                /> */}

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
    let customerId = "";

    if (this.state.isLoggedIn) {
      customerId = this.state.userData.userId;
    }
    const review = {
      rating: this.state.rating,
      description: this.state.data.review,
      recommendation: this.state.data.recommendation,
      customerId,
    };

    const res = await api.report.add.customerReview(review);

    this.setState({ spinner: false });

    if (res[0].status === 200) {
      this.setState({
        data: {
          review: "",
          recommendation: "",
        },
      });
      toast.success("Thanks for rating. We improve based on your feedback");

      this.props.history.push("/customer/add-a-review");
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

export default connect(mapStateToProps, mapDispatchToProps)(customerRating);
