import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";

import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";

import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { updateCandidateTrainingDetails } from "../../../../../CandidateAction";
import dayjs from "dayjs";
// import { profileReducer } from "../../../../ProfileReducer";
import { FormattedMessage } from "react-intl";

const documentSchema = Yup.object().shape({
  // documentId: Yup.string().required("Input needed !"),
});
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

class UpdateCandidateTrainingForm extends Component {
  render() {
    const { updatingCandidateTrainingDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            id: this.props.setCandidateEditingTraining.id,
            courseName: this.props.setCandidateEditingTraining.courseName || "",
            grade: this.props.setCandidateEditingTraining.grade || "",
            startDate:
              dayjs(this.props.setCandidateEditingTraining.startDate) || "",
            endDate:
              dayjs(this.props.setCandidateEditingTraining.endDate) || "",
            organization:
              this.props.setCandidateEditingTraining.organization || "",
            candidateTrainingId:this.props.setCandidateEditingTraining.candidateTrainingId || "",
            }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateCandidateTrainingDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
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
                }}
              >
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "100%" }}>
                    <FastField
                      isRequired
                      name="courseName"                      
                      label={
                        <FormattedMessage
                          id="app.courseName"
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
                      }}
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
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",                       
                        width: "100%",
                      }}
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
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",                      
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
                        width: "100%",                       
                      }}
                    />
                  </div>

                  <div style={{ width: "47%" }}>
                    <Field
                      name="endDate"                      
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
                      }}
                    />
                  </div>
                </FlexContainer>
                <Spacer />
              </div>             

              <Spacer style={{ marginBottom: "0.9375em" }} />              
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingCandidateTrainingDetails}
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
  setCandidateEditingTraining: candidate.setCandidateEditingTraining,
  updatingCandidateTrainingDetails: candidate.updatingCandidateTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateCandidateTrainingDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateTrainingForm);
