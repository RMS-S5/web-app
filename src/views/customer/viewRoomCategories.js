import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CCardImg,
  CInput,
  CLabel,
  CCardGroup,
  CCardTitle,
  CCardText,
  CCardFooter,
  CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import image1 from "../../assets/img/1.jpg";
import image3 from "../../assets/img/3.jpg";
import image4 from "../../assets/img/4.jpg";

class CategoryView extends Form {
  state = {
    roomTypes: [
      "Single Room",
      "Double Room",
      "Triple Room",
      "Hollywood Twin Room",
      "Executive Room",
      "Executive Suite",
    ],
    roomDescriptions: [
      "A room assigned to one person. May have one or more beds. The room size or area of Single Rooms are generally between 37 m² to 45 m².",
      "A room assigned to two people. May have one or more beds. The room size or area of Double Rooms are generally between 40 m² to 45 m².",
      "A room that can accommodate three persons and has been fitted with three twin beds, one double bed and one twin bed or two double beds. The room size or area of Triple Rooms are generally between 45 m² to 65 m².",
      "A room that can accommodate two persons with two twin beds joined together by a common headboard. The room size or area of Hollywood Twin Rooms are generally between 32 m² to 40 m².",
      "A parlour or living room connected with to one or more bedrooms. The room size or area of Suite rooms are generally between 70 m² to 100 m².",
      "A room with one or more bedrooms and a separate living space. The room size or area of Suite rooms are generally between 70 m² to 100 m².",
    ],
    images: [image1, image4, image3, image4, image1, image3],
    status: ["Available", "Not Available"],
    pCode: "",
    image: "",
    errors: {},
    btnDisable: false,
    spinner: false,
  };

  //   async componentDidMount() {
  //     const res = await this.props.getAllCategories();
  //     if (res.status === 200) {
  //       const category = this.getCategoryById(this.props.match.params.categoryId);
  //       if (category) {
  //         const categoryId = this.props.match.params.categoryId;
  //         const updateData = cleanQuery(category, [
  //           "status",
  //           "name",
  //           "description",
  //         ]);
  //         this.setState({ data: { ...updateData }, categoryId });
  //       } else {
  //         this.setState({ loading: false, error: true });
  //         toast.error("Category not found");
  //       }
  //     } else {
  //       this.setState({ loading: false, error: true });
  //       toast.error(res.message);
  //     }
  //   }

  renderCards() {
    if (this.state.roomTypes.length > 1) {
      let rows = [];
      for (let i = 0; i < this.state.roomTypes.length; i++) {
        rows.push(
          <CCard key={i}>
            <CCardImg
              maxWidth="200px"
              height="300px"
              allign="center"
              src={this.state.images[i]}
            />
            <CCardBody>
              <CCardTitle>{this.state.roomTypes[i]}</CCardTitle>
              <CCardText>{this.state.roomDescriptions[[i]]}</CCardText>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">updated recently</small>
            </CCardFooter>
          </CCard>
        );
      }

      return <React.Fragment>{rows}</React.Fragment>;
    }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol xs="5" md="7">
            <CCard width="50%">
              <CCardHeader>Room Categories</CCardHeader>
              <CCardBody>{this.renderCards()}</CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  // categories: getAllCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  // getAllCategories : () => dispatch(thunks.product.getAllCategory()),
  // updateCategoryData : (categoryId, categoryData) => dispatch(thunks.product.updateCategory(categoryId,categoryData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
