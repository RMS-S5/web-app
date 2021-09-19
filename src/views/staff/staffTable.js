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
import {getAllStaffm} from "../../store/staff/select";

const StaffTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const staffm = useSelector(getAllStaffm);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.staff.getAllStaffm());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleRemoveStaff = async (user_id) => {
        setLoading(true);
        console.log("remove satff member with user_id:", user_id)
        const res = await dispatch(thunks.staff.removeStaff(user_id)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Staff member removed successfully");
        setLoading(false);
    }

    const fields = [
        { key: "user_id", label: "User ID", _style: { width: "30%" } },
        { key: "first_name", label: "First Name", _style: { width: "10%" } },
        { key: "last_name", label: "Last Name", _style: { width: "10%" } },
        { key: "email", label: "Email", _style: { width: "10%" } },
        { key: "account_type", label: "Account Type", _style: { width: "10%" } },
        { key: "role", label: "Role", _style: { width: "10%" } },
        { key: "branch_name", label: "Branch", _style: { width: "10%" } }, 
        { key: "status",label: "Status", _style: { width: "10%" } },
        { key: "birthday",label: "Birthday", _style: { width: "10%" } },
        { key: "mobile_number", label: "Mobile Number", _style: { width: "10%" } },
        { key: "nic", label: "NIC", _style: { width: "10%" } },
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

    const getBadge = (status) => {
        switch (status) {
            case "employed":
                return "primary";
            case "available":
                return "success";
            case "unavailable":
                return "warning";
            case "resigned":
                return "danger";
            default:
                return "light";
        }
    };

    function humanize(str) {
        var i, frags = str.split('_');
        for (i=0; i<frags.length; i++) {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Staff</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={staffm}
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
                                        <CBadge color={getBadge(item.status)} textColor={"white"}> {/*getBadge(item.status) //todo: add staff state*/}
                                            {humanize(item.status)}
                                        </CBadge>
                                    </td>
                                ),
                                show_details: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={() => {
                                                    props.history.push(`/manager/staff/update-staff/${item.user_id}`);
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
                                                    handleRemoveStaff(item.user_id);
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

export default StaffTable;
