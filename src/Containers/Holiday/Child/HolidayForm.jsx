import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
// import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../Components/UI/Layout";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
// import { addBankDetails } from "../../../../ProfileAction";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class HolidayForm extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      toggle: false,
    };
  }
  handleChange = (checked) => {
    this.setState({
      toggle: checked,
    });
  };
  handleClose = () => {
    this.setState({
      toggle: this.state.toggle ? false : false,
    });
  };
  render() {
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.userId,
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addBankDetails(
              {
                ...values,
              },
              this.props.userId,

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
                  width: "100%",
                  // margin: "0.9375em 3.125em",
                  // border: "0.125em solid green"
                }}
              >
                <div style={{ width: "100%" }}>
                  <FastField
                    name="accountNo"
                    // label="Holiday Name"
                    label={
                      <FormattedMessage
                        id="app.accountNo"
                        defaultMessage="Holiday Name"
                      />
                    }
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
                    <Field
                      name="startDate"
                      // label="Start Date"
                      label={
                        <FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />
                      }
                      isRequired
                      component={DatePicker}
                      isColumn
                      width={"100%"}
                      value={values.startDate}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.25em",
                        width: "100%",
                      }}
                    />
                  </div>
                  &nbsp;&nbsp;
                  <div style={{ width: "50%" }}></div>
                </FlexContainer>
                <Spacer />
                <div style={{ width: "100%" }}>
                  {/* <Switch
                                        style={{ width: "6.25em", marginLeft: "0.625em" }}
                                        onChange={this.handleChange}
                                        checked={this.state.toggle}
                                        checkedChildren="Optional"
                                        unCheckedChildren="Mandatory"
                                    /> */}
                </div>
              </div>

              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  // Loading={adddingDocumentByOpportunityId}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                  {/* Submit */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // addBankDetails
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HolidayForm);
