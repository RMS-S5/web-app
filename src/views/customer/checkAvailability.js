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
//   import {getAllBranches} from "../../store/staff/select";
//   import {getAllRoles} from "../../store/staff/select";
import { userData } from "../../store/user/select";
import CIcon from "@coreui/icons-react";

class CheckAvailability extends Form {
  state = {
    data: {
      // pCode : "",
      // categoryId : "",
      // pName : "",
      // color : "",
      // size : "",
      // stock : "",
      // price : "",
      // description : "",
      arrival: "",
      departure: "",
      branch_id: "",

      roomType0: "",
      numberOfRooms0: 0,
      roomType1: "",
      numberOfRooms1: 0,
      roomType2: "",
      numberOfRooms2: 0,
      roomType3: "",
      numberOfRooms3: 0,
      seletedTypes: [],
      numberOfTypes: 1,
      maxRoomTypes: 4,
    },
    roomTypes: [
      "Single Room",
      "Double Room",
      "Triple Room",
      "Hollywood Twin Room",
      "Executive Room",
      "Executive Suite",
      "Presidential Suite",
      "Executive Floor",
    ],
    branches: [
      "Main Branch - Horana",
      "Malabe Branch",
      "Thalawathugoda Branch",
      "Kiribathgoda Branch",
    ],
    roomDetails: [],
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: false, // change this to true
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
    //   user_id: Joi.string().label("User ID"),
    //   first_name: Joi.string().label("First Name"),
    //   last_name: Joi.string().label("Last Name"),
    //   email: Joi.string().label("Email"),
    //   password: Joi.string().label("Password"),
    //   account_type: Joi.string().label("Account Type"),
    //   role: Joi.string().label("Role"),
    //   branch_id: Joi.string().label("Branch ID"),
    //   birthday: Joi.string().label("Birthday"),
    //   mobile_number: Joi.string().label("Mobile Number"),
    //     nic: Joi.string().label("NIC"),

    roomType: Joi.string().label("Room Type"),
    numberOfRooms: Joi.number().label("number of rooms"),
    numberOfTypes: Joi.number()
      .integer()
      .min(1)
      .max(4)
      .label("number of rooms"),
    branch_id: Joi.string().label("Branch ID"),
    arrival: Joi.string().label("Arrival"),
    departure: Joi.string().label("Departure"),
    seletedTypes: Joi.array().items(Joi.string().allow("")),
    maxRoomTypes: Joi.number().integer().label("number of rooms"),
    roomType0: Joi.string().label("Room type"),
    roomType1: Joi.string().allow("").label("Room type"),
    roomType2: Joi.string().allow("").label("Room type"),
    roomType3: Joi.string().allow("").label("Room type"),
    numberOfRooms0: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .label("number of rooms"),
    numberOfRooms1: Joi.number()
      .integer()
      .min(0)
      .max(5)
      .label("number of rooms"),
    numberOfRooms2: Joi.number()
      .integer()
      .min(0)
      .max(5)
      .label("number of rooms"),
    numberOfRooms3: Joi.number()
      .integer()
      .min(0)
      .max(5)
      .label("number of rooms"),
  };

  async componentDidMount() {
    //dispatch the event to get the categories
    //set to the local states
    //const res = await this.props.getAllCategories();
    // if (res.status === 200) {
    //   const categoriesData = this.props.categories;
    //   let pairValue = [];
    //   categoriesData.forEach(
    //       (item, index) => {
    //         pairValue.push({
    //           value : item.categoryId,
    //           label : item.name
    //         })
    //       }
    //   )
    //   this.setState({ categories:pairValue,loading: false });
    // } else {
    //   this.setState({ loading: false, error: true });
    //   toast.error(res.message);
    // }
    // let res = await this.props.getAllBranches();
    // if (res.status === 200) {
    //   const branchesData = this.props.branches;
    //   let pairValue = [];
    //   branchesData.forEach((item, index) => {
    //     pairValue.push({
    //       value: item.branch_id,
    //       label: item.name,
    //     });
    //   });
    //   this.setState({ branches: pairValue, loading: false });
    // } else {
    //   this.setState({ loading: false, error: false }); //todo:cahnge
    //   toast.error(res.message);
    // }
    // remove this
    // let res = await this.props.getAllRoomTypes();
    // if (res.status === 200) {
    //   const roomTypes = this.props.room_types;
    //   let pairValue = [];
    //   roomTypes.forEach((item, index) => {
    //     pairValue.push({
    //       value: item.room_type,
    //       label: item.description,
    //     });
    //   });
    //   this.setState({ rooms: pairValue, loading: false });
    // } else {
    //   this.setState({ loading: false, error: false }); //todo:cahnge
    //   toast.error(res.message);
    // }
    // res = await this.props.getAllRoles();
    // if (res.status === 200) {
    //   const rolesData = this.props.roles;
    //   let pairValue = [];
    //   rolesData.forEach((item, index) => {
    //     pairValue.push({
    //       value: item.role_id,
    //       label: item.description,
    //     });
    //   });
    //   this.setState({ roles: pairValue, loading: false });
    // } else {
    //   this.setState({ loading: false, error: false }); //todo:cahnge
    //   toast.error(res.message);
    // }
  }

