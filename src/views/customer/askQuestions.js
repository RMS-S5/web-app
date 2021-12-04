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
import { Button } from "react-bootstrap";

class Bookingform extends Form {
  state = {
    data: {
      question: "",
    },
    answer: "",
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    question: Joi.string().label("Question"),
  };

  async sendData() {
    console.log("Sending data...");
  }

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
                {/* <CRow>
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
                </CRow> */}
                <iframe
                  data-cy="dialogflowFrame"
                  chat-title="Rms"
                  width="500"
                  height="600"
                  allow="microphone;"
                  src="https://console.dialogflow.com/api-client/demo/embedded/8b0edd18-d396-4a3e-a9a8-25143140238d"
                ></iframe>

                {/* <Button onClick={this.sendData.bind()} variant="primary"> */}
                {/* Send */}
                {/* </Button> */}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Bookingform);
