import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip, Icon } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import ButtonGroup from "antd/lib/button/button-group";
import dayjs from "dayjs";
import { updateEducationDetails } from "../../../../ProfileAction";
import { FormattedMessage } from "react-intl";
import { getEducations } from "../../../../../Settings/Educations/EducationAction";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateEducationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
    };
  }
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  render() {
    const { updatingEducationDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingEducation.id,
            educationTypeId: this.props.setEditingEducation.educationTypeId || "",
            courseType: this.props.setEditingEducation.courseType || "",
            courseName: this.props.setEditingEducation.courseName || "",
            specialization: this.props.setEditingEducation.specialization || "",
            university: this.props.setEditingEducation.university || "",
            marksSecured: this.props.setEditingEducation.marksSecured || "",
            yearOfPassing: this.props.setEditingEducation.yearOfPassing || "",
            marksType: this.props.setEditingEducation.marksType || "",
          }}
          onSubmit={(values, { resetForm }) => {
            debugger;
            console.log({
              ...values,
              // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
            });
            this.props.updateEducationDetails(
              {
                ...values,
                courseType: this.state.active,
                // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
              },
              this.props.employeeId,
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
              {/* <div
                  style={{
                    display: "flex",
                    // border: "0.125em solid red",
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                > */}
              <div
                style={{
                  width: "100%",
                  // border: "0.125em solid green"
                }}
              >
                <FastField
                  name="educationTypeId"
                  type="text"
                  //label="Type"
                  label={
                    <FormattedMessage
                      id="app.educationType"
                      defaultMessage="Type"
                    />
                  }
                  selectType="educationType"
                  component={SearchSelect}
                    value={values.educationTypeId}
                    isColumnWithoutNoCreate
                  inlineLabel
                  className="field"
                  isColumn
                  style={{
                    flexBasis: "80%",
                    height: "2.0625em",
                    marginTop: "0.25em",
                  }}
                />
                <Spacer />
                <div>
                  <Field
                    isRequired
                    name="courseName"
                    type="text"
                    isColumn
                    width={"100%"}
                    //label="Course Name"
                    label={
                      <FormattedMessage
                        id="app.courseName"
                        defaultMessage="Course Name"
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
                <div>
                  <StyledLabel>Course Type</StyledLabel>
                  <Spacer />
                  <ButtonGroup>
                    <StatusIcon
                      color="blue"
                      type="Full Time"
                      iconType="fa-hourglass-start"
                      tooltip="Full Time"
                      status={this.state.active}
                      onClick={() => this.glassButtoClick("Full Time")}
                    />

                    <StatusIcon
                      type="Part Time"
                      iconType="fa-hourglass-half"
                      tooltip="Part Time"
                      status={this.state.active}
                      onClick={() => this.glassButtoClick("Part Time")}
                    />

                    <StatusIcon
                      type="Distance"
                      iconType="fa-hourglass"
                      tooltip="Distance"
                      status={this.state.active}
                      onClick={() => this.glassButtoClick("Distance")}
                      //  status={item.taskStatus}
                      //  onClick={() =>
                      //    patchTask(item.taskId, { ...item, taskStatus: "Completed" })
                      //  }
                    />
                  </ButtonGroup>
                </div>
                <Spacer />
                <div>
                  <Field
                    isRequired
                    name="specialization"
                    type="text"
                    isColumn
                    width={"100%"}
                    //label="Specialization"
                    label={
                      <FormattedMessage
                        id="app.specialization"
                        defaultMessage="Specialization"
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
                <div>
                  <Field
                    isRequired
                    name="university"
                    type="text"
                    isColumn
                    width={"100%"}
                    //label="University/Institute"
                    label={
                      <FormattedMessage
                        id="app.university"
                        defaultMessage="University/Institute"
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
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <Field
                      name="yearOfPassing"
                      // label="Year of Passing"
                      label={
                        <FormattedMessage
                          id="app.yearOfPassing"
                          defaultMessage="Year of Passing"
                        />
                      }
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                      // value={values.yearOfPassing}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        width: "100%",
                        marginTop: "0.4375em",
                      }}
                    />
                  </div>
                  &nbsp; &nbsp;
                  <div style={{ width: "49%" }}>
                    <Field
                      isRequired
                      //label="Marks Secured"
                      label={
                        <FormattedMessage
                          id="app.marksSecured"
                          defaultMessage="Marks Secured"
                        />
                      }
                      name="marksSecured"
                      type="text"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.4375em",
                      }}
                    />
                  </div>
                  &nbsp;&nbsp;
                  <div style={{ width: "60%"}}>
                    <Field
                      name="marksType"
                      label={
                        <FormattedMessage
                          id="app.marksType"
                          defaultMessage="Marks Type"
                        />
                      }
                      type="text"
                      component={SelectComponent}
                      options={["%", "Out of 10", "Out of 5"]}
                      isColumn
                      width={"100%"}
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        width: "100%",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </div>

                <Spacer />
              </div>

              {/* <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
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
                    label="Name"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em", marginTop: "0.25em" }}
                  />
                  <Spacer />
                  <Field
                    name="documentDescription"
                    label="Description"
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em", marginTop: "0.25em" }}
                  />
                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div> */}
              {/* </div> */}
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingEducationDetails}
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

const mapStateToProps = ({ profile, employee,education }) => ({
  setEditingEducation: profile.setEditingEducation,
  // userId: auth.userDetails.userId,
  educations: education.educations,
  employeeId: employee.singleEmployee.employeeId,
  updatingEducationDetails: profile.updatingEducationDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateEducationDetails, getEducations}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEducationForm);

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