  componentWillUnmount() {
    toast.dismiss();
  }

  render() {
    return (
      <CContainer>
        <script
          type="text/javascript"
          src="https://www.payhere.lk/lib/payhere.js"
        ></script>
        <CRow>
          <CCol>
            <CardContainer error={this.state.error} header="Check availability">
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                      "branch_id",
                      "Branch",
                      this.state.branches
                    )}
                    {console.log(this.state.data.branch_id)}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("arrival", "Arrival", "date", {
                      placeholder: "Enter the date of arrival",
                    })}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderInput("departure", "Departure", "date", {
                      placeholder: "Enter the date of departure",
                    })}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                      "numberOfTypes",
                      "Number of Room Types",
                      Array.from(
                        new Array(this.state.data.maxRoomTypes),
                        (x, i) => i + 1
                      )
                    )}
                  </CCol>
                  {console.log("hey", this.state.data.numberOfTypes)}
                </CRow>
                <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                      "roomType0",
                      "Room Type",
                      this.state.roomTypes
                    )}
                    {/* {console.log(this.state.data.roomType0)} */}
                  </CCol>
                  <CCol xs="12" md="6">
                    {this.renderInput(
                      "numberOfRooms0",
                      "Number of Rooms",
                      "number",
                      {
                        placeholder: "number of rooms", // todo:remove since id is autogenerated
                      }
                    )}
                    {/* {console.log(this.state.data.numberOfRooms0)} */}
                  </CCol>

                  {this.AddToRoomDetails(0)}
                </CRow>
                {this.AddMoreRooms()}

                {/* <CRow>
                  <CCol xs="12" md="6">
                    {this.renderSelectWithLabelValue(
                      "branch",
                      "Branch",
                      this.state.branches
                    )}
                  </CCol>
                </CRow> */}

                <CRow>
                  <CCol>
                    {this.renderButton(
                      "Check Availability",
                      "success",
                      "danger"
                    )}
                  </CCol>
                </CRow>
              </CForm>
            </CardContainer>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  AddMoreRooms() {
    console.log(this.state.data.numberOfTypes);
    if (this.state.data.numberOfTypes > 1) {
      let rows = [];
      for (let i = 1; i < this.state.data.numberOfTypes; i++) {
        rows.push(
          <CRow key={i}>
            <CCol xs="12" md="6">
              {this.renderSelectWithLabelValue(
                "roomType" + i,
                "Room Type",
                this.state.roomTypes.filter(
                  (item) =>
                    !this.state.data.seletedTypes
                      .splice(i, i + 1)
                      .includes(item)
                )
              )}
              {console.log("roomType" + i)}
            </CCol>
            <CCol xs="12" md="6">
              {this.renderInput(
                "numberOfRooms" + i,
                "Number of Rooms",
                "number",
                {
                  placeholder: "number of rooms", // todo:remove since id is autogenerated
                }
              )}
            </CCol>

            {this.AddToRoomDetails(i)}
          </CRow>
        );
      }

      return <React.Fragment>{rows}</React.Fragment>;
    }
  }

  AddToRoomDetails(index) {
    this.state.data.seletedTypes = [
      this.state.data.roomType0,
      this.state.data.roomType1,
      this.state.data.roomType2,
      this.state.data.roomType3,
    ];
    let type = "roomType" + index;
    let rooms = "numberOfRooms" + index;
    // console.log(this.state.data);
    // console.log(type);
    // console.log(this.state.data[type]);
    // console.log(this.state.data[rooms]);
    this.state.roomDetails[index] = {
      roomType: this.state.data[type],
      numberOfRooms: this.state.data[rooms],
    };
    console.log(this.state.roomDetails);
    return;
  }

  async callServer() {
    this.setState({ spinner: true });
    console.log("server");

    const formData = new FormData();
    // Update the formData object
    formData.append("arrival", this.state.data.arrival);
    formData.append("departure", this.state.data.departure);
    formData.append("branch", this.state.data.branch_id);
    formData.append("roomData", this.state.roomDetails);

    //const res = await this.props.checkAvailability(formData);
    if (
      new Date().getTime() <= new Date(this.state.data.arrival).getTime() &&
      new Date(this.state.data.arrival) < new Date(this.state.data.departure)
    ) {
      const res = { status: 200 }; //await this.props.checkAvailability(formData);
      this.setState({ spinner: false });
      if (res.status === 200) {
        toast.success("rooms are available");
        this.props.history.push("/customer/booking-form");
      } else {
        if (res.status !== 200) toast.error("rooms are not available");
      }
    } else {
      this.setState({ spinner: false });
      toast.error("Dates are invalid");
    }
  }
}

const mapStateToProps = (state) => ({
  // roomTypes: getAllRoomTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  //   getAllRoomTypes: () => dispatch(thunks.roomTypes.getAllRoomTypes()),
  //  checkAvailability: (roomData) =>
  //     dispatch(thunks.roomType.checkAvailability(roomData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckAvailability);
