import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm, CInput, CLabel,
    CRow,
} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks, cleanQuery } from "../../store/index";
import { getAllFoodItems } from "../../store/foodItem/select";
import { getAllCategories } from "../../store/category/select";

class FoodItemView extends Form {
    state = {

        data: {
            name: "",
            category_id: "",
            description: "",
            price: "",
        },
        categories: [],
        id: "",
        image: "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getFoodItemByID = (id) => {
        console.log(id, this.props.foodItems);
        const foodItem = this.props.foodItems.find((item) => {
            return item.id == id;
        });
        if (!foodItem) {
            toast.error("Food Item Not found");
            return;
        }
        return foodItem;
    };

    schema = {
        name: Joi.string().optional().label("Name"),
        category_id: Joi.string().optional().label("Category ID"),
        description: Joi.string().optional().label("Description"),
        price: Joi.number().optional().label("Price"),

    };

    async componentDidMount() {
        const res = await this.props.getAllCategories();
        const res1 = await this.props.getAllFoodItems();
        if (res.status === 200 && res1.status === 200) {
            const categoriesData = this.props.categories;
            let pairValue = [];
            categoriesData.forEach(
                (item, index) => {
                    pairValue.push({
                        value: item.category_id,
                        label: item.category_name
                    })
                }
            )
            this.setState({ categories: pairValue, loading: false });
        } else {
            this.setState({ loading: false, error: true });
            toast.error(res.message);
        }

        const foodItem = this.getFoodItemByID(this.props.match.params.id);
        if (foodItem) {
            const updateData = cleanQuery(foodItem,
                ["name", "category_id", "description", "price"]); //todo: include status when implemented
            const id = foodItem.id;
            this.setState({ data: { ...updateData }, id });
        }
    }

    componentWillUnmount() {
        toast.dismiss();
    }

    render() {
        return (
            <CContainer>
                <CRow>
                    <CCol xs="12" md="12">
                        <CCard>
                            <CCardHeader>Change Food Item</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="name">ID</CLabel>
                                            <CInput id="name" readOnly value={this.state.id} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("name", "Name", "text", {
                                                placeholder: "Enter name",
                                            }, false)}
                                        </CCol>
                                    </CRow>                        
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelectWithLabelValue(
                                                "category_id", "Category", this.state.categories
                                            )}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("description", "Description", "text", {
                                                placeholder: "Enter description",
                                            })}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("price", "Price", "text", {
                                                placeholder: "Enter price",
                                            })}
                                        </CCol>
                                    </CRow>
                                    {/* <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelect(
                                                "status", "Status", this.state.status
                                            )}
                                        </CCol>
                                    </CRow> */}

                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderImageInput("image", "Product Image", "file", {
                                                placeholder: "Upload image",
                                            }, false)}
                                        </CCol>
                                    </CRow>
                                    {this.renderButton("Submit", "primary", "danger")}

                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        );
    }

    async callServer() {
        this.setState({ spinner: true });

        const formData = new FormData();
        // Update the formData object
        formData.append(
            "image",
            this.state.image
        );
        formData.append(
            "name",
            this.state.data.name
        )
        formData.append(
            "category_id",
            this.state.data.category_id
        )
        formData.append(
            "description",
            this.state.data.description
        )
        formData.append(
            "price",
            this.state.data.price
        )
        
        console.log("########") //test
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log("########") //test

        const res = await this.props.updateFoodItem(this.state.id, formData);

        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/branch-manager/food-item/view-food-items");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    foodItems: getAllFoodItems(state),
    categories: getAllCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
    getAllFoodItems: () => dispatch(thunks.foodItem.getAllFoodItems()),
    getAllCategories: () => dispatch(thunks.category.getAllCategories()),
    updateFoodItem: (id, foodItemData) => dispatch(thunks.foodItem.updateFoodItem(id, foodItemData))
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodItemView);
