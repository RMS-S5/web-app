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
            room_number: "",
            //branch_id : "", //todo: assign in backend
            capacity: "",
            room_type: "",
            price: "",
        },
        roomTypes: [],
        //status : ["Available" , "Not Available"],
        room_number: "",
        image: "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getRoomByID = (room_number) => {
        console.log(room_number, this.props.rooms);
        const room = this.props.rooms.find((item) => {
            return item.room_number == room_number;
        });
        if (!room) {
            toast.error("Room Not found");
            return;
        }
        return room;
    };

    schema = {
        capacity: Joi.number().optional().label("Capacity"),
        room_type: Joi.string().optional().label("Room Type"),
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
                        value: item.room_type,
                        label: humanize(item.room_type)
                    })
                }
            )
            this.setState({ roomTypes: pairValue, loading: false });

        } else {
            this.setState({ loading: false, error: true });
            toast.error(res.message);
        }

        const room = this.getRoomByID(this.props.match.params.room_number);
        if (room) {
            const updateData = cleanQuery(room,
                ["capacity", "room_type", "price"]); //todo: include status when implemented
            const room_number = room.room_number;
            this.setState({ data: { ...updateData }, room_number });
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
                                            <CInput id="name" readOnly value={this.state.room_number} />
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
                                                "room_type", "Room Type", this.state.roomTypes
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
            "room_type",
            this.state.data.room_type
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

        const res = await this.props.updateRoom(this.state.room_number, formData);

        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/branch-manager/room/view-rooms");
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
    updateRoom: (room_number, roomData) => dispatch(thunks.room.updateRoom(room_number, roomData))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomView);
