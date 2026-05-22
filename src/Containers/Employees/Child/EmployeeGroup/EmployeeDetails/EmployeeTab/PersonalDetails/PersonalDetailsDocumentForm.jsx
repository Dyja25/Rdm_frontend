import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";

import { addDocumentDetails } from "../../../../../../Profile/ProfileAction";

function onChange(date) {}

// const documentSchema = Yup.object().shape({
//     documentId: Yup.string().required("Input needed !"),
// });
class PersonalDetailsDocumentForm extends Component {
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
    const { addingPersonalDocumentDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,

            idNo: "",
            idType: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addDocumentDetails(
              { ...values },
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
                  <FastField
                    name="idType"
                    type="text"
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="Type" />
                    }
                    options={[
                      "Aadhar Card",
                      "Voter-Id Card",
                      "Driving-License",
                      "Pan Card",
                      "Passport",
                    ]}
                    component={SelectComponent}
                    inlineLabel
                    className="w-full"
                    isColumn
                    style={{
          width: "60%",
          height: "38px",
          border: "1px solid #d9d9d9",
          outline: "none",
          boxShadow: "none",
        }}
                     />
                  <Spacer />
                  <div>
                    <Field
                      isRequired
                      name="idNo"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Document ID number"
                      label={
                        <FormattedMessage
                          id="app.documentidnumber"
                          defaultMessage="Document ID number"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                       />
                  </div>
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
                    style={{ height: "5em"}}
                  />
                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingPersonalDocumentDetails}
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

const mapStateToProps = ({ employee, profile }) => ({
  employeeId: employee.singleEmployee.employeeId,
  addingPersonalDocumentDetails: profile.addingPersonalDocumentDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addDocumentDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetailsDocumentForm);

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
