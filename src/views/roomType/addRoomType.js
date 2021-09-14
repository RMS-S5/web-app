import {
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend, CInputGroupText, CInvalidFeedback,
  CLabel,
  CRow, CSelect
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

class RoomTypeAdd extends Form {
  state = {
    data: {
      room_type: "",
      description : "",
    },
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    room_type: Joi.string().label("Room Type"),
    description: Joi.string().label("Description"),
  };

  async componentDidMount() {
    this.setState({ loading: false });
  }

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
              header="Add Room Type"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("room_type", "Room Type", "text", {
                      placeholder: "Enter room type",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderTextArea("description", "Room type description", "4", {
                      placeholder: "Enter room type description",
                    }, true)}
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
    formData.append(
        "room_type",
        this.state.data.room_type
    );
    formData.append(
        "description",
        this.state.data.description
    )

    console.log("########") //test
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    console.log("########") //test
    const res = await this.props.addRoomType(formData);

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message)
      this.props.history.push("/manager/room-type");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  addRoomType : (roomTypeData) => dispatch(thunks.roomType.addRoomType(roomTypeData))
});

export default connect(null, mapDispatchToProps)(RoomTypeAdd);
