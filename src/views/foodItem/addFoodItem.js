import {
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend, CInputGroupText, CInvalidFeedback,
  CLabel,
  CRow, CSelect,
  CButton, CSpinner,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import FoodVariantForm from "./foodVariantForm";
import { thunks } from "../../store/index";
import { getAllCategories } from "../../store/category/select";
import CIcon from "@coreui/icons-react";
import humanize from "../../utils/humanize";

class FoodItemAdd extends Form {
  state = {
    data: {
      name: "",
      categoryId: "",
      description: "",
      price: "",
    },
    foodVariants: [],
    image: "",
    categories: [],
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    name: Joi.string().label("Name"),
    categoryId: Joi.string().label("Category ID"),
    description: Joi.string().label("Description"),
    price: Joi.number().label("Price"),

  };

  async componentDidMount() {

    let res = await this.props.getAllCategories();
    if (res.status === 200) {
      const categoriesData = this.props.categories;
      let pairValue = [];
      categoriesData.forEach(
        (item, index) => {
          pairValue.push({
            value: item.categoryId,
            label: item.categoryName
          })
        }
      )
      this.setState({ categories: pairValue, loading: false });
    } else {
      this.setState({ loading: false, error: false }); //todo:set error to true
      toast.error(res.message);
    }

  }

  componentWillUnmount() {
    toast.dismiss();
  }

  // handleAddVariant = () => {
  //   this.state
  // }
  handleAddVariant(something) {
    console.log(something);
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CardContainer
              error={this.state.error}
              loading={this.state.loading}
              header="Add Food Item"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("name", "Name", "text", {
                      placeholder: "Enter name",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                      "categoryId", "Category", this.state.categories
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("description", "Description", "text", {
                      placeholder: "Enter description",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("price", "Price", "text", {
                      placeholder: "Enter price",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderImageInput("image", "Food Item Image", "file", {
                      placeholder: "Upload Food Item image",
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
          <CCol>
            <CardContainer
              error={this.state.error}
              loading={this.state.loading}
              header="Food Variants (Optional)"
            >
              <CRow>
                <CCol>
                  <FoodVariantForm foodVariants={this.state.foodVariants} onAdd={this.handleAddVariant}>
                  </FoodVariantForm>
                </CCol>
              </CRow>
            </CardContainer>

          </CCol>
        </CRow>
      </CContainer >
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
    formData.append(
      "name",
      this.state.data.name
    )
    formData.append(
      "categoryId",
      this.state.data.categoryId
    )
    formData.append(
      "description",
      this.state.data.description
    )
    formData.append(
      "price",
      this.state.data.price
    )

    //console.log("foodVariants:", this.state.foodVariants)
    console.log("########") //test
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log("########") //test
    const res = await this.props.addFoodItem({...this.state.data,foodVariants: this.state.foodVariants});

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message)
      this.props.history.push("/branch-manager/food-item/view-food-items");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  categories: getAllCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllCategories: () => dispatch(thunks.category.getAllCategories()),
  addFoodItem: (foodItemData) => dispatch(thunks.foodItem.addFoodItem(foodItemData))

});

export default connect(mapStateToProps, mapDispatchToProps)(FoodItemAdd);
