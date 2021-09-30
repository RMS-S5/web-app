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
import { getAllCategories } from "../../store/category/select";

const CategoryTable = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const categories = useSelector(getAllCategories);

  useEffect(async () => {
    setLoading(true);
    const res = await dispatch(thunks.category.getAllCategories());
    console.log("props:", props);
    if (res.status !== 200) {
      toast.error(res.message);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  const handleRemoveCategory = async (categoryId) => {
    setLoading(true);
    console.log("remove category with categoryId:", categoryId);
    const res = await dispatch(thunks.category.removeCategory(categoryId)); //todo: add new method
    if (res.status !== 200) {
      toast.error(res.message);
    }
    toast.success("Category removed successfully");
    setLoading(false);
  };

  const fields = [
    { key: "categoryId", label: "Category ID", _style: { width: "30%" } },
    { key: "categoryName", label: "Category Name", _style: { width: "10%" } },
    { key: "description", label: "Description", _style: { width: "10%" } },
    // {
    //   key: "image", //todo:add image
    //   label: "",
    //   _style: { width: "1%" },
    //   sorter: false,
    //   filter: false,
    // },
    {
      key: "remove_item", 
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
          <CCardHeader>Category</CCardHeader>
          <CCardBody>
            <CDataTable
              items={categories}
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
                          handleRemoveCategory(item.categoryId);
                        }}
                      >
                        Remove
                      </CButton>
                    </td>
                  );
                },
                //todo: add image
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CategoryTable;
