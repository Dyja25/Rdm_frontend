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
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addEmploymentDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

import { getDesignations } from "../../../../../../Settings/Designation/DesignationAction";
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class EmploymentDocumentForm extends Component {
  render() {
    const { addingEmploymentDetails,startDate,endDate ,employeeId} = this.props;
    console.log(employeeId);
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            companyName: "",
            // startDate: "",
            // endDate: "",
            // employeeId: employeeId ? employeeId.value : "",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            endDate: dayjs(),
            // designation: "",
            designationTypeId: this.props.designationTypeId,
            description: "",
            salary: "",
            salaryType: "",
            currency: "",
            documentId: "",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            // console.log(values);

            let timeZoneFirst = "GMT+05:30";

            let mytimeZone = timeZoneFirst.substring(4, 10);
            console.log(mytimeZone);

            var a = mytimeZone.split(":");
            console.log(a);
            var timeZoneminutes = +a[0] * 60 + +a[1];
            console.log(timeZoneminutes);
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            console.log(newStartDate);
            //Time calculation
            let firstStartTime = dayjs(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); // getting start time from form input
            console.log(firstStartTime);

            let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
            console.log(firstStartHours);

            let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
            console.log(timeEndPart);

            var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
            console.log(firstStartTimeSplit);

            var minutes =
              +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
            console.log(minutes);

            var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
            console.log(firstStartTimeminutes);

            let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            console.log(finalStartTime);

            let newStartTime = `${finalStartTime}${timeEndPart}`;
            console.log(newStartTime);

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            console.log(firstEndTime);
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            console.log(firstEndHours);

            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            console.log(firstEndTimeSplit);
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            console.log(hr);
            let mi = firstEndTimeminutes % 60;
            console.log(hr);
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;
            console.log(finalEndTime);
            console.log(timeEndPart);
            console.log(`${finalEndTime}${timeEndPart}`);

            let newEndTime = `${finalEndTime}${timeEndPart}`;
            this.props.addEmploymentDetails(
              {
                ...values,
                // startDate: dayjs(values.startDate).toISOString(),
                // endDate: dayjs(values.endDate).toISOString(),
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
                // employeeId: this.props.employeeId,
              },
              this.props.employeeId,
              values.documentId,

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
                    width: "45%",
                    }}
                >
                  <div>
                    <Field
                      isRequired
                      name="companyName"
                      type="text"
                      isColumn
                      width={"100%"}
                      // label="Organization Name"
                      label={
                        <FormattedMessage
                          id="app.companyName"
                          defaultMessage="Organization Name"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  <Spacer />
                  <div>
                    <FastField
                      name="designationTypeId"
                      //label="Designation"
                      label={
                        <FormattedMessage
                          id="app.designation"
                          defaultMessage="Designation"
                        />
                      }
                      selectType="designationType"
                      isColumn
                      isColumnWithoutNoCreate
                      component={SearchSelect}
                      value={values.designationTypeId}
                      inlineLabel
                      />
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="startDate"
                        //label="Start Date"
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
                        />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="endDate"
                        // label="End Date "
                        label={
                          <FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />
                        }
                        isRequired
                        isColumn
                        width={"100%"}
                        component={DatePicker}
                        // value={values.endDate}
                        value={values.endDate || values.startDate}
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                        inlineLabel
                        />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer>
                    <div style={{ width: "35%" }}>
                      <Field
                        isRequired
                        name="salary"
                        type="text"
                        isColumn
                        width="47%"
                        //label="Salary"
                        label={
                          <FormattedMessage
                            id="app.salary"
                            defaultMessage="Salary"
                          />
                        }
                        component={InputComponent}
                        inlineLabel
                         style={{
                         width: "100%",
                         }}
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ width: "27%" }}>
                      <Field
                        isRequired
                        name="salaryType"
                        type="text"
                        isColumn
                        width="47%"
                        //label="Salary Type"
                        label={
                          <FormattedMessage
                            id="app.salaryType"
                            defaultMessage="Salary Type"
                          />
                        }
                        component={SelectComponent}
                        options={["Daily", "Monthly", "Annual"]}
                        inlineLabel
                        />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ width: "30%"}}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Curr"
                        // label="Curr"
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currency"
                        isRequired
                        component={SearchSelect}
                        // options={Array.isArray(currency) ? currency : []}
                        />
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <div>
                    <Field
                      name="description"
                      //label="Describe your role"
                      label={
                        <FormattedMessage
                          id="app.description"
                          defaultMessage="Describe your role"
                        />
                      }
                      isRequired
                      isColumn
                      width={"100%"}
                      component={TextareaComponent}
                      style={{ height: "5em" }}
                    />
                  </div>
                  <Spacer />
                </div>

                <div
                  style={{
                    width: "45%",
                     }}
                >
                  <Field
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  />
                  <Spacer />

                  <Field
                    name="documentTitle"
                    // label="Name of Document"
                    label={
                      <FormattedMessage
                        id="app.documentTitle"
                        defaultMessage="Name of Document"
                      />
                    }
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                   // style={{ height: "2.0625em"}}
                  />
                  <Spacer />
                  <Field
                    name="documentDescription"
                    //label="Description of Document"
                    label={
                      <FormattedMessage
                        id="app.documentDescription"
                        defaultMessage="Description of Document"
                      />
                    }
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    />
                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEmploymentDetails}
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

const mapStateToProps = ({ employee, profile,designations }) => ({
  // userId: auth.userDetails.userId,
  employeeId: employee.singleEmployee.employeeId,
  addingEmploymentDetails: profile.addingEmploymentDetails,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addEmploymentDetails, getDesignations,}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploymentDocumentForm);
