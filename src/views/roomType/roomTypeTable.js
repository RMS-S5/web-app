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
import { thunks , cleanQuery} from "../../store/index";
import {getAllRoomTypes} from "../../store/roomType/select";

const RoomTypeTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const roomTypes = useSelector(getAllRoomTypes);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.roomType.getAllRoomTypes());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleRemoveRoomType = async (room_type) => {
        setLoading(true);
        console.log("remove room type:", room_type)
        const res = await dispatch(thunks.roomType.removeRoomType(room_type)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Room type removed successfully");
        setLoading(false);
    }

    const fields = [
        { key: "room_type", label: "Room Type", _style: { width: "30%" } },
        { key: "description", label: "Description", _style: { width: "10%" } },
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
                    <CCardHeader>RoomType</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={roomTypes}
                            fields={fields}
                            columnFilter
                            // footer
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
                                                    props.history.push(`/manager/room-type/update-room-type/${item.room_type}`);
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
                                                    handleRemoveRoomType(item.room_type);
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

export default RoomTypeTable;
