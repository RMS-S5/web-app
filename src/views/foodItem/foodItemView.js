import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm, CInput, CLabel,
    CRow,
    CDataTable,
} from "@coreui/react";
import CardContainer from "../../components/common/CardContainer";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/common/NewForm";
import { thunks, cleanQuery } from "../../store/index";
import { getAllFoodItems } from "../../store/foodItem/select";
import { getAllCategories } from "../../store/category/select";

const fields = [
    { key: "variantName", label: "Variant Name", _style: { width: "10%" } },
    { key: "price", label: "Price", _style: { width: "10%" } },
];

class FoodItemView extends Form {
    state = {

        data: {
            name: "",
            categoryId: "",
            description: "",
            price: "",
        },
        foodVariants: [],
        categories: [],
        foodItemId: "",
        image: "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getFoodItemByID = (foodItemId) => {
        console.log(foodItemId, this.props.foodItems);
        const foodItem = this.props.foodItems.find((item) => {
            return item.foodItemId == foodItemId;
        });
        if (!foodItem) {
            toast.error("Food Item Not found");
            return;
        }
        this.setState({ foodVariants: foodItem.foodVariants })
        console.log("##foodItem:", foodItem)
        return foodItem;
    };

    schema = {
        name: Joi.string().optional().label("Name"),
        categoryId: Joi.string().optional().label("Category ID"),
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
                        value: item.categoryId,
                        label: item.categoryName
                    })
                }
            )
            this.setState({ categories: pairValue, loading: false });
        } else {
            this.setState({ loading: false, error: true });
            toast.error(res.message);
        }

        const foodItem = this.getFoodItemByID(this.props.match.params.foodItemId);
        if (foodItem) {
            const updateData = cleanQuery(foodItem,
                ["name", "categoryId", "description", "price"]); //todo: include status when implemented
            const foodItemId = foodItem.foodItemId;
            this.setState({ data: { ...updateData }, foodItemId });
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
                                            <CInput id="name" readOnly value={this.state.foodItemId} />
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
                                                "categoryId", "Category", this.state.categories
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
                    <CCol>
                        <CardContainer
                            //   error={this.state.error}
                            //   loading={this.state.loading}
                            header="Food Variants"
                        >
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader></CCardHeader>
                                        <CCardBody>
                                            <CDataTable
                                                items={this.state.foodVariants}
                                                fields={fields}
                                                // columnFilter
                                                //footer
                                                // loading={loading}
                                                // itemsPerPageSelect
                                                // itemsPerPage={20}
                                                hover
                                                sorter
                                                pagination
                                            />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CardContainer>
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
            "categoryId",
            this.state.data.categoryId
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



        let newFoodVariants = []
        for (const foodVariant of this.state.foodVariants) {
            console.log("foodVariant:", foodVariant);
            let newObject = {};

            function camelToUnderscore(key) {
                return key.replace(/([A-Z])/g, "_$1").toLowerCase();
            }

            for (var camel in foodVariant) {
                newObject[camelToUnderscore(camel)] = foodVariant[camel];
            }

            console.log(newObject);
            newFoodVariants.push(newObject)
        }

        console.log("newFoodVariants:", newFoodVariants);
        console.log("##out: ", { ...this.state.data, foodVariants: this.state.foodVariants })
        console.log("##foodItemId: ", this.state.foodItemId)
        const res = await this.props.updateFoodItem(this.state.foodItemId, { ...this.state.data, foodVariants: newFoodVariants });

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
    updateFoodItem: (foodItemId, foodItemData) => dispatch(thunks.foodItem.updateFoodItem(foodItemId, foodItemData))
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodItemView);
