import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addSalaryDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class SalaryDocumentForm extends Component {
  render() {
    const { addingSalaryDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            grossMonthlySalary: "",
            startingDate: "",
            netSalary: "",
            // designation: "",
            // description: "",
            // salary: "",
            // salaryType: "",
             currency: "",
            // documentId: "",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addSalaryDetails(
              {
                ...values,
                startingDate: dayjs(values.startingDate).toISOString(),
              },
              this.props.employeeId,
              // values.documentId,

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
                  
                    <Field
                      isRequired
                      name="grossMonthlySalary"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Gross Amount"
                      label={
                        <FormattedMessage
                          id="app.grossMonthlySalary"
                          defaultMessage="Gross Amount"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        
                      }}
                    />
                    <Spacer />
                  <Field
                    name="netSalary"
                    //label="Net Salary"
                    label={
                      <FormattedMessage
                        id="app.netSalary"
                        defaultMessage="Net Salary"
                      />
                    }
                    width={"100%"}
                    isRequired
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em"}}
                  />
                  

                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "37%" }}>
        
                      <Field
                        name="startingDate"
                        // label="From"
                        label={
                          <FormattedMessage
                            id="app.startingDate"
                            defaultMessage="From"
                          />
                        }
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.startingDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          width: "100%",
                          
                        }}
                      />
                      </div>
                      <div style={{ width: "55%" }}>
                  
                        <Field
                          name="currency"
                          isColumnWithoutNoCreate
                          width="100%"
                          isColumn
                          selectType="currency"
                          component={SearchSelect}
                           flag={values.currency}
                          // options={
                          //   Array.isArray(currency) ? currency : []
                          // }
                          style={{
                            flexBasis: "80%",
                            height: "2em",
                            // marginTop: "0.4375em",
                          }}
                        />

</div>
                  </FlexContainer>
                    
           
                  <Spacer />

                  <Spacer />
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
  addingSalaryDetails: profile.addingSalaryDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSalaryDetails,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SalaryDocumentForm);
