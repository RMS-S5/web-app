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
import { thunks, cleanQuery } from "../../store/index";
import { getAllBookings } from "../../store/booking/select";


const BookingTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const bookings = useSelector(getAllBookings);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.booking.getAllBookings());
        if (res.status !== 200) {
            toast.error(res.message);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleAcceptBooking = async (id) => {
        setLoading(true);
        console.log("accept booking with id:", id)
        const res = await dispatch(thunks.booking.acceptBooking(id)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Booking accepted successfully");
        setLoading(false);
    }

    const handleRejectBooking = async (id) => {
        setLoading(true);
        console.log("reject booking with id:", id)
        const res = await dispatch(thunks.booking.rejectBooking(id)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Booking rejected successfully");
        setLoading(false);
    }

    const fields = [
        { key: "id", label: "ID", _style: { width: "30%" } },
        { key: "customer_id", label: "Customer ID", _style: { width: "10%" } },
        { key: "customer_name", label: "Customer Name", _style: { width: "10%" } },
        { key: "arrival", label: "Arrival", _style: { width: "10%" } },
        { key: "departure", label: "Departure", _style: { width: "10%" } },
        { key: "status", label: "Status", _style: { width: "10%" } },
        {
            key: "accept",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
        {
            key: "reject",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
    ];

    const getBadge = (status) => {
        switch (status) {
            case "placed":
                return "warning";
            case "accepted":
                return "primary";
            case "lodged":
                return "primary";
            case "completed":
                return "success";
            case "rejected":
                return "danger";
            case "expired":
                return "danger";
            default:
                return "light";
        }
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Booking</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={bookings}
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
                                status: (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.status)} textColor={"white"}> {/*getBadge(item.status) //todo: add booking state*/}
                                            {humanize(item.status)}
                                        </CBadge>
                                    </td>
                                ),
                                accept: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="success"
                                                // variant="outline"
                                                active={item.status === 'placed'}
                                                shape="rounded-pill"
                                                size="sm"
                                                onClick={() => {
                                                    handleAcceptBooking(item.id);
                                                }}
                                            >
                                                Accept
                                            </CButton>
                                        </td>
                                    );
                                },
                                reject: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="danger"
                                                // variant="outline"
                                                active={item.status === 'placed'}
                                                shape="rounded-pill"
                                                size="sm"
                                                onClick={() => {
                                                    handleRejectBooking(item.id);
                                                }}
                                            >
                                                Reject
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

export default BookingTable;
