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
import { getAllBranches } from "../../store/staff/select";

const BranchTable = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const branches = useSelector(getAllBranches);

  useEffect(async () => {
    setLoading(true);
    const res = await dispatch(thunks.staff.getAllBranches());
    console.log("props:", props);
    if (res.status !== 200) {
      toast.error(res.message);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  const handleRemoveBranch = async (branchId) => {
    setLoading(true);
    console.log("remove branch with branchId:", branchId);
    const res = await dispatch(thunks.staff.removeBranch(branchId)); //todo: add new method
    if (res.status !== 200) {
      toast.error(res.message);
    }
    toast.success("Branch removed successfully");
    setLoading(false);
  };

  const fields = [
    { key: "branchId", label: "Branch ID", _style: { width: "30%" } },
    { key: "branchName", label: "Branch Name", _style: { width: "10%" } },
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
          <CCardHeader>Branch</CCardHeader>
          <CCardBody>
            <CDataTable
              items={branches}
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
                remove_item: (item) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="danger"
                        // variant="outline"
                        shape="rounded-pill"
                        size="sm"
                        onClick={() => {
                          handleRemoveBranch(item.branchId);
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

export default BranchTable;
