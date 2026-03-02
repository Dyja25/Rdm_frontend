import React, { lazy, Suspense, Component, Profiler } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch, Tooltip, Icon } from "antd";
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
// import { addBankDetails } from "../../../../ProfileAction";
import { updateBankDetails } from "../../../../../../Profile/ProfileAction";
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateBankForm extends Component {
  render() {
    const { updatingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingBank.id,
            bankName: this.props.setEditingBank.bankName || "",
            branchName: this.props.setEditingBank.branchName || "",
            ifscCode: this.props.setEditingBank.ifscCode || "",
            accountNo: this.props.setEditingBank.accountNo || "",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateBankDetails(
              values,
              this.props.userId,
              resetForm()
            );

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
                      name="accountNo"
                      // label="Account Number"
                      label={<FormattedMessage
                        id="app.accountNo"
                        defaultMessage="Account Number"
                      />}
                      isColumn
                      margintop={"0.25em"}
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
                        label={<FormattedMessage
                          id="app.ifscCode"
                          defaultMessage="IFSC CODE"
                        />}
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
                        isRequired
                        name="branchName"
                        //label="Branch Name"
                        label={<FormattedMessage
                          id="app.branchName"
                          defaultMessage="Branch Name"
                        />}
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
                      label={<FormattedMessage
                        id="app.bankName"
                        defaultMessage="Bank Name"
                      />}
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                </div>

                <Spacer style={{ marginTop: "1.25em" }} />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    htmlType="submit"
                    type="primary"
                    Loading={updatingBankDetails}
                  >
                    <FormattedMessage
                      id="app.update"
                      defaultMessage="Update"
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
  employeeId: employee.singleEmployee.employeeId,
  setEditingBank: profile.setEditingBank,
  updatingBankDetails: profile.updatingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateBankForm);
