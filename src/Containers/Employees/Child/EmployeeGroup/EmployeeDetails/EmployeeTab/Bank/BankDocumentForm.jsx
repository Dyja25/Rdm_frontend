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
// import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
// import Upload from "../../../../../../Components/Forms/Formik/Upload";
// import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
// import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { addBankDetails } from "../../../../../../Profile/ProfileAction";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
  accountHolderName: Yup.string().required("Input needed !"),
});
class BankDocumentForm extends Component {
  render() {
    const { addingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            bankName: "",
            branchName: "",
            ifscCode: "",
            accountNo: "",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addBankDetails(values, this.props.employeeId);

            resetForm();
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
                  width: "100%",
                    }}
              >
                <div style={{ width: "100%" }}>
                  <FastField
                    isRequired
                    name="accountHolderName"
                    //label="Account Number"
                    label={
                      <FormattedMessage
                        id="app.accountHolder"
                        defaultMessage="Account Holder Name"
                      />
                    }
                    isColumn
                    
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                    style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
                <Spacer />
                <div style={{ width: "100%" }}>
                  <FastField
                    name="accountNo"
                    //label="Account Number"
                    label={
                      <FormattedMessage
                        id="app.accountNo"
                        defaultMessage="Account Number"
                      />
                    }
                    isColumn
                   
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                    style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
                <Spacer />
                <FlexContainer>
                  <div style={{ width: "47%" }}>
                    <FastField
                      name="ifscCode"
                      //label="IFSC CODE"
                      label={
                        <FormattedMessage
                          id="app.ifsccode"
                          defaultMessage="SWIFT Code"
                        />
                      }
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  &nbsp;&nbsp;
                  <div style={{ width: "50%" }}>
                    <FastField
                      // isRequired
                      name="branchName"
                      // label="Branch Name"
                      label={
                        <FormattedMessage
                          id="app.branchname"
                          defaultMessage="Branch Name"
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
                <div style={{ width: "100%" }}>
                  <FastField
                    isRequired
                    name="bankName"
                    //label="Bank Name"
                    label={
                      <FormattedMessage
                        id="app.bankname"
                        defaultMessage="Bank Name"
                      />
                    }
                    type="text"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
              </div>

              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingBankDetails}
                >
                   <FormattedMessage
                        id="app.submit"
                        defaultMessage="submit"
                      />
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
  // userId: auth.userDetails.userId,
  employeeId: employee.singleEmployee.employeeId,
  addingBankDetails: profile.addingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BankDocumentForm);
