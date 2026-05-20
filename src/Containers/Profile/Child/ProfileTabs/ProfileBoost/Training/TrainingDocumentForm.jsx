import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,  } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import Upload from "../../../../../../Components/Forms/Formik/Upload";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { addTrainingDetails } from "../../../../ProfileAction";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
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
            documentTypeId: "",
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
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <FastField
                        isRequired
                        name="courseName"
                        //label="Course Name"
                        label={
                          <FormattedMessage
                            id="app.coursename"
                            defaultMessage="Course Name"
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
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "60%" }}>
                      {/* <StyledLabel>Organization/Institution</StyledLabel> */}
                      <FastField
                        type="Organization"
                        name="organization"
                        label={
                          <FormattedMessage
                            id="app.organizationInstitution"
                            defaultMessage="Organization/Institution"
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
                          marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ width: "30%" }}>
                      {/* <StyledLabel>Grade</StyledLabel> */}
                      <FastField
                        name="grade"
                        label={
                          <FormattedMessage
                            id="app.grade"
                            defaultMessage="Grade"
                          />
                        }
                        isColumn
                        selectType="text"
                        width={"30%"}
                        component={InputComponent}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
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
                        label={
                          <FormattedMessage
                            id="app.startdate"
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

                    <div style={{ width: "47%" }}>
                      <Field
                        name="endDate"
                        //label="End Date "
                        label={
                          <FormattedMessage
                            id="app.enddate"
                            defaultMessage="End Date"
                          />
                        }
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
                    width: "50%",
                    // border: "0.125em solid green"
                  }}
                >
                  <FlexContainer justifyContent="space-between"></FlexContainer>

                  <div
                    style={{
                      width: "100%",
                      // border: "0.125em solid green"
                    }}
                  >
                    <Field
                      name="documentId"
                      isRequired
                      component={DragableUpload}
                    />

                    <Field
                      name="documentTitle"
                      //label="Name of Document"
                      label={
                        <FormattedMessage
                          id="app.nameofdocument"
                          defaultMessage="Name of Document"
                        />
                      }
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      style={{ height: "2.0625em", marginTop: "0.25em" }}
                    />
                    <Spacer />
                    <Field
                          name="documentTypeId"
                          selectType="documentTypeName"
                          isColumnWithoutNoCreate
                          // label="Type"
                          label={
                            <FormattedMessage
                              id="app.documentId"
                              defaultMessage="Type"
                            />
                          }
                          // isRequired
                          component={SearchSelect}
                          isColumn
                          margintop={"0.25em"}
                          value={values.documentId}
                          // defaultValue={{ label: firstName, value: documentId }}
                          inlineLabel
                          style={{ flexBasis: "80%" }}
                        />
                          <Spacer />
                    <Field
                      name="documentDescription"
                      //label="Description of Document"
                      label={
                        <FormattedMessage
                          id="app.descriptionofdocument"
                          defaultMessage="Description of Document"
                        />
                      }
                      isRequired
                      isColumn
                      width={"100%"}
                      component={TextareaComponent}
                      style={{ height: "5em", marginTop: "0.25em" }}
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
  addingTrainingDetails: profile.addingTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addTrainingDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingDocumentForm);
