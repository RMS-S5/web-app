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
import { getAllRoomTypes } from "../../store/roomType/select";

class RoomTypeView extends Form {
    state = {

        data: {
            description: "",
        },
        roomType: "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getRoomTypeByID = (roomType_pk) => {
        console.log("#######"); //test
        console.log(roomType_pk, this.props.roomTypes);
        const roomType = this.props.roomTypes.find((item) => {
            return item.roomType == roomType_pk;
        });
        if (!roomType) {
            toast.error("Room Type Not found");
            return;
        }
        return roomType;
    };

    schema = {
        description: Joi.string().optional().label("Description"),
    };

    async componentDidMount() {

        const res = await this.props.getAllRoomTypes();

        if (res.status === 200) {

        } else {
            this.setState({ loading: false, error: true });
            toast.error(res.message);
        }

        console.log("roomType", this.props.match.params)
        const roomType = this.getRoomTypeByID(this.props.match.params.roomType);
        if (roomType) {
            const updateData = cleanQuery(roomType,
                ["description"]);
            const roomType_pk = roomType.roomType;
            this.setState({ data: { ...updateData }, roomType: roomType_pk });
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
                            <CCardHeader>Change Room Type</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="name">Room Type</CLabel>
                                            <CInput id="name" readOnly value={this.state.roomType} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("description", "Description", "text", {
                                                placeholder: "Enter description",
                                            }, false)}
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
            "description",
            this.state.data.description
        );

        console.log("########") //test
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log("########") //test

        const res = await this.props.updateRoomType(this.state.roomType, formData);

        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/manager/room-type/view-room-types");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    roomTypes: getAllRoomTypes(state)
});

const mapDispatchToProps = (dispatch) => ({
    getAllRoomTypes: () => dispatch(thunks.roomType.getAllRoomTypes()),
    updateRoomType: (roomType, roomTypeData) => dispatch(thunks.roomType.updateRoomType(roomType, roomTypeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeView);
