import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../Components/UI/Elements";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addEmailCredentials } from "../EmailAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
/**
 * yup validation scheme for creating a Team
 */
const EmailSchema = Yup.object().shape({
  email: Yup.string().
    email("Enter a valid Email")
    .required("Email is needed!"),
  password: Yup.string().required("Password is needed!"),
  host: Yup.string().required("Host name is needed!"),
  port: Yup.string().required("Port is needed!")
});

class EmailForm extends Component {
  render() {
    const { addEmailCredentials, addingEmailCredential } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
            serverType: "",
            host: "",
            port: "",
            connectionSecurity: "",
            AuthType: ""
          }}
          validationSchema={EmailSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addEmailCredentials(values);
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",

                    }}
                  >
                    <Field
                      name="email"
                      //label="Email Id"
                      label={<FormattedMessage
                        id="app.email"
                        defaultMessage="Email Id"
                      />}
                      inlineLabel
                      isRequired
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                      width={"100%"}
                    />
                    <Spacer />
                    <Field
                      type="password"
                      isRequired
                      name="password"
                      //label="Password"
                      label={<FormattedMessage
                        id="app.password"
                        defaultMessage="Password"
                      />}
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                    />
                    <Spacer />
                    {/* <Field
                  name="serverType"
                  label="Server Type"
                  component={InputComponent}
                  inlineLabel
                  style={{ flexBasis: "80%" }}
                />
                <Spacer /> */}
                    <Field
                      isMulti
                      isRequired
                      name="host"
                      // label="Host Name"
                      label={<FormattedMessage
                        id="app.host"
                        defaultMessage="Host Name"
                      />}
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      style={{ flexBasis: "80%" }}
                    />
                    <span style={{ fontSize: "0.75em", fontStyle: "italic", marginLeft: "5.1875em" }}>Example for Outlook users - smtp-mail.outlook.com </span>
                    <br />
                    <span style={{ fontSize: "0.75em", fontStyle: "italic", marginLeft: "5.1875em" }}>Example for other webmail host - mail.example.com </span>
                    <Spacer />
                    <Field
                      name="port"
                      //label="Port"
                      label={<FormattedMessage
                        id="app.port"
                        defaultMessage="Port"
                      />}
                      inlineLabel
                      isRequired
                      width={"100%"}
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                    />
                    <Spacer />
                    {/* <Spacer />
                <Field
                  name="connectionSecurity"
                  label="Connection Security"
                  inlineLabel
                  component={InputComponent}
                  style={{ flexBasis: "80%" }}
                />
                <Spacer />
                <Field
                  name="AuthType"
                  label="Auth Type"
                  inlineLabel
                  component={InputComponent}
                  style={{ flexBasis: "80%" }}
                /> */}

                    {/* <Button
                    type="primary"
                    htmlType="submit"
                    Loading={addingEmailCredential}
                   
                  >
                    Create
                </Button> */}
                  </div>
                </div>
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    // style={{ float: "right" }}
                    Loading={addingEmailCredential}
                  >

                    <FormattedMessage
                      id="app.create"
                      defaultMessage="Create"
                    />
                    {/* Create */}
                  </Button>
                </FlexContainer>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ email }) => ({
  addingEmailCredential: email.addingEmailCredential,
  addingEmailCredentialError: email.addingEmailCredentialError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addEmailCredentials
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
