import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { Button, Switch, Tooltip } from "antd";
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
import { FormattedMessage } from "react-intl";
import { addEducationDetails } from "../../../../ProfileAction";
import { getEducations } from "../../../../../Settings/Educations/EducationAction";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class EducationDocumentForm extends Component {
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
    const { addingEducationDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            documentTypeId: this.props.documentTypeId,
            // educationType: "",
            educationTypeId: this.props.educationTypeId,
            courseType: this.state.active,
            courseName: "",
            specialization: "",
            university: "",
            marksSecured: "",
            yearOfPassing: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addEducationDetails(
              {
                ...values,
                courseType: this.state.active,

                // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
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
                  <FastField
                    name="educationTypeId"
                    // type="text"
                    //label="Education"
                    label={
                      <FormattedMessage
                        id="app.education"
                        defaultMessage="Education"
                      />
                    }
                    // options={[
                    //   "Matriculation",
                    //   "Intermediate",
                    //   "Graduation",
                    //   "Post-Graduation",
                    //   "Others",
                    // ]}
                    // component={SelectComponent}
                    // inlineLabel
                    className="field"
                    isColumn
                    style={{
                      flexBasis: "80%",
                      height: "2.0625em",
                      marginTop: "0.25em",
                    }}
                    selectType="educationType"
                    // options={[
                    //   "Board",
                    //   "CXO",
                    //   "Director",
                    //   "Unit Head",
                    //   "Mid Level",
                    //   "Junior",
                    // ]}
                    // component={SelectComponent}
                    component={SearchSelect}
                    value={values.educationTypeId}
                    isColumnWithoutNoCreate
                    inlineLabel
                    
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
                          id="app.Specialization"
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
                      //label="University/Institute "
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
                        //label="Year of Passing"
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
                    <div style={{ width: "60%" }}>
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
                          marginTop: "6px",
                        }}
                      />
                    </div>
                  </div>

                  <Spacer />
                </div>

                <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
                  }}
                >
                  <Field
                    name="documentId"
                    label={
                      <FormattedMessage
                        id="app.documentId"
                        defaultMessage="Document Id"
                      />
                    }
                    isRequired
                    component={DragableUpload}
                  />
                  <Spacer />

                  <Field
                    name="documentTitle"
                    //label="Name of Document"
                    label={
                      <FormattedMessage
                        id="app.documentTitle"
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
                    //label="Description of document"
                    label={
                      <FormattedMessage
                        id="app.documentDescription"
                        defaultMessage="Description of document"
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
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEducationDetails}
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
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ employee, profile, education }) => ({
  // employeeId: employee.singleEmployee.employeeId,
  educations: education.educations,
  addingEducationDetails: profile.addingEducationDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addEducationDetails, getEducations }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationDocumentForm);

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
