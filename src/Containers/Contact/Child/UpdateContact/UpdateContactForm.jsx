import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select,  Tag, Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateContact } from "../../ContactAction";
import Upload from "../../../../Components/Forms/Formik/Upload";
import { StyledLabel } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  firstName: Yup.string().required("Input needed!"),
  // lastName: Yup.string().required("Input needed!"),
  // phoneNumber: Yup.string().required("Input needed!").matches(phoneRegExp, "Enter a valid Phone No"),
  // mobileNumber: Yup.string().matches(phoneRegExp, "Enter a valid Mobile No"),
  // tagWithCompany: Yup.string().required(" Select Company"),
});

class UpdateContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      candidate: false,
      availability: false,
    };
  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleReset = (resetForm) => {
    resetForm();
  };
  handleClick = (option) => {
    ////debugger;
    this.setState({
      currentOption: option,
    });
    console.log(this.state.option);
    console.log(this.state.currentOption);
  };
  handleFieldClik() {
    this.setState({
      disabled: !this.state.disabled,
      visible: !this.state.visible,
    });
  }
  onChange = (value) => {
    console.log(value);
    this.setState({
      option: value,
    });
  };
  onChange1 = (value) => {
    console.log(value);
    this.setState({
      option1: value,
    });
  };
  onChange2 = (value) => {
    ////debugger;
    console.log(value);
    this.setState({
      option2: value,
    });
  };

  render() {
    const {
      user: { userId, firstName, lastName },
      updateContact,
      updateContactById,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      user,
      creatorId,
      accountIdTag,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      designationTypeId,
      departmentId,
    } = this.props;
    console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            salutation: this.props.setEditingContact.salutation || "",
            // designation: this.props.setEditingContact.designation || "",
            designationTypeId: this.props.setEditingContact.designationTypeId || "",
            description: this.props.setEditingContact.description || "",
            // department: this.props.setEditingContact.department || undefined,
            departmentId: this.props.setEditingContact.departmentId || "",
            departmentDetails:
              this.props.setEditingContact.departmentDetails || "",
            userId: this.props.userId,
            // tagWithCompany: this.props.setEditingContact.tagWithCompany || "",
            firstName: this.props.setEditingContact.firstName || "",
            middleName: this.props.setEditingContact.middleName || "",
            lastName: this.props.setEditingContact.lastName || "",
            countryDialCode:
              this.props.setEditingContact.countryDialCode ||
              this.props.user.countryDialCode,
            countryDialCode1:
              this.props.setEditingContact.countryDialCode1 ||
              this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingContact.phoneNumber || "",
            mobileNumber: this.props.setEditingContact.mobileNumber || "",
            emailId: this.props.setEditingContact.emailId || "",
            customerId:this.props.setEditingContact.customerId||"",
            linkedinPublicUrl:
              this.props.setEditingContact.linkedinPublicUrl || "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                houseNo:"",
                country: this.props.setEditingContact.countryName || "",
                latitude: "",
                longitude: "",
              },
            ],
            notes: this.props.setEditingContact.notes || "",
          }}
          validationSchema={UpdateContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateContact(
              {
                ...values,
                contactId: this.props.contactId,
              },
              this.props.contactId,
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form className="form-background">
              <div style={{ display: "flex", justifyContent: "space-between",height: "70vh",paddingRight: "0.6em" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                 <FlexContainer flexWrap="nowrap" alignItems="flex-start">
                    <FastField name="imageId" component={Upload} />
                     <div style={{ marginLeft: "14px", width: "100%" }}>
                      <FlexContainer
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ width: "40%" }}>
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="Salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                             className="w-full"
        style={{
          width: "95%",
          height: "38px",
          border: "1px solid #d9d9d9",
          outline: "none",
          boxShadow: "none",
        }}
                            isColumn
                          />
                        </div>
                         <div style={{ width: "60%" }}>
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstname"
                                defaultMessage="First Name"
                              />
                            }
                            type="text"
                           className="w-full"
                            style={{width:"100%"}}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </FlexContainer>
                      <Spacer />
                      <FlexContainer
                       style={{
                         width: "100%",
                         display: "flex",
                         flexDirection: "row",
                         alignItems: "flex-start",
                       }}
                     >
                      <div style={{ width: "40%" }}>
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={
                              <FormattedMessage
                                id="app.middle"
                                defaultMessage="Middle"
                              />
                            }
                            type="text"
                            className="w-full "
       style={{
           width: "95%",
          height: "38px",
          border: "1px solid #d9d9d9",
          outline: "none",
          boxShadow: "none",
        }}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                       <div style={{ width: "60%" }}>
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            label={
                              <FormattedMessage
                                id="app.lastname"
                                defaultMessage="Last Name"
                              />
                            }
                            type="text"
                           className="w-full"
                            style={{width:"100%"}}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </FlexContainer>
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <FastField
                        type="email"
                        name="emailId"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.emailId"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        isRequired
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.mobile#"
                            defaultMessage="Mobile #"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "70%" }}>
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobile#"
                            defaultMessage="Mobile #"
                          />
                        }
                        //placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <FastField
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        //label="Phone No #"
                        label={
                          <FormattedMessage
                            id="app.phone#"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "70%" }}>
                      <FastField
                        type="text"
                        name="phoneNumber"
                        //placeholder="Phone #"
                        label={
                          <FormattedMessage
                            id="app.phoneNumber"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </FlexContainer>

                 
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedinPublicUrl"
                            defaultMessage="Linkedin"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />                 
                  
                </div>
                
                <div
                  style={{
                    height: "70%",
                    width: "45%",
                  }}
                ><FlexContainer justifyContent="space-between">
                <div style={{ width: "47%" }}>

                  <Field
                    name="customerId"
                    selectType="customerList"
                    isColumnWithoutNoCreate
                    // label="Tag Company"
                    label={
                      <FormattedMessage
                        id="app.tagcompany"
                        defaultMessage="Tag Company"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                    value={values.tagWithCompany}
                    // defaultValue={{ label: firstName, value: documentId }}
                    inlineLabel
                  />

                </div>
                <Spacer />
                <div style={{ width: "47%" }}>
                  <FastField
                    name="designationTypeId"
                    //label="Designation"
                    label={
                      <FormattedMessage
                        id="app.designation"
                        defaultMessage="Designation"
                      />
                    }
                    selectType="designationType"
                    // options={[
                    //   "Board",
                    //   "CXO",
                    //   "Director",
                    //   "Unit Head",
                    //   "Mid Level",
                    //   "Junior",
                    // ]}
                    isColumn
                    // component={SelectComponent}
                    component={SearchSelect}
                    value={values.designationTypeId}
                    isColumnWithoutNoCreate
                    inlineLabel
                  />
                </div>
              </FlexContainer>
              <Spacer />
                  <div style={{ width: "100%" }}>
                    <FastField
                      name="departmentId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="Department"
                        />
                      }
                      // options={[
                      //   "Business",
                      //   "Operations",
                      //   "IT",
                      //   "Finance",
                      //   "Recruitment",
                      //   "HR",
                      //   "Sales",
                      //   "Marketing",
                      //   "Procurement",
                      //   "Legal",
                      //   "Facilities",
                      //   "Alliance",
                      // ]}
                      // onChange={() => {
                      //   this.handleFieldClik();
                      // }}
                      isColumn
                      isColumnWithoutNoCreate
                      // component={SelectComponent}
                      component={SearchSelect}
                      value={values.departmentId}
                      selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                 
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="address[0].address1"
                    // label="Address"
                    label={
                      <FormattedMessage
                        id="app.address"
                        defaultMessage="Address"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between"> 
                  <div style={{ width: "47%" }}>  
                  <Field
                  //  label="House No"
                    label={
                      <FormattedMessage
                        id="app.houseNo"
                        defaultMessage="House No"
                      />
                    }
                   name="address[0].houseNo"
                  // placeholder="House No"
                  component={InputComponent}
                  width={"100%"}
                  isColumn
                  inlineLabel
                />
                </div>
                <div style={{ width: "47%" }}>
                  <Field
                    name="address[0].street"
                    //label="Street"

                    label={
                      <FormattedMessage
                        id="app.street"
                        defaultMessage="Street"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                    />
                     </div>
                     </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].city"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.city"
                            defaultMessage="City"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        // name="address[0].country"
                        name="countryName"
                        isColumnWithoutNoCreate
                        // label="Country"

                        label={
                          <FormattedMessage
                            id="app.country"
                            defaultMessage="Country"
                          />
                        }
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryName,
                        }}
                        value={values.countryName || this.props.countryName}
                        selectType="country"
                        inlineLabel
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].state"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="app.state"
                            defaultMessage="State"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].postalCode"
                        //label="Zip Code"

                        label={
                          <FormattedMessage
                            id="app.pinCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer>
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateContactById}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />

                  {/* Update */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, contact, team,customer, departments, designations, opportunity }) => ({
  setEditingContact: contact.setEditingContact,
  updateContactById: contact.updateContactById,
  updateContactByIdError: contact.updateContactByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateContact,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactForm);
