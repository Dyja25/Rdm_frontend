import React, { lazy, Suspense, Component, Profiler } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";

import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { updateBankDetails } from "../../../../../CandidateAction";
import { FormattedMessage } from "react-intl";
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateBankForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultBank: false,
    };
  }
  handleDefaultbank = (checked) => {
    this.setState({ defaultBank: checked });
  };
  render() {
    const { updatingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            id: this.props.setEditingBank.id,
            bankName: this.props.setEditingBank.bankName || "",
            branchName: this.props.setEditingBank.branchName || "",
            ifscCode: this.props.setEditingBank.ifscCode || "",
            accountNo: this.props.setEditingBank.accountNo || "",
            bank: this.props.setEditingBank.bank || this.state.defaultBank ? "true" : "false",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateBankDetails(
              values,
              // this.props.userId,
              this.props.candidateId,

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
                  // margin: "0.9375em 3.125em",
                  // border: "0.125em solid green"
                }}
              >
                <div style={{ width: "100%" }}>
                  <FastField
                    name="accountNo"
                    // label="Account Number"
                    label={
                      <FormattedMessage
                        id="app.accountNo"
                        defaultMessage="Account #"
                      />
                    }
                    isColumn
                    // margintop={"0.25em"}
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
                          defaultMessage="SWIFT CODE"
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
                  &nbsp;&nbsp;
                  <div style={{ width: "50%" }}>
                    <FastField
                      isRequired
                      name="branchName"
                      //label="Branch Name"
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
                      style={{
                        height: "2.0625em",
                        flexBasis: "80%",
                        // marginTop: "0.25em",
                      }}
                    />
                  </div>
                </FlexContainer>
                <Spacer />
                <div style={{ width: "100%" }}>
                  <FastField
                    isRequired
                    name="bank"
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
                    style={{
                      height: "2.0625em",
                      flexBasis: "80%",
                      // marginTop: "0.25em",
                    }}
                  />
                </div>
                <Spacer style={{marginTop:"1.5625em"}}/>
                <StyledLabel>
                  {/* Default Bank? */}
                  <FormattedMessage id="app.defaultBank" defaultMessage="Default Bank?" />
                  </StyledLabel>&nbsp;&nbsp;
                <Switch
                  style={{ width: "5em" }}
                  checked={this.state.defaultBank}
                  onChange={this.handleDefaultbank}
                  checkedChildren={<FormattedMessage id="app.yes" defaultMessage="Yes" />}
                  unCheckedChildren={<FormattedMessage id="app.no" defaultMessage="No" />}
                />
              </div>

              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingBankDetails}
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

const mapStateToProps = ({ candidate }) => ({
  candidateId: candidate.candidate.candidateId,
  setEditingBank: candidate.setEditingBank,
  updatingBankDetails: candidate.updatingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateBankForm);
