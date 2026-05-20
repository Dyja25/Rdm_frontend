import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
// import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
// import Upload from "../../../../../../Components/Forms/Formik/Upload";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray.jsx";
import { DatePicker } from "antd";
import { addPersonalDetails } from "../../../../ProfileAction";

function onChange(date, dateString) {}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  emailId: Yup.string().email("Enter a valid Email"),
  firstName: Yup.string().required("Please provide First Name"),
  phoneNo: Yup.string().matches(phoneRegExp, "Enter a valid Phone No"),
  mobileNo: Yup.string().matches(phoneRegExp, "Enter a valid Mobile No"),

  documentId: Yup.string().required("Input needed !"),
});

class PersonalDocumentForm extends Component {
  render() {
    const {
      addingContact,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      addingPersonalDetails,
    } = this.props;
    console.log(accountId);

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            bloodGroup: "",
            dob: "",
            contactSalutation: "",
            contactFirstName: "",
            contactMiddleName: "",
            contactLastName: "",
            mobileNo: "",
            phoneNo: "",

            address: [
              {
                address1: "",
                town: "",
                postalCode: "",
                houseNo:"",
                country: "",
              },
            ],
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addPersonalDetails(
              { ...values },

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
                  // border: "0.125em solid red",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
                  }}
                >
                  {/* <FlexContainer flexWrap="no-wrap"> */}

                  <Spacer />

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "25%" }}>
                      <FastField
                        name="contactSalutation"
                        type="text"
                        //label="Salutation"
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
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div style={{ width: "67%" }}>
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
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          height: "2.0625em",
                          flexBasis: "80%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "55%" }}>
                      <FastField
                        name="contactLastName"
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
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div style={{ width: "38%" }}>
                      <FastField
                        name="contactMiddleName"
                        //label="Middle "
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
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  {/* </FlexContainer> */}
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
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
                        margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
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
                        width={"100%"}
                        isColumn
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        // label="Phone #"
                        label={
                          <FormattedMessage
                            id="app.phone#"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        type="text"
                        name="phoneNo"
                        label={
                          <FormattedMessage
                            id="app.phoneno#"
                            defaultMessage="Phone No#"
                          />
                        }
                        placeholder="Phone #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  {/* <FlexContainer justifyContent="space-between"> */}

                  {/* </FlexContainer> */}
                  <Spacer />

                  <Spacer />
                </div>

                <div
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
                </div>
                <Spacer />
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingPersonalDetails}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile }) => ({  
  addingPersonalDetails: profile.addingPersonalDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addPersonalDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDocumentForm);
