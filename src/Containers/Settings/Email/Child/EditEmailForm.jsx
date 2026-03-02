import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../Components/UI/Elements";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { updateEmailCredentials } from "../EmailAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

/**
 * yup validation scheme for creating a Team
 */
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid Email")
    .required("Email is needed!"),
  password: Yup.string().required("Password is needed!"),
  host: Yup.string().required("Host name is needed!"),
  port: Yup.string().required("Port is needed!"),
});

class EditEmailForm extends Component {
  state = {
    type: "password",

    show1: Boolean(),
  };
  handleCallback = () => {
    this.props.handleEmailModalVisible();
  };

  render() {
    const {
      updatingEmailCredential,
      updateEmailCredentials,
      setEditingEmail,
    } = this.props;
    console.log(setEditingEmail);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            email: setEditingEmail.email,
            password: "",
            serverType: "",
            host: setEditingEmail.host,
            port: setEditingEmail.port,
            connectionSecurity: "",
            emailCredentialId: setEditingEmail.emailCredentialId,
            AuthType: "",
          }}
          validationSchema={EmailSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateEmailCredentials(values, this.handleCallback());
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
                      width={"100%"}
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
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
                    {/* <Spacer /> */}
                    {/* <Field
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
                    <Spacer />
                  </div>
                </div>
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingEmailCredential}
                  >
                    <FormattedMessage
                      id="app.update"
                      defaultMessage="Update"
                    />

                    {/* Update */}
                  </Button>
                </FlexContainer>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ email, voip }) => ({
  updatingEmailCredential: email.updatingEmailCredential,
  updatingEmailCredentialError: email.updatingEmailCredentialError,
  setEditingEmail: voip.setEditingEmail,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateEmailCredentials,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditEmailForm);
