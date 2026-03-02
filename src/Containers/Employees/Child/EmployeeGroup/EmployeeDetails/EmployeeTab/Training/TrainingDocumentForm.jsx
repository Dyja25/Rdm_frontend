import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch, Tooltip, } from "antd";
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
// import Upload from "../../../../../../Components/Forms/Formik/Upload";
// import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
// import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addTrainingDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

// const documentSchema = Yup.object().shape({
//   documentId: Yup.string().required("Input needed !"),
// });

class TrainingDocumentForm extends Component {
  render() {
    const { addingTrainingDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            courseName: "",
            grade: "",
            startDate: "",
            endDate: "",
            organization: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addTrainingDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
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
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "100%" }}>
                        <FastField
                          isRequired
                          name="courseName"
                          //label="Course Name"
                          label={<FormattedMessage
                            id="app.courseName"
                            defaultMessage="Course Name"
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
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "60%" }}>
                        {/* <StyledLabel>Organization/Institution</StyledLabel> */}
                        <FastField
                          type="Organization"
                          name="organization"
                          label={<FormattedMessage
                            id="app.organization"
                            defaultMessage="Organization"
                          />}
                          className="field"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          />
                      </div>
                      <div style={{ width: "30%" }}>
                        <StyledLabel>Grade</StyledLabel>
                        <FastField
                          name="grade"
                          label={<FormattedMessage
                            id="app.grade"
                            defaultMessage="Grade"
                          />}
                          isColumn
                          selectType="text"
                          width={"30%"}
                          component={InputComponent}
                          inlineLabel
                           style={{
                             width: "100%",
                           }}
                        />
                      </div>
                    </FlexContainer>
                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <Field
                          name="startDate"
                          //label="Start Date"
                          label={<FormattedMessage
                            id="app.startDate"
                            defaultMessage="Start Date"
                          />}
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
                          //label="End Date "
                          label={<FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />}
                          isRequired
                          isColumn
                          width={"100%"}
                          component={DatePicker}
                          value={values.endDate}
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
                  </div>

                  <div
                    style={{
                      width: "50%",
                        }}
                  >
                   <FlexContainer justifyContent="space-between"></FlexContainer>

                    <div
                      style={{
                        width: "100%",
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
                        //label="Name of Document"
                        label={<FormattedMessage
                          id="app.documentTitle"
                          defaultMessage="Name of Document"
                        />}
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        />
                      <Spacer />
                      <Field
                        name="documentDescription"
                        //label="Description of Document"
                        label={<FormattedMessage
                          id="app.documentDescription"
                          defaultMessage="Description of Document"
                        />}
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                          />
                      <Spacer style={{ marginBottom: "0.9375em" }} />
                    </div>

                    <Spacer />

                    {/* <FieldArray
                                    name="address"
                                    render={(arrayHelpers) => (
                                        <AddressFieldArray
                                            singleAddress
                                            arrayHelpers={arrayHelpers}
                                            values={values}
                                        />
                                    )}
                                /> */}

                    <Spacer style={{ marginBottom: "0.9375em" }} />
                  </div>
                </div>
                <Spacer />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    htmlType="submit"
                    type="primary"
                    Loading={addingTrainingDetails}
                  >
                    <FormattedMessage
                      id="app.submit"
                      defaultMessage="Submit"
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
  addingTrainingDetails: profile.addingTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addTrainingDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingDocumentForm);
