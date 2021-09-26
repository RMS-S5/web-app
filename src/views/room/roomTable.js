import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import humanize from "../../utils/humanize";
import { thunks , cleanQuery} from "../../store/index";
import {getAllRooms} from "../../store/room/select";


const RoomTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const rooms = useSelector(getAllRooms);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.room.getAllRooms());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleRemoveRoom = async (room_number) => {
        setLoading(true);
        console.log("remove satff member with room_number:", room_number)
        const res = await dispatch(thunks.room.removeRoom(room_number)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Room removed successfully");
        setLoading(false);
    }

    const fields = [
        { key: "room_number", label: "Room Number", _style: { width: "30%" } },
        { key: "capacity", label: "Capacity", _style: { width: "10%" } },
        { key: "room_type", label: "Room Type", _style: { width: "10%" } }, //todo:humanize room type
        { key: "price", label: "Price", _style: { width: "10%" } },
        {
            key: "show_details",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
        {
            key: "remove_item", //todo:change name
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
    ];

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Room</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={rooms}
                            fields={fields}
                            columnFilter
                            footer
                            loading={loading}
                            itemsPerPageSelect
                            itemsPerPage={20}
                            hover
                            sorter
                            pagination
                            scopedSlots={{
                                show_details: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={() => {
                                                    props.history.push(`/branch-manager/room/update-room/${item.room_number}`);
                                                }}
                                            >
                                                Edit
                                            </CButton>
                                        </td>
                                    );
                                },
                                remove_item: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="danger"
                                                // variant="outline"
                                                shape="rounded-pill"
                                                size="sm"
                                                onClick={() => {
                                                    handleRemoveRoom(item.room_number);
                                                }}
                                            >
                                                Remove
                                            </CButton>
                                        </td>
                                    );
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default RoomTable;
