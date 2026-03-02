import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Spacer } from "../../Components/UI/Elements";
import { Input } from "./styled";
import { ValidationError, Title } from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";
import Button from "antd/lib/button";
import styled from "styled-components";
import { CheckCircleTwoTone, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
  // doSignUp,
  // getCountries,
  // verifyEmailurL,
  //validateOtpurL,
} from "./AuthAction";
// import RandomImageScreen from "./RandomImageScreen";

//import { tick } from "../../Assets/Images/Logo.png";

/**
 * yup validation scheme for set Password
 */
// const ChangePasswordSchema = Yup.object().shape({
//   password: Yup.string()
//     .required("Required")
//     .min(8, "password should be min 8 character ")
//     .max(50, "password should be max 50 character !"),
//   confirmPassword: Yup.string()
//     .required("Enter password")
//     .oneOf([Yup.ref("password")], "Passwords do not match"),
// });
class ForgotPassword extends Component {
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
    if (this.props.userType === "Admin") {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <>
      <div className="main" style={{display:"flex",justifyContent:"space-evenly"}}>
      <div className="forgot_password">
      <FlexContainer>
          <AuthContainer
            style={{
              backgroundColor: "white",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <FormWrapper>
              <Title>Forgot Password</Title>
              <div>Link will be sent to your registered email id</div>
              <Spacer />
              <Formik
                initialValues={{
                  email: "",
                  otp:"",
                  password:"",
                  confirmPassword:"",
                }}
                // validationSchema={ChangePasswordSchema}
                onSubmit={(values) => {
                  console.log(values);
                  this.props.forgetPassword(
                    {
                      email: this.props.email,
                    },
                    this.callback
                  );
                }}
              >
                {({ errors, touched, values, isSubmitting }) => (
                  <Form style={{ width: "25vw" }}>
                    <div >
                      <div style={{ width: "100%",display:"flex" }}>
                      <div style={{ width: "75%" }}>
                      <Field
                        // type="defaultUser.email"
                        placeholder="Enter your email"
                        name="defaultUser.email"
                        // label="Verify Email"
                        // className="field"
                        isColumn
                        width={"100%"}
                        component={this.InputComponent}
                        inlineLabel
                      />
                      </div>
                      <div style={{ width: "25%", }}>
                      <Button
                        type="primary"
                        // htmlType="submit"
                        //disabled={!values.defaultUser.email.length}
                        // loading={isSubmitting}
                        onClick={() => {
                        this.props.verifyEmailurL({
                        emailId: values.defaultUser.email,
                            otp: 0,
                          });
                          // this.handleOtpField()
                        }}
                        style={{
                          width: "100%",
                          margin: "7%",
                        }}
                        // disabled={!this.state.checked}
                      >
                        Send OTP
                      </Button>
                      </div>
                      </div>

                      <div style={{ width: "100%",display:"flex" }}>
                        <div style={{ width: "75%" }}>
                      <Field
                        // disabled={!this.state.otp}
                        name="defaultUser.validateotp"
                        // label="Validate OTP*"
                        placeholder="Validate OTP"
                        isColumn
                        component={this.InputComponent}
                      />
                        </div>
                      <div style={{ width: "25%" }}>
                      <Button
                        type="primary"
                        // htmlType="submit"
                        //disabled={!values.defaultUser.validateotp.length}
                        onClick={() => {
                        //   this.props.validateOtpurL({
                        //     emailId: values.defaultUser.email,
                        //     otp: values.defaultUser.validateotp,
                        //   });
                          
                        }}
                        style={{
                          width: "100%",
                          margin: "7%",
                        }}
                        
                        // disabled={!this.state.checked}
                      >
                        Validate
                      </Button>
                      </div>
                      </div>

                      <div style={{ width: "100%",display:"flex" }}>
                      
                      <div style={{ width: "100%" }}>
                        <Field
                          name="password"
                          //type={this.state.type}
                          placeholder=" New password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show ? (
                        <EyeOutlined
                          type="eye"
                          onClick={this.handleClick}
                          style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
                          size="24"
                        />
                      ) : (
                          <EyeInvisibleOutlined
                            type="eye-invisible"
                            onClick={this.handleClick}
                            size="24"
                            style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
                          />
                   )} 
                    
                      </div>

                      <div style={{ width: "100%",display:"flex" }}>
                  
                      <div style={{ width: "100%" }}>
                        <Field
                          name="confirmPassword"
                          type={this.state.type1}
                          placeholder="Confirm new password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show1 ? (
                        <EyeOutlined
                          type="eye"
                          onClick={this.handleClick1}
                          style={{
                            marginLeft: "-1.25em",
                            marginTop: "1.25em",
                          }}
                        // style={{ size: 24 }}
                        />
                      ) : (
                          <EyeInvisibleOutlined
                            type="eye-invisible"
                            onClick={this.handleClick1}
                            style={{
                              marginLeft: "-1.25em",
                              marginTop: "1.25em",
                            }}
                          // style={{ size: 24 }}
                          />
                        )}
                      {/* {values.password.length &&
                        values.password === values.confirmPassword ? (
                          <CheckCircleTwoTone
                            type="check-circle"
                            theme="twoTone"
                            twoToneColor="#52c41a"
                            size={80}
                            style={{
                              marginLeft: "1.25em",
                              marginTop: "0.875em",
                              fontSize: "1.5625em",
                            }}
                          />
                        ) : null} */}
                    
                      </div>
                      
                      </div>
                      <Spacer style={{ marginBottom: "1em" }} />
                      <div>
                        <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          {" "}
                          <Link
                            to="/login"
                            style={{ textAlign: "center", fontSize: 14 }}
                          >
                            Back to login
                          </Link>

                          
                        </span>

                        <Button
                      type="primary"
                      htmlType="submit"
                      Loading={this.props.changingPassword}
                      style={{ width: "15.875em", height: "2.5em" }}
                    // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                    >
                      Save Password
                    </Button>
                      </span>
                    </div>
                    {/* <Spacer style={{ marginBottom: "1em" }} /> */}
                    
                  </Form>
                )}
              </Formik>
              {/* <Spacer style={{ marginBottom: -40 }} />
              <Link to='/login' style={{ textAlign: 'center', fontSize: 16, marginLeft: "0.625em" }}>Back to login</Link> */}
        
            </FormWrapper>
            <div className="footer1"
                             style={{
                                textAlign: 'center',
                                 fontSize: '12x', fontFamily: 'SFS, Arial, sans-serif', position: 'absolute', bottom: 0
                             }}>
                             © {new Date().getFullYear()},  {` `} teKorero.com, All rights reserved.
                        </div>
          </AuthContainer>
          
        </FlexContainer>
        </div>
        {/* <div className="Image">
        <RandomImageScreen />
        </div> */}
      </div>
        
        
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  changingPassword: auth.changingPassword,
  changingPasswordError: auth.changingPasswordError,
  email: auth.userDetails.email,
  user: auth.userDetails,
  userType: auth.userDetails.userType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // changePassword,
     // validateOtpurL,
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);

const AuthContainer = styled.div`
  // width: 50%;
  width:${(props) => props.width || "50%"}
  min-height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  @media only screen and (max-width: 37.5em) { 
   width:100%
  }
`;
const FormWrapper = styled.div`    
padding: 1rem;
width: ${(props) => props.width}
     border-radius: 0.3rem;
    box-shadow: 0em 0.25em 0.625em -0.125em #444;
    border: 0.0625em solid #ddd;
    background: #fff;
    @media only screen and (max-width: 37.5em) {
       width:89%
         }
 @media only screen 
and (min-device-width : 48em) 
and (max-device-width : 64em)
and (-webkit-min-device-pixel-ratio: 2){
}`;
