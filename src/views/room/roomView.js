import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm, CInput, CLabel,
    CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks, cleanQuery } from "../../store/index";
import { getAllRooms } from "../../store/room/select";
import { getAllRoomTypes } from "../../store/roomType/select";
import humanize from "../../utils/humanize";

class RoomView extends Form {
    state = {

        data: {
            capacity: "",
            roomType: "",
            price: "",
        },
        roomTypes: [],
        //status : ["Available" , "Not Available"],
        roomNumber: "",
        //branchId: "", //assigned in backend
        image: "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getRoomByID = (roomNumber) => {
        console.log(roomNumber, this.props.rooms);
        const room = this.props.rooms.find((item) => {
            return item.roomNumber == roomNumber;
        });
        if (!room) {
            toast.error("Room Not found");
            return;
        }
        return room;
    };

    schema = {
        capacity: Joi.number().optional().label("Capacity"),
        roomType: Joi.string().optional().label("Room Type"),
        price: Joi.number().optional().label("Price"),
    };

    async componentDidMount() {
        const res = await this.props.getAllRoomTypes();
        const res1 = await this.props.getAllRooms();
        if (res.status === 200 && res1.status === 200) {
            const roomTypesData = this.props.roomTypes;
            let pairValue = [];
            roomTypesData.forEach(
                (item, index) => {
                    pairValue.push({
                        value: item.roomType, //todo:solve snake case camel case issue
                        label: item.roomType //todo:solve snake case camel case issue
                    })
                }
            )
            this.setState({ roomTypes: pairValue, loading: false });

        } else {
            this.setState({ loading: false, error: true });
            toast.error(res.message);
        }

        const room = this.getRoomByID(this.props.match.params.roomNumber);
        if (room) {
            const updateData = cleanQuery(room,
                ["capacity", "roomType", "price"]); //todo: include status when implemented
            const roomNumber = room.roomNumber;
            this.setState({ data: { ...updateData }, roomNumber });
        }
    }

    componentWillUnmount() {
        toast.dismiss();
    }

    render() {
        return (
            <CContainer>
                <CRow>
                    <CCol xs="12" md="12">
                        <CCard>
                            <CCardHeader>Change Room</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="name">Room Number</CLabel>
                                            <CInput id="name" readOnly value={this.state.roomNumber} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("capacity", "Capacity", "text", {
                                                placeholder: "Enter capacity",
                                            }, false)}
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
                                    {this.renderButton("Submit", "primary", "danger")}

                                </CForm>
                            </CCardBody>
                        </CCard>
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
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log("########") //test

        const res = await this.props.updateRoom(this.state.roomNumber, this.state.data);

        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/branch-manager/room/view-rooms"); //todo:formData
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    rooms: getAllRooms(state),
    roomTypes: getAllRoomTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
    getAllRooms: () => dispatch(thunks.room.getAllRooms()),
    getAllRoomTypes: () => dispatch(thunks.roomType.getAllRoomTypes()),
    updateRoom: (roomNumber, roomData) => dispatch(thunks.room.updateRoom(roomNumber, roomData))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomView);
