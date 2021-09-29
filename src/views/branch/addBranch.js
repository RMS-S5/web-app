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

class BranchAdd extends Form {
  state = {
    data: {
      branchName: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    branchName: Joi.string().label("Branch Name"),
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
              header="Add Branch"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("branchName", "Branch Name", "text", {
                      placeholder: "Enter first name",
                    })}
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
    formData.append("branchName", this.state.data.branchName);

    console.log("########"); //test
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log("########"); //test
    const res = await this.props.addBranch(this.state.data); //todo:formData

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message);
      this.props.history.push(
        "/manager/branch/view-branches"
      );
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  addBranch: (branchData) => dispatch(thunks.staff.addBranch(branchData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BranchAdd);
