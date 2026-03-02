import React, { lazy, Suspense, Component } from "react";
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
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import ButtonGroup from "antd/lib/button/button-group";
// import dayjs from "dayjs";
import { updateEmployeeSalaryDetails } from "../../../../../../Profile/ProfileAction";
// import { addSalaryDetails } from "../../../../ProfileAction";
import dayjs from "dayjs";
function onChange(date) {}

// const documentSchema = Yup.object().shape({
//   documentId: Yup.string().required("Input needed !"),
// });
class UpdateSalaryForm extends Component {
  render() {
    const { updatingEmployeeSalaryDetails } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            grossMonthlySalary:
              this.props.setEditingSalary.grossMonthlySalary || "",
            netSalary: this.props.setEditingSalary.netSalary || "",
            salaryDetailsId: this.props.setEditingSalary.salaryDetailsId,
            startingDate:
              dayjs(this.props.setEditingSalary.startingDate) || "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log({
              ...values,
            });
            this.props.updateEmployeeSalaryDetails(
              {
                ...values,
                startingDate: dayjs(values.startingDate).toISOString(),
              },

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
                  // border: "0.125em solid green"
                }}
              >
                <div>
                  <Field
                    isRequired
                    name="grossMonthlySalary"
                    type="text"
                    isColumn
                    width={"100%"}
                    // label="Gross Amount"
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
                      marginTop: "0.25em",
                    }}
                  />
                </div>

                <Spacer />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="startingDate"
                      //label="From"
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
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </FlexContainer>
                <Spacer />
              </div>

              <div
                style={{
                  width: "45%",
                  // border: "0.125em solid green"
                }}
              >
                <Field
                  name="netSalary"
                  // label="Net Salary"
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
                  style={{ height: "2.0625em", marginTop: "0.25em" }}
                />
                <Spacer />
              </div>

              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingEmployeeSalaryDetails}
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
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ profile, employee }) => ({
  setEditingSalary: profile.setEditingSalary,
  // userId: auth.userDetails.userId,
  employeeId: employee.singleEmployee.employeeId,
  updatingEmployeeSalaryDetails: profile.updatingEmployeeSalaryDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateEmployeeSalaryDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSalaryForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  // console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
