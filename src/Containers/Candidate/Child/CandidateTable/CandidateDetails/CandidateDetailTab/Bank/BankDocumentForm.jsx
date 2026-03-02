import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { addBankDetails } from "../../../../../CandidateAction";
import { FormattedMessage } from "react-intl";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class BankDocumentForm extends Component {
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
    const { addingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            bankName: "",
            branchName: "",
            ifscCode: "",
            accountNo: "",
            bank: this.state.defaultBank ? "true" : "false",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addBankDetails(
              { ...values,
                bank: this.state.defaultBank ? "true" : "false",
              },
              this.props.candidateId,
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
                 <FlexContainer justifyContent="space-between">
                    <div style={{width:"47%"}}>
                  <FastField
                    name="accountHolderName"
                    //label="Account Number"
                    label={
                      <FormattedMessage
                        id="app.accountNo"
                        defaultMessage="Account Holder Name"
                      />
                    }
                    isColumn
                    width={"100%"}
                    
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
                
                <div style={{ width: "47%" }}>
                  <FastField
                    name="accountNo"
                    //label="Account Number"
                    label={
                      <FormattedMessage
                        id="app.accountNo"
                        defaultMessage="Account #"
                      />
                    }
                    isColumn
                    width={"100%"}
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
                </FlexContainer>
                <Spacer />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <FastField
                      name="ifscCode"
                      //label="IFSC CODE"
                      label={
                        <FormattedMessage
                          id="app.ifscCode"
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
                  
                  <div style={{ width: "47%" }}>
                    <FastField
                      name="branchName"
                      // label="Branch Name"
                      label={
                        <FormattedMessage
                          id="app.branch"
                          defaultMessage="Branch"
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
                    <div style={{width:"47%"}}>
                  <FastField
                    isRequired
                    name="bankName"
                    //label="Bank Name"
                    label={
                      <FormattedMessage
                        id="app.bank"
                        defaultMessage="Bank"
                      />
                    }
                    type="text"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
                <Spacer style={{marginTop:"1.5em"}}/>
                
                <div style={{width:"47%"}}>
                <FlexContainer justifyContent="space-between"> 
                <StyledLabel>Default Bank?</StyledLabel>
                <Switch
                 
                  checked={this.state.defaultBank}
                  onChange={this.handleDefaultbank}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
                </FlexContainer>
              </div>
              </FlexContainer>

              <Spacer style={{marginTop:"1.25em"}}/>
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingBankDetails}
                >
                  Submit
                </Button>
              </FlexContainer>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
  addingBankDetails: candidate.addingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addBankDetails
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BankDocumentForm);
