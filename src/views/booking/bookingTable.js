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

    const handleAcceptBooking = async (bookingId) => {
        setLoading(true);
        console.log("accept booking with bookingId:", bookingId)
        const res = await dispatch(thunks.booking.acceptBooking(bookingId)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Booking accepted successfully");
        setLoading(false);
    }

    const handleRejectBooking = async (bookingId) => {
        setLoading(true);
        console.log("reject booking with bookingId:", bookingId)
        const res = await dispatch(thunks.booking.rejectBooking(bookingId)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Booking rejected successfully");
        setLoading(false);
    }

    const fields = [
        { key: "bookingId", label: "ID", _style: { width: "30%" } },
        { key: "customerId", label: "Customer ID", _style: { width: "10%" } },
        { key: "customerName", label: "Customer Name", _style: { width: "10%" } },
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
            case "Placed":
                return "warning";
            case "Accepted":
                return "primary";
            case "Lodged":
                return "primary";
            case "Completed":
                return "success";
            case "Rejected":
                return "danger";
            case "Expired":
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
                                            {item.status}
                                        </CBadge>
                                    </td>
                                ),
                                accept: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="success"
                                                // variant="outline"
                                                disabled={item.status !== 'Placed'}
                                                shape="rounded-pill"
                                                size="sm"
                                                onClick={() => {
                                                    handleAcceptBooking(item.bookingId);
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
                                                disabled={item.status !== 'Placed'}
                                                shape="rounded-pill"
                                                size="sm"
                                                onClick={() => {
                                                    handleRejectBooking(item.bookingId);
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
