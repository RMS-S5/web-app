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
import { getAllOrders } from "../../store/order/select";


const OrderTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const orders = useSelector(getAllOrders);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.order.getAllOrders());
        if (res.status !== 200) {
            toast.error(res.message);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const fields = [
        { key: "orderId", label: "Order ID", _style: { width: "30%" } },
        { key: "customerName", label: "Customer", _style: { width: "10%" } },
        { key: "totalAmount", label: "Total Amount", _style: { width: "10%" } },
        { key: "tableNumber", label: "Table Number", _style: { width: "10%" } },
        { key: "branchName", label: "Branch", _style: { width: "10%" } },
        { key: "orderStatus", label: "Status", _style: { width: "10%" } },
        { key: "placedTime", label: "Placed Time", _style: { width: "10%" } },
        { key: "waiterName", label: "Waiter", _style: { width: "10%" } },
        { key: "kitchenStaffName", label: "Kitchen Staff Member", _style: { width: "10%" } },
    ];

    const getBadge = (status) => {
        switch (status) {
            case "Placed":
                return "warning";
            case "Preparing":
                return "primary";
            case "Prepared":
                return "primary";
            case "Waiter Assigned":
                return "primary";
            case "Served":
                return "success";
            case "Rejected":
                return "danger";
            default:
                return "light";
        }
    };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Order</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={orders}
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
                                orderStatus: (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.orderStatus)} textColor={"white"}> {/*getBadge(item.status) //todo: add order state*/}
                                            {item.orderStatus}
                                        </CBadge>
                                    </td>
                                ),
                                
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default OrderTable;
