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
//import {getAllCategories} from "../../store/product/select"; //todo:change
import {getAllRoomTypes} from "../../store/roomType/select";
import CIcon from "@coreui/icons-react";
import humanize from "../../utils/humanize";

class RoomAdd extends Form {
  state = {
    data: {
      roomNumber : "",
      //branchId : "", //todo: assign in backend
      capacity : "",
      roomType : "",
      price : "",
    },
    roomTypes:[],
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: true,
  };

  schema = {
    roomNumber: Joi.number().label("Room Number"),
    capacity: Joi.number().label("Capacity"),
    roomType: Joi.string().label("Room Type"),
    price: Joi.number().label("Price"),

  };

  async componentDidMount() {

    let res = await this.props.getAllRoomTypes();
    if (res.status === 200) {
      const roomTypesData = this.props.roomTypes;
      let pairValue = [];
      roomTypesData.forEach(
          (item, index) => {
            pairValue.push({
              value : item.roomType, //todo:solve snake case camel case issue
              label : item.roomType //todo:solve snake case camel case issue
            })
          }
      )
      this.setState({ roomTypes:pairValue,loading: false });
    } else {
      this.setState({ loading: false, error: true }); //todo:set error to true
      toast.error(res.message);
    }
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
              header="Add Room"
            >
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("roomNumber", "Room Number", "text", {
                      placeholder: "Enter room number",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("capacity", "Capacity", "text", {
                      placeholder: "Enter capacity",
                    })}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                        "roomType", "Room Type", this.state.roomTypes
                    )}
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
        "roomNumber",
        this.state.data.roomNumber
    )
    formData.append(
        "capacity",
        this.state.data.capacity
    )
    formData.append(
        "roomType",
        this.state.data.roomType
    )
    formData.append(
        "price",
        this.state.data.price
    )

    console.log("########") //test
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    console.log("########") //test
    const res = await this.props.addRoom(this.state.data);  //todo:formData

    this.setState({ spinner: false });

    if (res.status === 200) {
      toast.success(res.message)
      this.props.history.push("/branch-manager/room/view-rooms");
    } else {
      if (res.status !== 200) toast.error(res.message);
    }
  }
}

const mapStateToProps = (state) => ({
  roomTypes: getAllRoomTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllRoomTypes : () => dispatch(thunks.roomType.getAllRoomTypes()),
  addRoom : (roomData) => dispatch(thunks.room.addRoom(roomData))

});

export default connect(mapStateToProps, mapDispatchToProps)(RoomAdd);
