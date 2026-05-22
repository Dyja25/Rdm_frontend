import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button ,Switch,Checkbox} from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { base_url } from "../../../Config/Auth";
import { StyledLabel } from "../../../Components/UI/Elements";
import { Spacer } from "../../../Components/UI/Elements";
import Clearbit from "../../../Components/Forms/Autocomplete/Clearbit";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray.jsx";
import ProgessiveImage from "../../../Components/Utils/ProgressiveImage";
import {
  addCustomer,
  // setClearbitData,
  //  getAccounts,
} from "../CustomerAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray2 from "../../../Components/Forms/Formik/AddressFieldArray2.jsx";
/**
 * yup validation scheme for creating a account
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
   name: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email"),
  // phoneNumber: Yup.string().required("Input needed!").matches(phoneRegExp, "Enter a valid Phone No"),
});

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      whiteblue: true,
      checked:true,
    };
  }

  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked });
  };

  handleReset = (resetForm) => {
    resetForm();
  };
  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingCustomer,
      addCustomer,
      clearbit,
      setClearbitData,
    } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            // sectorId:"",
            // sectorName:"",
            partnerName: "",
            // sectorDescription:"",
            name: "",
            url: "",
            // sector: "",
            sectorId: "",
            country: this.props.user.country,
            country1: this.props.user.countryName,
            email: "",
            // sector: this.props.user.sectorName,
            countryDialCode: this.props.user.countryDialCode,
            phoneNumber: "",
            category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
            userId: this.props.userId,
            notes: "",
            department: "",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                houseNo:"",
                country: this.props.user.countryName,
              }, 
            ],
             billingAddress: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                houseNo:"",
                country1: this.props.user.countryName,
              }, 
            ],
            category: this.state.whiteblue ?"White" : "Blue"||"Both",
          }}
          // validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addCustomer(
              {
                ...values,
                category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
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
              <div style={{ display: "flex", justifyContent: "space-between",height: "70vh",paddingRight: "0.6em",overflowX:"auto",scrollbarwidth:"thin" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage id="app.name" defaultMessage="Name" />
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
                    label={<FormattedMessage id="app." defaultMessage="URL" />}
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
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    //isRequired
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />                                  
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        // label="Phone #"
                        label={
                          <FormattedMessage
                            id="app.phone"
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
                        name="phoneNumber"
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
                    height: "100%",
                    width: "45%",
                    }}
                >
                  
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "37%" }}>
                      <Field
                        name="vatNo"
                        type="text"
                        // label="VAT Number"
                        label={
                          <FormattedMessage
                            id="app.vatNumber"
                            defaultMessage="VAT Number"
                          />
                        }
                        //isRequired
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "55%" }}>
                      <FastField
                        // name="department"
                        // label="Department"
                        name="sectorId"
                        isColumnWithoutNoCreate

                        selectType="sectorName"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                      
                        value={values.sectorId}
                        />
                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <FlexContainer justifyContent="space-between">
                  <div style={{ width: "65%" }}>
                  <FlexContainer justifyContent="space-between">                 
                 <StyledLabel>
                  {/* Requirement Type */}
                        <FormattedMessage
                            id="app.requirementType"
                            defaultMessage="Requirement Type"
                          />
                 </StyledLabel>
                 <Switch                                 
                   checked={this.state.whiteblue}
                    onChange={this.handleWhiteBlue}
                   disabled={this.state.checked}
                   checkedChildren="White collar"
                   unCheckedChildren="Blue collar"
                 />
                 </FlexContainer>
                 </div>
                 <div style={{ width: "30%" }}>
              <Checkbox
              checked={this.state.checked}
              onChange={() => this.handleChange()}
              style={{marginLeft:"auto"}}
            >
              {/* Both */}
               <FormattedMessage
                            id="app.both"
                            defaultMessage="Both"
                          />
            </Checkbox>
            </div>
                  </FlexContainer>
                  <Spacer style={{marginTop:"1.25em"}}/>   
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                   <FlexContainer justifyContent="space-between">
                       <div style={{ width: "47%" }}>
                      <Field
                        // name="address[0].country"
                        // The searchselect without create component will work on calling ( isColumnWithoutNoCreate)
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
                          value: this.props.user.country,
                        }}
                        value={values.country}
                        selectType="country"
                        inlineLabel
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer>
                  <Spacer style={{marginTop:"1.25em"}}/>   
                  <div className="text-base underline">Billing Address</div>
                   <Spacer style={{marginTop:"1.25em"}}/>   
                  <FieldArray
                    name="billingAddress"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray2
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                   
                  <Spacer />                  
                 
                </div>              
              </div>              
              <Spacer style={{marginTop:"1.25em"}}/>              
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingCustomer}
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

const mapStateToProps = ({ auth, customer }) => ({
  addingCustomer: customer.addingCustomer,
  addingCustomerError: customer.addingCustomerError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCustomer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
