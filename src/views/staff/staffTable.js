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
import {getAllStaffm} from "../../store/staff/select";


const StaffTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const staffm = useSelector(getAllStaffm);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.staff.getAllStaffm());
        console.log("props:",props);
        if (res.status !== 200) {
            toast.error(res.message);
        }
        
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleRemoveStaff = async (userId) => {
        setLoading(true);
        console.log("remove satff member with userId:", userId)
        const res = await dispatch(thunks.staff.removeStaff(userId)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Staff member removed successfully");
        setLoading(false);
    }

    const fields = [
        { key: "userId", label: "User ID", _style: { width: "30%" } },
        { key: "firstName", label: "First Name", _style: { width: "10%" } },
        { key: "lastName", label: "Last Name", _style: { width: "10%" } },
        { key: "email", label: "Email", _style: { width: "10%" } },
        { key: "accountType", label: "Account Type", _style: { width: "10%" } }, //todo:remove
        { key: "role", label: "Role", _style: { width: "10%" } },
        { key: "branchName", label: "Branch", _style: { width: "10%" } }, 
        { key: "status",label: "Status", _style: { width: "10%" } },
        { key: "birthday",label: "Birthday", _style: { width: "10%" } },
        { key: "mobileNumber", label: "Mobile Number", _style: { width: "10%" } },
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
            case "Employed":
                return "primary";
            case "Available":
                return "success";
            case "Unavailable":
                return "warning";
            case "Resigned":
                return "danger";
            default:
                return "light";
        }
    };

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
                                            {item.status}
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
                                                    
                                                    props.history.push(`/`+props.accountType+`/staff/update-staff/${item.userId}`); 
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
                                                    handleRemoveStaff(item.userId);
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
