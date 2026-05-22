import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
// import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
// import Upload from "../../../../../../Components/Forms/Formik/Upload";
// import { DatePicker } from "antd";
// import { profileReducer } from "../../../../ProfileReducer";
// import { addPersonalDetails } from "../../../../ProfileAction";
import { updatePersonalDetails } from "../../../../../../Profile/ProfileAction";

function onChange(date, dateString) {}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  emailId: Yup.string().email("Enter a valid Email"),
  firstName: Yup.string().required("Please provide First Name"),
  phoneNo: Yup.string().matches(phoneRegExp, "Enter a valid Phone No"),
  mobileNo: Yup.string().matches(phoneRegExp, "Enter a valid Mobile No"),

  documentId: Yup.string().required("Input needed !"),
});

class UpdatePersonalForm extends Component {
  render() {
    // const {
    //     addingContact,
    //     users,
    //     accountId,
    //     defaultAccounts,
    //     defaultOpportunities,
    //     callback,
    // } = this.props;
    // console.log(accountId);
    const { updatingPersonalDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingPersonal.id,
            bloodGroup: this.props.setEditingPersonal.bloodGroup || "",
            dob: this.props.setEditingPersonal.dob || "",
            contactSalutation:
              this.props.setEditingPersonal.contactSalutation || "",
            contactFirstName:
              this.props.setEditingPersonal.contactFirstName || "",
            contactMiddleName:
              this.props.setEditingPersonal.contactMiddleName || "",
            contactLastName:
              this.props.setEditingPersonal.contactLastName || "",
            mobileNo: this.props.setEditingPersonal.mobileNo || "",
            phoneNo: this.props.setEditingPersonal.phoneNo || "",

            address: [
              {
                address1: this.props.setEditingPersonal.address1 || "",
                town: this.props.setEditingPersonal.town || "",
                postalCode: this.props.setEditingPersonal.postalCode || "",
                houseNo: this.props.setEditingPersonal.houseNo || "",
                country: this.props.setEditingPersonal.country || "",
              },
            ],
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updatePersonalDetails(
              values,
              this.props.employeeId,

              resetForm()
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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "100%",
                     }}
                >
                 <FlexContainer flexWrap="nowrap" alignItems="flex-start">

                  {/* <FlexContainer justifyContent="space-between">
                                            <div style={{ width: "47%" }}>
                                                <FastField
                                                    type="text"
                                                    name="bloodGroup"
                                                    label="Blood Group"
                                                    isColumn
                                                    width={"100%"}
                                                    component={SelectComponent}
                                                    options={[
                                                        "A+",
                                                        "A-",
                                                        "B+",
                                                        "B-",
                                                        "AB+",
                                                        "AB-",
                                                        "O+",
                                                        "O-",
                                                    ]}
                                                    inlineLabel
                                                    style={{
                                                        flexBasis: "80%",
                                                        height: "2.0625em",
                                                        // marginTop: "0.25em",
                                                    }}
                                                />
                                            </div>
                                            <Spacer />
                                            <div style={{ width: "47%" }}>
                                                <StyledLabel>Date of Birth</StyledLabel>
                                                <DatePicker onChange={onChange} />
                                            </div>
                                        </FlexContainer> */}


                  {/* <FlexContainer justifyContent="space-between"> */}
                   <div style={{ padding: "2px", width: "100%" }}>
                                                            <FlexContainer
                                         style={{
                                           width: "100%",
                                           display: "flex",
                                           flexDirection: "row",
                                           alignItems: "flex-start",
                                         }}
                                       >
                                         <div style={{ width: "20%" }}>
                      <FastField
                        name="contactSalutation"
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
                            isColumn
                             style={{
          width: "95%",
          height: "38px",
          border: "1px solid #d9d9d9",
          outline: "none",
          boxShadow: "none",
        }}
                       />
                    </div>
                    <div style={{ width: "80%" }}>
                      <FastField
                        isRequired
                        name="contactFirstName"
                        //label="First Name"
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
                        name="contactMiddleName"
                        // label="Middle "
                        label={
                          <FormattedMessage
                            id="app.middleName"
                            defaultMessage="Middle"
                          />
                        }
                        className="w-full"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
           width: "95%",
          // height: "38px",
          // border: "1px solid #d9d9d9",
          // outline: "none",
          // boxShadow: "none",
        }}
                        />
                    </div>
                   <div style={{ width: "60%" }}>
                     <FastField
                        name="contactLastName"
                        // label="Last Name"
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
                 <FlexContainer
  style={{
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  }}
>
                    <div style={{ width: "40%", paddingRight: "12px",marginTop:"15px" }}>
                      <Field
                        name="countryDialCode"
                        // label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.mobile#"
                            defaultMessage="Mobile #"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        className="w-full"
      style={{
        width: "95%",
        height: "38px",
      }}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "60%" }}>
                      <Field
                        type="text"
                        name="mobileNo"
                        label={
                          <FormattedMessage
                            id="app.mobilenumber"
                            defaultMessage="Mobile No"
                          />
                        }
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                       className="w-full"
      style={{ width: "100%" }}
                        isColumn
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
                    <div style={{ width: "40%", paddingRight: "12px",marginTop:"15px" }}>
                      <Field
                        name="countryDialCode1"
                        //  label="Phone #"
                        label={
                          <FormattedMessage
                            id="app.phone#"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                         className="w-full"
      style={{
        width: "95%",
        height: "38px",
      }}
                        />
                    </div>
                    <div style={{ width: "60%" }}>
                      <Field
                        type="text"
                        name="phoneNo"
                        label={
                          <FormattedMessage
                            id="app.phoneNumber"
                            defaultMessage="Phone No"
                          />
                        }
                        placeholder="Phone #"
                        component={InputComponent}
                        inlineLabel
                        className="w-full"
      style={{ width: "100%" }}
                        isColumn
                        />
                    </div>
                  </FlexContainer>
                  {/* <FlexContainer justifyContent="space-between"> */}

                  {/* </FlexContainer> */}
                  <Spacer />

                  <Spacer />
                </div>

                {/* <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
                  }}
                >
                  <FieldArray
                    name="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />

                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div> */}
                <Spacer />
              </div>
              <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingPersonalDetails}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  // userId: auth.userDetails.userId,
  setEditingPersonal: profile.setEditingPersonal,
  employeeId: employee.singleEmployee.employeeId,
  updatingPersonalDetails: profile.updatingPersonalDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updatePersonalDetails,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalForm);
