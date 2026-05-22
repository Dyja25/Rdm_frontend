import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray.jsx";

import {
  addPartner,
  // setClearbitData,
  //  getAccounts,
} from "../PartnerAction"; 
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { StyledLabel } from "../../../Components/UI/Elements";

/**
 * yup validation scheme for creating a account
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const PartnerSchema = Yup.object().shape({
  partnerName: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email"),
  // phoneNumber: Yup.string().required("Input needed!").matches(phoneRegExp, "Enter a valid Phone No"),
});

class PartnerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentStatus: false,
    };
  }
  handleDocumentStatus = (checked) => {
    this.setState({ documentStatus: checked });
  };
  handleReset = (resetForm) => {
    resetForm();
  };

  render() {
    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingPartner,
      addPartner,
      clearbit,
      setClearbitData,
    } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            sectorId:"",
            partnerName: "",
            sectorDescription:"",
            url: "",
            countryDialCode: this.props.user.countryDialCode,
            email: "",
            phoneNo: "",
            userId: this.props.userId,
            notes: "",
            taxRegistrationNumber: "",
            country: this.props.user.country,
            businessRegistrationNumber: "",
            bankName: "",
            // country: "",
            accountNumber: "",
            status: this.state.documentStatus ? "true" : "false",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                houseNo:"",
                // country: "",
                country: this.props.user.countryName,
              },
            ],
          }}
          validationSchema={PartnerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addPartner(
              {
                ...values,
                status: this.state.documentStatus ? "true" : "false",
              },
              this.props.userId,
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
            <Form className="form-background">
              <div style={{ display: "flex", justifyContent: "space-between",height: "70vh",paddingRight: "0.6em" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    isRequired
                    name="partnerName"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    accounts={accounts}
                    inlineLabel
                    />
                  <Spacer />
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={<FormattedMessage id="app.url" defaultMessage=" URL" />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                  <Spacer />
                  <Field
                    name="email"
                    type="text"
                    // label="Email"
                    label={
                      <FormattedMessage id="app.emailid" defaultMessage="Email" />
                    }
                    //isRequired
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                  <Spacer />
                  <div style={{ width: "100%" }}>
                    <FastField
                      name="sectorId"
                      isColumnWithoutNoCreate
                      selectType="sectorName"
                      

                      

                      // label="Sectors"
                      label={
                        <FormattedMessage
                          id="app.sector"
                          defaultMessage="Sector"
                        />
                      }
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
                      value={values.sectorId}
                      />
                  </div>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                       
                        label={
                          <FormattedMessage
                            id="app.mobile#"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                       component={SearchSelect}
                        value={values.countryDialCode1}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "70%" }}>
                      <FastField
                        //isRequired
                        type="text"
                        name="phoneNo"
                        // required
                        //placeholder="Phone #"
                        // label={
                        //   <FormattedMessage
                        //     id="app.phone"
                        //     defaultMessage="Phone #"
                        //   />
                        // }
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                       />                   
                        </div>
                  </FlexContainer>

                  <Spacer style={{ marginTop: "1.5625em" }} />
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
                    height: "100%",
                    width: "45%",
                    }}
                >
                  <FieldArray
                    name="address"
                    label="searxh"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                   <div style={{ width: "47%" }}>
                      <Field
                        // name="address[0].country"
                        name="country"
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
                        value={values.countryName}
                        selectType="country"
                        isColumn
                        width="100%"
                        />
                    </div> 
                    <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="taxRegistrationNumber"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage id="app.taxreg" defaultMessage=" Tax Reg#" />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="businessRegistrationNumber"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.businessreg"
                            defaultMessage=" Business Reg#"
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
                      <Field
                        name="bankName"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage id="app.bankname" defaultMessage=" Bank Name" />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                       />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="accountNumber"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage id="app.account" defaultMessage="Account #" />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                  </FlexContainer>

                  <Spacer style={{ marginTop: "1.5625em" }} />
                <StyledLabel>Status</StyledLabel>
                &nbsp;&nbsp;
                <Switch
                  
                  checked={this.state.documentStatus}
                  onChange={this.handleDocumentStatus}
                  checkedChildren="Approved"
                  unCheckedChildren="Not Approved"
                />
                    <Spacer style={{ marginTop: "1.5625em" }} />
                  {/* <Field
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
                  <Spacer /> */}
                  {/* <Field
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
                  <Spacer /> */}
                  <FlexContainer justifyContent="space-between">
                    {/* <div style={{ width: "47%" }}>
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
                        // isColumn
                        width="100%"
                        />
                    </div> */}
                    
                  </FlexContainer>
                  <Spacer />
                  {/* <FlexContainer justifyContent="space-between">
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
                            id="app.address[0].postalCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                        />
                    </div>
                  </FlexContainer> */}
               

                
                 </div>
              </div>
              <Spacer style={{marginTop:"1.25em"}}/>
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingPartner}
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

const mapStateToProps = ({ auth, partner }) => ({
  addingPartner: partner.addingPartner,
  addingPartnerError: partner.addingPartnerError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPartner,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PartnerForm);
