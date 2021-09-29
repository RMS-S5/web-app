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
import CIcon from "@coreui/icons-react";
import humanize from "../../utils/humanize";

class CategoryAdd extends Form {
  state = {
    data: {
      categoryName: "",
      description: "",
    },
    image: "",
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    categoryName: Joi.string().label("Category Name"),
  };

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
              header="Add Category"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("categoryName", "Category Name", "text", {
                      placeholder: "Enter category name",
                    })}
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
                    {this.renderImageInput(
                      "image",
                      "Category Image",
                      "file",
                      {
                        placeholder: "Upload Category image",
                      },
                      true
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
    formData.append("categoryName", this.state.data.categoryName);
    formData.append("description", this.state.data.description);
    formData.append("image", this.state.image);

    console.log("########"); //test
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log("########"); //test
    const res = await this.props.addCategory(this.state.data); //todo:formData

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message);
      this.props.history.push(
        "/manager/category/view-categories"
      );
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (categoryData) => dispatch(thunks.category.addCategory(categoryData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);
