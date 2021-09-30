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
import { getAllTables } from "../../store/table/select";

const TableTable = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const tables = useSelector(getAllTables);

  useEffect(async () => {
    setLoading(true);
    console.log("props:##");
    const res = await dispatch(thunks.table.getAllTables());
    console.log("props:", props);
    if (res.status !== 200) {
      toast.error(res.message);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  const handleRemoveTable = async (tableNumber) => {
    setLoading(true);
    console.log("remove table with tableNumber:", tableNumber);
    const res = await dispatch(thunks.table.removeTable(tableNumber)); //todo: add new method
    if (res.status !== 200) {
      toast.error(res.message);
    }
    toast.success("Table removed successfully");
    setLoading(false);
  };

  const fields = [
    { key: "tableNumber", label: "Table Number", _style: { width: "30%" } },
    { key: "verificationCode", label: "Verification Code", _style: { width: "10%" } },
    { key: "lastUpdateTime", label: "Last Update Time", _style: { width: "10%" } },
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
          <CCardHeader>Table</CCardHeader>
          <CCardBody>
            <CDataTable
              items={tables}
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
                          handleRemoveTable(item.tableNumber);
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

export default TableTable;
