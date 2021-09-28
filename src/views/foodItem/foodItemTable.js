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
import {getAllFoodItems} from "../../store/foodItem/select";


const FoodItemTable = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const foodItems = useSelector(getAllFoodItems);


    useEffect(async () => {
        setLoading(true);
        const res = await dispatch(thunks.foodItem.getAllFoodItems());
        if (res.status !== 200) {
            toast.error(res.message);
        }
        
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => toast.dismiss();
    }, []);

    const handleRemoveFoodItem = async (id) => {
        setLoading(true);
        console.log("remove satff member with id:", id)
        const res = await dispatch(thunks.foodItem.removeFoodItem(id)); //todo: add new method
        if (res.status !== 200) {
            toast.error(res.message);
        }
        toast.success("Food Item removed successfully");
        setLoading(false);
    }

    const fields = [
        { key: "id", label: "ID", _style: { width: "30%" } },
        { key: "name", label: "Name", _style: { width: "10%" } },
        { key: "categoryName", label: "Category", _style: { width: "10%" } },
        { key: "description", label: "Description", _style: { width: "10%" } },
        { key: "price", label: "Price", _style: { width: "10%" } },
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

    // const getBadge = (status) => {
    //     switch (status) {
    //         case "employed":
    //             return "primary";
    //         case "available":
    //             return "success";
    //         case "unavailable":
    //             return "warning";
    //         case "resigned":
    //             return "danger";
    //         default:
    //             return "light";
    //     }
    // };

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Food Item</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={foodItems}
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
                                // status: (item) => ( 
                                //     <td>
                                //         <CBadge color={getBadge(item.status)} textColor={"white"}>  //todo: add availability
                                //             {item.status}
                                //         </CBadge>
                                //     </td>
                                // ),
                                show_details: (item) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={() => {
                                                    props.history.push(`/branch-manager/food-item/update-food-item/${item.id}`);
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
                                                    handleRemoveFoodItem(item.id);
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

export default FoodItemTable;
