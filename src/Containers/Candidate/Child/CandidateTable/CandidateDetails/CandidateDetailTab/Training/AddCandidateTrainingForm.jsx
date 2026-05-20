import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
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

import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addCandidateTrainingDetails } from "../../../../../CandidateAction";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";

const documentSchema = Yup.object().shape({
  // documentId: Yup.string().required("Input needed !"),
  courseName:Yup.string().required("Input needed !"),
  startDate: Yup.string().required("Input needed !"),
  endDate: Yup.string().required("Input needed !"),
});

class AddCandidateTrainingForm extends Component {
  render() {
    const { addingCandidateTrainingDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            courseName: "",
            grade: "",
            startDate: "",
            endDate: "",
            organization: "",
            documentId: "",
          }}
          validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addCandidateTrainingDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.candidateId,
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
                          />
                      </div>
                    </FlexContainer>

                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "60%" }}>                     
                        <FastField
                          type="Organization"
                          name="organization"
                          label={
                            <FormattedMessage
                              id="app.organization"
                              defaultMessage="Organization/Institution"
                            />
                          }
                          className="field"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          />
                      </div>
                      <div style={{ width: "30%" }}>                        
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
                          style={{width:"100%"}}
                          />
                      </div>
                    </FlexContainer>
                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <Field
                          name="startDate"                        
                          label={
                            <FormattedMessage
                              id="app.start"
                              defaultMessage="Start"
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
                          label={
                            <FormattedMessage
                              id="app.end"
                              defaultMessage="End"
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
                      <FlexContainer justifyContent="space-between">
                      <div style={{width:"47%"}}>
                      <Field
                        name="documentTitle"                        
                        label={
                          <FormattedMessage
                            id="app.nameofdocument"
                            defaultMessage="Name of Document"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        />
                        </div>
                      <div style={{width:"47%"}}>
                      <Field
                        name="documentTypeId"
                        isColumnWithoutNoCreate
                        selectType="documentTypeName"                       
                        label={
                          <FormattedMessage
                            id="app.type"
                            defaultMessage="Type"
                          />
                        }                        
                        component={SearchSelect}
                        isColumn
                        
                        value={values.documentId}                        
                        inlineLabel
                      />
                      </div>
                      </FlexContainer>
                      <Spacer/>
                      <Field
                        name="documentDescription"                        
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
                        />
                      <Spacer style={{ marginBottom: "0.9375em" }} />
                    </div>

                    <Spacer />
                <Spacer style={{ marginBottom: "0.9375em" }} />
                  </div>
                </div>
                <Spacer />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    htmlType="submit"
                    type="primary"
                    Loading={addingCandidateTrainingDetails}
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

const mapStateToProps = ({ candidate }) => ({
  // userId: auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
  addingCandidateTrainingDetails: candidate.addingCandidateTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addCandidateTrainingDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCandidateTrainingForm);
