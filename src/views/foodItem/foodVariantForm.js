import {
    CCol,
    CContainer,
    CForm,
    CFormGroup,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInvalidFeedback,
    CLabel,
    CRow,
    CSelect,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,

    CDataTable,

} from "@coreui/react";
import Joi from "joi";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardContainer from "../../components/common/CardContainer";
import Form from "../../components/common/NewForm";
import CIcon from "@coreui/icons-react";
import humanize from "../../utils/humanize";

const fields = [
    { key: "variant_name", label: "Variant Name", _style: { width: "10%" } },
    { key: "price", label: "Price", _style: { width: "10%" } },
];

class FoodVariantForm extends Form {
    state = {
        foodVariants: this.props.foodVariants,
        data: {
            variant_name: "",
            price: "",
        },
        errors: {},
        btnDisable: false,
        spinner: false,
        error: false,
        loading: true,
    };

    schema = {
        variant_name: Joi.string().label("Variant Name"),
        price: Joi.number().label("Price Name"),
    };

    componentWillUnmount() {
        toast.dismiss();
    }


    render() {
        return (

            <CForm onSubmit={this.handleSubmit}>

                <CRow>
                    <CCol xs="12" md="6">
                        {this.renderInput("variant_name", "Variant Name", "text", {
                            placeholder: "Enter variant name",
                        }, true)}
                    </CCol>
                    <CCol xs="12" md="6">
                        {this.renderInput("price", "Price", "text", {
                            placeholder: "Enter price",
                        }, true)}
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>{this.renderButton("Add food variant", "primary", "danger")}</CCol>
                </CRow>
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

            </CForm >

        );
    }

    async callServer() {
        this.setState({ spinner: true });

        const foodVariants = this.state.foodVariants;
        foodVariants.push({variant_name: this.state.data.variant_name, price: Number(this.state.data.price)});
        this.setState(foodVariants);
        

        this.setState({ spinner: false });

    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    addBranch: (branchData) => dispatch(thunks.staff.addBranch(branchData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodVariantForm);
