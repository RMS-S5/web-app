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
import { getAllCustomerReports } from "../../store/customerReport/select";


const CustomerReportTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const customerReports = useSelector(getAllCustomerReports);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.customerReport.getAllCustomerReports());
        if (res.status !== 200) {
            toast.error(res.message);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const fields = [
        { key: "id", label: "Order ID", _style: { width: "30%" } },
        { key: "description", label: "Customer", _style: { width: "10%" } },
        { key: "customerName", label: "Total Amount", _style: { width: "10%" } },
        { key: "mobileNumber", label: "Table Number", _style: { width: "10%" } },
        { key: "userId", label: "Branch", _style: { width: "10%" } },
    ];

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Customer Report</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={customerReports}
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
                                
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default CustomerReportTable;
