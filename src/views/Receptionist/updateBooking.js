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
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import api from "../../api/index";
import { thunks } from "../../store/index";
import { getAllBookings } from "../../store/customer/select";
import { getUserData } from "../../store/user/select";
import { Card, Col, Row, Button } from "react-bootstrap";
import previousBookings from "../customer/previousBookings";

class Bookingform extends Form {
  state = {
    data: {
      answer: "",
      question: "",
    },
    previousBookings: [],
    currentUser: [],
    fields: [
      {
        key: "branchName",
        label: "Branch Name",
        _style: { width: "30%" },
      },
      {
        key: "roomNumbers",
        label: "Room Numbers",
        _style: { width: "10%" },
        sorter: false,
      },

      { key: "arrival", label: "Arrival", _style: { width: "10%" } },
      { key: "departure", label: "Departure", _style: { width: "10%" } },
      { key: "amount", label: "Amount", _style: { width: "10%" } },
      { key: "status", label: "Status", _style: { width: "10%" } },

      {
        key: "update_item", //todo:change name
        label: "",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
    ],
    errors: {},
    btnDisable: false,
    spinner: false,
    error: false,
    loading: false,
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
    question: Joi.string().label("Question"),
    first_name: Joi.string().label("First Name"),
    last_name: Joi.string().label("Last Name"),
    email: Joi.string().label("Email"),

    mobile_number: Joi.string().label("Mobile Number"),
    nic: Joi.string().label("NIC"),
  };

  async updateStatus(item) {
    console.log(item, this.state.previousBookings);
    let updatedBookings = [...this.state.previousBookings];
    if (item.status === "Accepted") {
      let res = await api.booking.update.bookingStatus({
        bookingId: item.bookingId,
        updatedStatus: "Lodged",
      });
      if (res[0].status === 200) {
        toast.success("updated booking status");
        let index = updatedBookings.findIndex(
          (x) => x.bookingId === item.bookingId
        );
        updatedBookings[index].status = "Lodged";
        this.setState({ previousBookings: updatedBookings });
      } else {
        toast.error("error in updating status");
      }
    } else if (item.status === "Lodged") {
      let res = await api.booking.update.bookingStatus({
        bookingId: item.bookingId,
        updatedStatus: "Completed",
      });
      if (res[0].status === 200) {
        toast.success("updated booking status");
        let index = updatedBookings.findIndex(
          (x) => x.bookingId === item.bookingId
        );
        updatedBookings[index].status = "Completed";
        this.setState({ previousBookings: updatedBookings });
      } else {
        toast.error("error in updating status");
      }
    }
  }

  async componentDidMount() {
    console.log(this.props.currentUser.userId);
    const lbookings = await api.booking.get.bookingsforRE();
    const bookings = lbookings[1];
    console.log(bookings);
    let previousBookings = [];
    let bookingIds = [];
    console.log(bookings);
    if (bookings) {
      for (let i = 0; i < bookings.length; i++) {
        if (bookingIds.includes(bookings[i].bookingId)) {
          previousBookings[
            bookingIds.indexOf(bookings[i].bookingId)
          ].roomNumbers.push(bookings[i].roomNumber);
        } else {
          previousBookings.push({
            bookingId: bookings[i].bookingId,
            arrival: bookings[i].arrival.substring(0, 10),
            departure: bookings[i].departure.substring(0, 10),
            branchName: bookings[i].branchName,
            roomNumbers: [bookings[i].roomNumber],
            amount: bookings[i].amount,
            status: bookings[i].status,
          });
          bookingIds.push(bookings[i].bookingId);
        }
      }
      console.log("pre", previousBookings);
      this.setState({ previousBookings: previousBookings });
    } else {
      toast.error("No Accepted or Lodged Bookings");
    }

    // if (res.status === 200) {
    //   console.log(this.props.previousBookings);
    //   console.log(this.props);
    //   this.state.previousBookings = this.props.previousBookings;
    // const category = this.getCategoryById(this.props.match.params.categoryId);
    // if (category) {
    //   const categoryId = this.props.match.params.categoryId;
    //   const updateData = cleanQuery(category, [
    //     "status",
    //     "name",
    //     "description",
    //   ]);
    //   this.setState({ data: { ...updateData }, categoryId });
    // } else {
    //   this.setState({ loading: false, error: true });
    //   toast.error("Category not found");
    // }
    // } else {
    //   this.setState({ loading: false, error: true });
    // toast.error(res.message);
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
            <CardContainer
              error={this.state.error}
              header="Accepted and Lodged Bookings"
            >
              <CForm onSubmit={this.handleSubmit}>
                {/* <CRow>
                    <CCol xs="12" md="6">
                      {this.renderInput("amount", "Amount", "text", {
                        placeholder: "your amo",
                        disabled: true,
                      })}
                    </CCol>
                  </CRow> */}

                <h5>
                  Note: Update button automatically updates the booking status
                  to the next status
                </h5>

                <CDataTable
                  items={this.state.previousBookings}
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
                    update_item: (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="danger"
                            // variant="outline"
                            shape="rounded-pill"
                            size="sm"
                            onClick={this.updateStatus.bind(this, item)}
                          >
                            Update Status
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
                <hr />
                {/* <CRow className="mb-3">
                    <CCol>
                      {this.renderButton("Confirm Rooms", "success", "danger")}
                    </CCol>
                  </CRow>
                  {console.log(this.state.roomData.length)}
                  <Row xs={1} md={3} className="g-10">
                    {this.state.roomData.map((_, idx) => (
                      <Col key={idx}>
                        <Card>
                          <Card.Img variant="top" src={image3} />
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
                  </Row> */}
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

const mapStateToProps = (state) => ({
  currentUser: getUserData(state),
  // previousBookings: getAllBookings(state),
  // branches: getAllBranches(state),
  // roles: getAllRoles(state),
});

const mapDispatchToProps = (dispatch) => ({
  //   getAllBookings: (customerId) =>
  //     dispatch(thunks.customer.getAllPreviousBookings(customerId)),
  // addProduct : (productData) => dispatch(thunks.product.addProduct(productData))
  // getAllBranches : () => dispatch(thunks.staff.getAllBranches()),
  // getAllRoles : () => dispatch(thunks.staff.getAllRoles()),
  // addBookingData : (bookingData) => dispatch(thunks.booking.addBookingData(bookingData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookingform);
