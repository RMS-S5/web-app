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
  CButton,
  CDataTable,
  CRow,
} from "@coreui/react";
import CardContainer from "../../components/common/CardContainer";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import image1 from "../../assets/img/3.jpg";
import image2 from "../../assets/img/double.jpg";
import image3 from "../../assets/img/triple.jpg";

import image4 from "../../assets/img/doanu_hollywood_twin.jpg";
import image5 from "../../assets/img/executive.jpg";
import image6 from "../../assets/img/Executive-Suite.jpg";
import { Card, Col, Row, Button } from "react-bootstrap";
import { thunks } from "../../store/index";
import { getAllAvailableRoomsByBranch } from "../../store/room/select";
import api from "../../api";
import { getUserData } from "../../store/user/select";

class CategoryView extends Form {
  state = {
    data: {
      amount: 0,
    },
    roomData: [],
    selectedRoomData: [],
    // roomTypes: [
    // "Single Room",
    // "Double Room",
    // "Triple Room",
    // "Hollywood Twin Room",
    // "Executive Room",
    // "Executive Suite",
    // ],
    // roomDescriptions: [
    //   "A room assigned to one person. May have one or more beds. The room size or area of Single Rooms are generally between 37 m² to 45 m².",
    //   "A room assigned to two people. May have one or more beds. The room size or area of Double Rooms are generally between 40 m² to 45 m².",
    //   "A room that can accommodate three persons and has been fitted with three twin beds, one double bed and one twin bed or two double beds. The room size or area of Triple Rooms are generally between 45 m² to 65 m².",
    //   "A room that can accommodate two persons with two twin beds joined together by a common headboard. The room size or area of Hollywood Twin Rooms are generally between 32 m² to 40 m².",
    //   "A parlour or living room connected with to one or more bedrooms. The room size or area of Suite rooms are generally between 70 m² to 100 m².",
    //   "A room with one or more bedrooms and a separate living space. The room size or area of Suite rooms are generally between 70 m² to 100 m².",
    // ],
    images: [image1, image4, image3, image4, image1, image3],
    status: ["Available", "Not Available"],
    fields: [
      { key: "roomNumber", label: "Room Number", _style: { width: "30%" } },
      { key: "roomType", label: "Room Category", _style: { width: "10%" } },

      { key: "capacity", label: "Capacity", _style: { width: "10%" } },
      { key: "price", label: "Price", _style: { width: "10%" } },

      {
        key: "remove_item", //todo:change name
        label: "",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
    ],
    room_image: {
      "Single Room": image1,
      "Double Room": image2,
      "Triple Room": image3,
      "Hollywood Twin Room": image4,
      "Executive Room": image5,
      "Executive Suite": image6,
    },
    pCode: "",
    image: "",
    bookingBranchData: [],
    errors: {},
    btnDisable: false,
    spinner: false,
    loading: false,
  };
  schema = {
    // roomType: Joi.string().label("Room Type"),
    // numberOfRooms: Joi.number().label("number of rooms"),
    // numberOfTypes: Joi.number()
    //   .integer()
    //   .min(1)
    //   .max(4)
    //   .label("number of rooms"),
    amount: Joi.number().min(0).label("Amount"),
    arrival: Joi.string().label("Arrival"),
    departure: Joi.string().label("Departure"),
  };

  updateAmount() {
    let currentAmount = 0;
    this.state.selectedRoomData.forEach((element) => {
      currentAmount += parseInt(element.price);
    });
    this.state.data.amount = currentAmount;
  }

  addRoom(index, roomData) {
    this.state.selectedRoomData.push(roomData);
    console.log(this.state.roomData);
    let roomData1 = [];
    for (let i = 0; i < this.state.roomData.length; i++) {
      roomData1.push(this.state.roomData[i]);
    }
    console.log(roomData1);
    roomData1.splice(index, 1);
    console.log(roomData1);

    this.updateAmount();
    this.setState({ roomData: roomData1 });

    // console.log(roomData, "clicked");
  }

  deleteRoom(roomNumber) {
    let selectedRoomNumbers = [];
    let selectedRoomData = this.state.selectedRoomData.filter(function (
      value,
      index,
      arr
    ) {
      return value.roomNumber !== roomNumber;
    });
    selectedRoomData.forEach((room) => {
      selectedRoomNumbers.push(room.roomNumber);
    });
    console.log(selectedRoomNumbers);
    let currentStateRoomData = [];
    for (let i = 0; i < this.props.roomData.length; i++) {
      if (!selectedRoomNumbers.includes(this.props.roomData[i].roomNumber)) {
        currentStateRoomData.push(this.props.roomData[i]);
      }
    }

    this.setState({
      selectedRoomData: selectedRoomData,
      roomData: currentStateRoomData,
    });
    console.log(this.state.selectedRoomData);
    let currentAmount = 0;
    selectedRoomData.forEach((element) => {
      currentAmount += parseInt(element.price);
    });
    this.state.data.amount = currentAmount;
  }

  async componentDidMount() {
    console.log(this.props);
    if (this.props.location.hasOwnProperty("bookingBranchData")) {
      this.state.bookingBranchData = this.props.location.bookingBranchData;
      const roomData = await this.props.getAllAvailableRoomsByBranch({
        branchId: this.props.location.bookingBranchData.branchId,
        arrival: this.props.location.bookingBranchData.arrival,
        departure: this.props.location.bookingBranchData.departure,
      });
      console.log(roomData);
      // console.log(roomData);
      // console.log(this.props);
      //this.state.roomData = [...this.props.roomData];
      this.setState({ roomData: roomData });
      // const roomData = await api.branch.get.allAvailableRoomsByBranch(
      //   this.state.bookingBranchData.branchId
      // );
      // console.log(roomData);
      // this.state.roomData = roomData[1];
      // this.props.useE;
      // console.log(this.state.roomData);
    } else {
      this.setState({ roomData: [] });
      toast.error("Data Not found, Start booking again");
    }
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
                    {this.renderInput("amount", "Amount", "text", {
                      placeholder: "Amount",
                      disabled: true,
                    })}
                  </CCol>
                </CRow>

                <h4>Selected rooms</h4>

                <CDataTable
                  items={this.state.selectedRoomData}
                  fields={this.state.fields}
                  columnFilter
                  footer
                  loading={this.state.loading}
                  itemsPerPageSelect
                  itemsPerPage={10}
                  hover
                  sorter
                  pagination
                  scopedSlots={{
                    // status: (item) => (
                    //     <td>
                    //         <CBadge color={getBadge(item.status)} textColor={"white"}>  //todo: add availability
                    //             {item.status}
                    //         </CBadge>
                    //     </td>
                    // ),
                    remove_item: (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="danger"
                            // variant="outline"
                            shape="rounded-pill"
                            size="sm"
                            onClick={this.deleteRoom.bind(
                              this,
                              item.roomNumber
                            )}
                          >
                            Remove
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
                <hr />
                <CRow className="mb-3">
                  <CCol>
                    {this.renderButton("Confirm Rooms", "success", "danger")}
                  </CCol>
                </CRow>
                {/* {this.componentDidMount()} */}
                {console.log(this.state.roomData.length)}
                <Row xs={1} md={3} className="g-10">
                  {/* Array.from({ length: 4 }) */}
                  {this.state.roomData.map((_, idx) => (
                    <Col id={idx} key={idx}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={
                            this.state.room_image[
                              this.state.roomData[idx].roomType
                            ]
                          }
                        />
                        {console.log(this.state.roomData[idx].roomType)}
                        <Card.Body>
                          <Card.Title>
                            {this.state.roomData[idx].roomType}
                          </Card.Title>
                          <Card.Text>
                            Room Number: {this.state.roomData[idx].roomNumber}
                            <br />
                            Capacity:{" "}
                            {this.state.roomData[idx].capacity === 1
                              ? "One Person"
                              : this.state.roomData[idx].capacity.toString()}
                            {this.state.roomData[idx].capacity === 1
                              ? ""
                              : "Persons"}
                            <br />
                            Price (Rs) : {this.state.roomData[idx].price}
                          </Card.Text>
                          <Button
                            key={idx}
                            onClick={this.addRoom.bind(
                              this,
                              idx,
                              this.state.roomData[idx]
                            )}
                            variant="primary"
                          >
                            Add
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </CForm>
            </CardContainer>
          </CCol>
        </CRow>
      </CContainer>
    );
  }
  async callServer() {
    this.setState({ spinner: true });
    console.log("server");

    console.log(this.state.data.amount);
    if (this.state.data.amount <= 0) {
      toast.error("Add rooms to continue");
    } else {
      console.log(this.state.selectedRoomData);
      if (this.props.userData.accountType === "Receptionist") {
        this.props.history.push({
          pathname: "/receptionist/booking-form",
          branchData: this.state.bookingBranchData,
          roomData: {
            amount: this.state.data.amount,
            rooms: this.state.selectedRoomData,
          },
        });
      } else {
        this.props.history.push({
          pathname: "/customer/booking-form",
          branchData: this.state.bookingBranchData,
          roomData: {
            amount: this.state.data.amount,
            rooms: this.state.selectedRoomData,
          },
        });
      }
    }

    //const res = await this.props.checkAvailability(formData);
    // if (
    //   (new Date().getTime() < new Date(this.state.data.arrival).getTime() ||
    //     new Date().toString() ===
    //       new Date(this.state.data.arrival).toString()) &&
    //   new Date(this.state.data.arrival) < new Date(this.state.data.departure)
    // ) {
    //   // const res = { status: 200 }; //await this.props.checkAvailability(formData);
    //   // this.props.push(this.state.data.branchId);
    //   toast.success("rooms are available");
    //   // this.props.saveBookingBranchData({
    //   //   arrival: this.state.data.arrival,
    //   //   departure: this.state.data.departure,
    //   //   branchId: this.state.data.branchId,
    //   // });
    //   // console.log(this.props);
    // this.props.history.push({
    //   pathname: "/customer/add-booking-rooms",
    //   bookingBranchData: {
    //     arrival: this.state.data.arrival,
    //     departure: this.state.data.departure,
    //     branchId: this.state.data.branchId,
    //   },
    // });
    // } else {
    //   this.setState({ spinner: false });
    //   toast.error("Dates are invalid");
    // }
  }
}

const mapStateToProps = (state) => ({
  userData: getUserData(state),
  roomData: getAllAvailableRoomsByBranch(state),
});

const mapDispatchToProps = (dispatch) => ({
  //getAllCategories : () => dispatch(thunks.product.getAllCategory()),
  // updateCategoryData : (categoryId, categoryData) => dispatch(thunks.product.updateCategory(categoryId,categoryData))
  getAllAvailableRoomsByBranch: (branchId) =>
    dispatch(thunks.room.getAllAvailableRoomsByBranch(branchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
