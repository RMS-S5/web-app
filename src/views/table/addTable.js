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
import CIcon from "@coreui/icons-react";
import humanize from "../../utils/humanize";

class TableAdd extends Form {
  state = {
    data: {
      tableNumber: "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: false,
  };

  schema = {
    tableNumber: Joi.number().label("Table Number"),
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
              header="Add Table"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("tableNumber", "Table Number", "text", {
                      placeholder: "Enter table number",
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
    formData.append("tableNumber", this.state.data.tableNumber);

    console.log("########"); //test
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log("########"); //test
    const res = await this.props.addTable(this.state.data); //todo:formData

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message);
      this.props.history.push(
        "/branch-manager/table/view-tables"
      );
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  addTable: (tableData) => dispatch(thunks.table.addTable(tableData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableAdd);
