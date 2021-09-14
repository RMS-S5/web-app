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
import { thunks , cleanQuery} from "../../store/index";
import {getAllBranches, getAllRoles, getAllStaffm} from "../../store/staff/select";

class StaffView extends Form {
    state = {

        data: {
            first_name: "",
            last_name: "",
            email : "",
            account_type : "",
            role : "",
            branch_id : "",
            birthday : "",
            mobile_number : "",
            nic : "",
        },
        branches : [],
        roles : [],
        //status : ["Available" , "Not Available"],
        user_id : "",
        image : "",
        errors: {},
        btnDisable: false,
        spinner: false,
    };

    getStaffByID = (user_id) => {
        console.log(user_id, this.props.staffm);
        const staff = this.props.staffm.find((item) => {
            return item.user_id == user_id;
        });
        if (!staff) {
            toast.error("Staff Not found");
            return;
        }
        return staff;
    };

    schema = {
        //status: Joi.string().optional().label("Staff Status"),
        first_name: Joi.string().optional().label("First Name"),
        last_name: Joi.string().optional().label("Last Name"),
        email: Joi.string().optional().email({ tlds: { allow: false } }).label("Email"),
        account_type: Joi.string().optional().label("Account Type"),
        role: Joi.string().optional().label("Role"),
        branch_id: Joi.string().optional().label("Branch ID"),
        birthday: Joi.date().optional().label("Birthday"),
        mobile_number: Joi.string().optional().label("Mobile Number"),
        nic: Joi.string().optional().label("NIC"),
    };

    async componentDidMount() {
        const res = await this.props.getAllBranches();
        const res1 = await this.props.getAllStaffm();
        const res2 = await this.props.getAllRoles();
        if (res.status === 200 && res1.status === 200 && res2.status === 200) {
            const branchesData = this.props.branches;
            const rolesData = this.props.roles;
            let pairValue = [];
            branchesData.forEach(
                (item, index) => {
                    pairValue.push({
                        value : item.id,
                        label : item.name
                    })
                }
            )
            this.setState({ branches:pairValue,loading: false });

            let pairValue1 = [];
            rolesData.forEach(
                (item, index) => {
                    pairValue1.push({
                        value : item.role,
                        label : item.description
                    })
                }
            )
            this.setState({ roles:pairValue1,loading: false });
        } else {
            this.setState({ loading: false, error: true });
            toast.error(res.message);
        }

        const staff = this.getStaffByID(this.props.match.params.user_id);
        if (staff) {
            const updateData = cleanQuery(staff,
                ["first_name", "last_name", "email","account_type", "role", "branch_id", "birthday", "mobile_number", "nic"]); //todo: include status when implemented
            const user_id= staff.user_id;
            this.setState({data : {...updateData}, user_id});
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
                            <CCardHeader>Change Staff</CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" onSubmit={this.handleSubmit}>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CLabel htmlFor="name">User ID</CLabel>
                                            <CInput id="name" readOnly value={this.state.user_id} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("first_name", "First Name", "text", {
                                                placeholder: "Enter first name",
                                            }, false)}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("last_name", "Last Name", "text", {
                                                placeholder: "Enter last name",
                                            }, false)}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("email", "Email", "text", {
                                                placeholder: "Enter email",
                                            },false)}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("account_type", "Account Type", "text", {
                                                placeholder: "Enter account type",
                                            },false)}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelectWithLabelValue(
                                                "role", "Role", this.state.roles
                                            )}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderSelectWithLabelValue(
                                                "branch_id", "Branch", this.state.branches
                                            )}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("birthday", "Date of Birth", "date", {
                                                placeholder: "Enter date of birth",
                                            })}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("mobile_number", "Mobile Number", "text", {
                                                placeholder: "Enter mobile number",
                                            })}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            {this.renderInput("nic", "NIC", "text", {
                                                placeholder: "Enter NIC number",
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
                                                placeholder: "Upload profile image",
                                            },false)}
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
        // formData.append(
        //     "user_id",
        //     this.state.data.user_id
        // )
        formData.append(
            "first_name",
            this.state.data.first_name
        )
        formData.append(
            "last_name",
            this.state.data.last_name
        )
        formData.append(
            "email",
            this.state.data.email
        )
        formData.append(
            "role",
            this.state.data.role
        )
        formData.append(
            "branch_id",
            this.state.data.branch_id //todo:branch must have an id property
        )
        formData.append(
            "birthday",
            this.state.data.birthday
        )
        formData.append(
            "mobile_number",
            this.state.data.mobile_number
        )
        console.log("########") //test
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        console.log("########") //test

        const res = await this.props.updateStaff(this.state.user_id, formData);

        this.setState({ spinner: false });
        if (res.status === 200) {
            this.props.history.push("/manager/staff/view-staffm");
        } else {

            toast.error(res.message);
        }
    }
}

const mapStateToProps = (state) => ({
    staffm : getAllStaffm(state),
    branches: getAllBranches(state),
    roles: getAllRoles(state),
});

const mapDispatchToProps = (dispatch) => ({
    getAllStaffm : () => dispatch(thunks.staff.getAllStaffm()) ,
    getAllBranches : () => dispatch(thunks.staff.getAllBranches()),
    getAllRoles : () => dispatch(thunks.staff.getAllRoles()),
    updateStaff : (user_id, staffData) => dispatch(thunks.staff.updateStaff(user_id, staffData))
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffView);
