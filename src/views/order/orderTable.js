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
        { key: "order_id", label: "Order ID", _style: { width: "30%" } },
        { key: "customer_name", label: "Customer", _style: { width: "10%" } },
        { key: "total_amount", label: "Total Amount", _style: { width: "10%" } },
        { key: "table_number", label: "Table Number", _style: { width: "10%" } },
        { key: "branch_name", label: "Branch", _style: { width: "10%" } },
        { key: "order_status", label: "Status", _style: { width: "10%" } },
        { key: "placed_time", label: "Placed Time", _style: { width: "10%" } },
        { key: "waiter_name", label: "Waiter", _style: { width: "10%" } },
        { key: "kitchen_staff_name", label: "Kitchen Staff Member", _style: { width: "10%" } },
    ];

    const getBadge = (status) => {
        switch (status) {
            case "placed":
                return "warning";
            case "preparing":
                return "primary";
            case "prepared":
                return "primary";
            case "waiter_assigned":
                return "primary";
            case "served":
                return "success";
            case "rejected":
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
                                order_status: (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.order_status)} textColor={"white"}> {/*getBadge(item.status) //todo: add order state*/}
                                            {humanize(item.order_status)}
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
