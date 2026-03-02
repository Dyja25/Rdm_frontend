import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Select, Tag, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { ShowOrCollapse } from "../../../../../../Components/Common";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { addCustomerContact } from "../../../../CustomerAction";
import Upload from "../../../../../../Components/Forms/Formik/Upload";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import {getDesignations} from "../../../../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../../../../Settings/Department/DepartmentAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  // emailId:Yup.string().required("Input needed!"),
});

class ContactForm extends Component {
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
    const { callback } = this.props;
    callback && callback();
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
      addCustomerContact,
      addingCustomerContact,
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
      defaultCustomers,
      customerId,
      tagWithCompany,
    } = this.props;
    console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            // designation: undefined,
            designationTypeId:this.props.designationTypeId,
            description: "",
            // department: undefined,
            departmentDetails: "",
            departmentId:this.props.departmentId,
            userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            phoneNumber: "",
            mobileNumber: "",
            email:"",
            emailId: "",
            linkedinPublicUrl: "",
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
                country: this.props.user.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addCustomerContact(
              {
                ...values,
                customerId: this.props.customerId,
              },
              this.props.userId,
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "45%",
                    }}
                  >
                    <FlexContainer flexWrap="no-wrap">
                      <FastField name="imageId" component={Upload} />
                      <div style={{ marginLeft: "24px" }}>
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "35%" }}>
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
                              className="field"
                              isColumn
                            />
                          </div>
                          <div style={{ width: "63%" }}>
                            <FastField
                              isRequired
                              name="firstName"
                              // label="First Name"
                              label={
                                <FormattedMessage
                                  id="app.firstName"
                                  defaultMessage="First Name"
                                />
                              }
                              type="text"
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                        </FlexContainer>
                        <Spacer />
                        <FlexContainer justifyContent="space-between">
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
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                          <div style={{ width: "55%" }}>
                            <FastField
                              name="lastName"
                              //label="Last Name"
                              label={
                                <FormattedMessage
                                  id="app.lastName"
                                  defaultMessage="Last Name"
                                />
                              }
                              type="text"
                              width={"100%"}
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
                      <div style={{ width: "47%" }}>
                        <FastField
                          name="countryDialCode"
                          isColumnWithoutNoCreate
                          //label="Mobile #"
                          label={
                            <FormattedMessage
                              id="app.countryDialCode"
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
                      <div style={{ width: "47%" }}>
                        <FastField
                          type="text"
                          name="mobileNumber"
                          //placeholder="Mobile #"
                          label={
                            <FormattedMessage
                              id="app.mobileNumber"
                              defaultMessage="Mobile #"
                            />
                          }
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                          isColumn
                          />
                      </div>
                    </FlexContainer>
                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <FastField
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"
                          //label="Phone No #"
                          label={
                            <FormattedMessage
                              id="app.countryDialCode1"
                              defaultMessage="Phone No"
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
                      <div style={{ width: "47%" }}>
                        <FastField
                          type="text"
                          name="phoneNumber"
                          // placeholder="Phone #"
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
                          isRequired
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
                    <Spacer />

                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <>
                          <Field
                            name="customerId"
                            isColumnWithoutNoCreate
                            selectType="customerList"
                            // label="Tag Company"
                            label={
                              <FormattedMessage
                                id="app.tagcompany"
                                defaultMessage="Tag Company"
                              />
                            }
                            component={SearchSelect}
                            isColumn
                            value={values.customerId}
                            isDisabled={defaultCustomers}
                            defaultValue={
                              defaultCustomers ? defaultCustomers : null
                            }
                            inlineLabel
                            />
                        </>
                      </div>
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
                    <FlexContainer justifyContent="space-between"></FlexContainer>
                  </div>
                &nbsp;
                <div
                    style={{
                      height: "70%",
                      width: "45%",
                    }}
                  >
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
                    <Spacer />
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
                    <Spacer style={{ marginBottom: "1.25em" }} />
                    <Field
                      name="address[0].address1"
                      // label="Address"
                      label={
                        <FormattedMessage
                          id="app.address[0].address1"
                          defaultMessage="Address"
                        />
                      }
                      component={InputComponent}
                      isColumn
                      width="100%"
                    />
                    <Spacer />
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
                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <Field
                          name="address[0].city"
                          //label="City"
                          label={
                            <FormattedMessage
                              id="app.ddress[0].city"
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
                              id="app.countryName"
                              defaultMessage="Country"
                            />
                          }
                          component={SearchSelect}
                          defaultValue={{
                            value: this.props.user.countryName,
                          }}
                          value={values.countryName}
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
                              id="app.address[0].State"
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
                              id="app.address[0].postalCode"
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
                <Spacer style={{ marginTop: "1.25em" }} />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    // icon={<PoweroffOutlined />}
                    loading={addingCustomerContact}
                  >
                    <FormattedMessage id="app.create" defaultMessage="Create" />
                    {/*                     
                    Create */}
                  </Button>
                </FlexContainer>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, contact, customer, opportunity,departments,designations }) => ({
  addingCustomerContact: customer.addingCustomerContact,
  addingCustomerContactError: customer.addingCustomerContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId:departments.departmentId,
  designationTypeId:designations.designationTypeId,
  // tagWithCompany: customer.customer.name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContacts,
      addCustomerContact,
      // getContactById,
      // addLinkContactByOpportunityId,
      // getCurrency,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
