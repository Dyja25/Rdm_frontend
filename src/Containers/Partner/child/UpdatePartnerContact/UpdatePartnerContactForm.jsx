import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select} from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../Components/UI/Elements";

import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";

import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updatePartnerContact,setEditPartnerContact } from "../../PartnerAction";
import Upload from "../../../../Components/Forms/Formik/Upload";

import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";

import {getSectors} from "../../../Settings/Sectors/SectorsAction";
import {getDesignations} from "../../../Settings/Designation/DesignationAction";
const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
});

class UpdatePartnerContactForm extends Component {
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
      updatePartnerContact,
      updatePartnerContactById,
      setEditingPartnerContact,
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
      contactId,
      // tagWithCompany,
    } = this.props;
    console.log(linkContact);
    console.log(contactId);

    return (
      <>
        <Formik
          initialValues={{
            salutation: this.props.setEditingPartnerContact.salutation || "",
            designationTypeId: this.props.setEditingPartnerContact.designationTypeId || "",
            description: this.props.setEditingPartnerContact.description || "",
            // department: this.props.setEditingPartnerContact.department || undefined,
            sectorId:this.props.setEditingPartnerContact.sectorId || "",
            departmentDetails:  this.props.setEditingPartnerContact.departmentDetails || "",
            // userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: this.props.setEditingPartnerContact.tagWithCompany || "",
            firstName: this.props.setEditingPartnerContact.firstName || "",
            middleName: this.props.setEditingPartnerContact.middleName || "",
            lastName: this.props.setEditingPartnerContact.lastName || "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingPartnerContact.phoneNumber || "",
            mobileNumber: this.props.setEditingPartnerContact.mobileNumber || "",
            emailId: this.props.setEditingPartnerContact.emailId || "",
            linkedinPublicUrl: this.props.setEditingPartnerContact.linkedinPublicUrl || "",
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
                country: this.props.setEditingPartnerContact.countryName || this.props.user.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes: this.props.setEditingPartnerContact.notes || "",
          }}
          // validationSchema={UpdateContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updatePartnerContact(
              {
                ...values,
                partnerId: this.props.partnerId,
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
                  <FlexContainer flexWrap="no-wrap">
                    <FastField name="imageId" component={Upload} />
                    <div style={{ marginLeft: "16px" }}>
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
                            style={{
                              flexBasis: "80%",
                              height: "2.0625em",
                              // marginTop: "0.25em",
                            }}
                          />
                        </div>
                        <div style={{ width: "65%" }}>
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
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            style={{
                              height: "2.0625em",
                              flexBasis: "80%",
                              // marginTop: "0.25em",
                            }}
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
                                id="app.middleName"
                                defaultMessage="Middle Name"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            style={{
                              height: "2.0625em",
                              flexBasis: "80%",
                              // marginTop: "0.25em",
                            }}
                          />
                        </div>
                        <div style={{ width: "55%" }}>
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
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            style={{
                              height: "2.0625em",
                              flexBasis: "80%",
                              // marginTop: "0.25em",
                            }}
                          />
                        </div>
                      </FlexContainer>
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
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
                        // margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
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
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
                        }}
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
                            id="app.phoneNumber"
                            defaultMessage="Phone No"
                          />
                        }
                        isColumn
                        // margintop={"0.25em"}
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
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
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
                        }}
                      />
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
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
                        }}
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
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />

                  <FlexContainer justifyContent="space-between">
                    {/* <div style={{ width: "47%" }}>
                      <>
                        <Field
                          name="tagWithCompany"
                          // selectType="customerList"
                          // label="Tag Company"
                          label={
                            <FormattedMessage
                              id="app.tagWithCompany"
                              defaultMessage="Part"
                            />
                          }
                          component={InputComponent}
                          isColumn
                          margintop={"0.25em"}
                          // value={values.customerId}
                          // defaultValue={{ label: firstName, value: documentId }}
                          inlineLabel
                          style={{ flexBasis: "80%" }}
                        />
                      </>
                    </div> */}
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="designationTypeId"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.role"
                            defaultMessage="Role"
                          />
                        }
                        isColumnWithoutNoCreate
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
                        component={SearchSelect}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
                        }}
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
                      name="sectorId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.sector"
                          defaultMessage="Sector"
                        />
                      }
                      isColumnWithoutNoCreate
                      selectType="sectorName"
                      // options={[
                      //   " Accountancy",
                      //   " Aviation",
                      //   " Banking",
                      //   "Car industry ",
                      //   "Clothing ",
                      //   " Construction ",
                      //   " Content generation/management ",
                      //   " Daycare ",
                      //   "Design",
                      //   "Digital marketing",
                      //   " Distributor ",
                      //   " Finance ",
                      //   "Furniture ",
                      //   " Gaming ",
                      //   "Health services ",
                      //   "HR & Business operations ",
                      //   "Immigration and payrolling ",
                      //   "IT services",
                      //   "Painting ",
                      //   " Real-estate ",
                      //   " Recruitment",
                      //   "Telecommunications ",
                      //   " Transport services ",
                      //   "Web development ",
                      // ]}
                      // onChange={() => {
                      //   this.handleFieldClik();
                      // }}
                      isColumn
                      component={SearchSelect}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        // marginTop: "0.25em",
                        height: "2.0625em",
                      }}
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
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                      // marginLeft: "2.5em",
                      // marginTop: "0.25em",
                    }}
                  />
                  <Spacer style={{ marginBottom: "1.875em" }} />
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
                  <Field
                        name="address[0].houseNo"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.houseNo"
                            defaultMessage="House No"
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
                        // label="Country"
                        isColumnWithoutNoCreate
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
                        value={values.countryName}
                        selectType="country"
                        inlineLabel
                        style={{ flexBasis: "80%" }}
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
                            id="app.zipcode"
                            defaultMessage="Zip Code"
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
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  // icon={<PoweroffOutlined />}
                  loading={updatePartnerContactById}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
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

const mapStateToProps = ({ auth, partner,sector,designations }) => ({
  setEditingPartnerContact: partner.setEditingPartnerContact,
  updatePartnerContactById: partner.updatePartnerContactById,
  updatePartnerContactByIdError: partner.updatePartnerContactByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerId: partner.partner.partnerId,
  sectorId:sector.sectorId,
  designationTypeId:designations.designationTypeId,
  //   tagWithCompany: customer.customer.name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      updatePartnerContact,
   
      getSectors,
      setEditPartnerContact,
      getDesignations,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePartnerContactForm);
