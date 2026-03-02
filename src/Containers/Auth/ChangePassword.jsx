import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  ArrowRightOutlined,
} from "@ant-design/icons";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Spacer } from "../../Components/UI/Elements";
import { AuthContainer, FormContainer, FormWrapper, Input } from "./styled";
import { ValidationError, Title, SubTitle } from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";
import Button from "antd/lib/button";
import { changePassword, generateOtpByEmail, validateOtp } from "./AuthAction";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";

/**
 * yup validation scheme for set Password
 */
const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "password should be min 8 character ")
    .max(50, "password should be max 50 character !"),
  confirmPassword: Yup.string()
    .required("Enter password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
class ChangePassword extends Component {
  state = {
    type: "password",
    type1: "password",
    show1: Boolean(),
    show2: Boolean(),
    show: Boolean(),
  };
  handleClick = () =>
    this.setState(({ type, prevState }) => ({
      type: type === "text" ? "password" : "text",
      show: !this.state.show,
    }));
  handleClick1 = () =>
    this.setState(({ type1, prevState }) => ({
      type1: type1 === "text" ? "password" : "text",
      show1: !this.state.show1,
    }));
  InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <Input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <ValidationError>{errors[field.name]}</ValidationError>
      )}
    </div>
  );
  componentDidMount() {
    console.log("inside cDM login");
  }
  callback = () => {
    message.success("You have successfully changed your password");
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <FlexContainer>
          <AuthContainer
            style={{
              backgroundColor: "#E3E8EE",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <FormWrapper>
              <Title>Change Password</Title>
              <SubTitle>Its a good idea to use a strong password.</SubTitle>
              <Spacer />
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",

                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values) => {
                  console.log(values);
                  this.props.changePassword(
                    {
                      password: values.password,
                      emailId: this.props.emailId,
                    },
                    this.callback
                  );
                }}
              >
                {({ errors, touched, values, isSubmitting }) => (
                  <Form style={{ width: "25vw" }}>
                    <div className="set_password">
                      <div style={{ width: "89%" }}>
                        <Field
                          name="password"
                          type={this.state.type}
                          placeholder=" New password"
                          component={this.InputComponent}
                          style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}
                        />
                      </div>
                      {this.state.show ? (
                        <VisibilityIcon
                          type="eye"
                          onClick={this.handleClick}
                          style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
                          size="24"
                        />
                      ) : (
                        <VisibilityOffIcon
                          type="eye-invisible"
                          onClick={this.handleClick}
                          size="24"
                          style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
                        />
                      )}
                    </div>
                    <Spacer style={{ marginBottom: "-0.375em" }} />
                    <div className="set_password">
                      <div style={{ width: "89%" }}>
                        <Field
                          name="confirmPassword"
                          type={this.state.type1}
                          placeholder="Confirm new password"
                          component={this.InputComponent}
                          style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}

                        />
                      </div>
                      {this.state.show1 ? (
                        <VisibilityOffIcon
                          type="eye"
                          onClick={this.handleClick1}
                          style={{
                            marginLeft: "-1.25em",
                            marginTop: "1.25em",
                          }}
                        // style={{ size: 24 }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          type="eye-invisible"
                          onClick={this.handleClick1}
                          style={{
                            marginLeft: "-1.25em",
                            marginTop: "1.25em",
                          }}
                        // style={{ size: 24 }}
                        />
                      )}
                      {values.password.length &&
                        values.password === values.confirmPassword ? (
                        <CheckCircleOutlineIcon
                          type="check-circle"
                         // theme="twoTone"
                          twoToneColor="#52c41a"
                          size={80}
                          style={{
                            marginLeft: "1.25em",
                            marginTop: "0.875em",
                            fontSize: "1.5625em",
                          }}
                        />
                      ) : null}
                    </div>
                    <Spacer />
                    <div>
                      <Button
                        type="primary"
                        onClick={() => {
                          this.props.generateOtpByEmail({
                            emailId: this.props.emailId
                          })
                          // this.handleOtpField()
                        }}
                        style={{ marginLeft: "40%" }}

                      >
                        <ArrowRightOutlined />
                      </Button>
                    </div>
                    <Spacer />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ width: "74%", padding: "2px", marginTop: "8px" }}>
                        <Field
                          name="otp"
                          placeholder="Enter OTP"
                          // value={values.password}
                          component={InputComponent}
                          style={{ border: "1px solid lightgrey", height: "40px", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}

                        />
                      </div>
                      <div style={{ width: "20%", padding: "16px 0" }}>

                        <Button
                          type="primary"
                          onClick={() => {
                            this.props.validateOtp({
                              otp: values.otp,
                              emailId: this.props.emailId
                            })
                          }}
                        >
                          Validate
                        </Button>
                      </div>
                    </div>


                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={this.props.changingPassword}
                      style={{ width: "21.875em", height: "2.5em" }}
                    // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                    >
                      {/* Save Password */}
                      <FormattedMessage
                        id="app.savepassword"
                        defaultMessage="Save Password"
                      />
                    </Button>
                  </Form>
                )}
              </Formik>
              <br />
              {/* <Link to='/register' style={{ textAlign: 'center' }}>Doesn't have an account? Register</Link> */}
            </FormWrapper>
          </AuthContainer>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  changingPassword: auth.changingPassword,
  changingPasswordError: auth.changingPasswordError,
  emailId: auth.userDetails.emailId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword,
      generateOtpByEmail,
      validateOtp
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
