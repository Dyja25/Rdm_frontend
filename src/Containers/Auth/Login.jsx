import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "antd/lib/button";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ValidationError, Spacer } from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";
import { FormWrapper, Input, AuthContainer } from "../Auth/styled";
import {
  login,
  generateOtpByEmail,
  validateOtp
} from "./AuthAction";

import lib from "../../Assets/Images/libaxis.jpeg";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";


/* -------------------- Validation Schema -------------------- */
const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .email("Enter a valid email")
    .required("Input needed !"),
  password: Yup.string().required("Enter password"),
});

/* -------------------- Custom Input -------------------- */
const FormikInput = ({ field, form: { touched, errors }, ...props }) => (
  <div>
    <Input {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <ValidationError>{errors[field.name]}</ValidationError>
    )}
  </div>
);

/* -------------------- Component -------------------- */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { logging, loginError } = useSelector((state) => state.auth);

  const [initialValues, setInitialValues] = useState({
    userName: "",
    password: "",
    otp: ""
  });

  /* -------------------- On Mount -------------------- */
  useEffect(() => {
    if (params?.username && params?.password) {
      setInitialValues({
        userName: params.username,
        password: params.password,
        otp: ""
      });
    }
  }, [params]);

  /* -------------------- Submit -------------------- */
  const handleSubmit = (values) => {
    dispatch(login(values, navigate));
  };

  return (
    <FlexContainer>
      <AuthContainer

        style={{
          backgroundColor: "#F5F5F5",
          flexDirection: "column",
          position: "relative",
          margin: "auto",
        }}
      >
        <img
          className="big-logo"
          src={lib}
          style={{ width: 200 }}
          alt="Libaxix Logo"
        />
        <br />

        <FormWrapper width="55%">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form className="form-background ">
                {/* Email */}
                <Field
                  name="userName"
                  type="email"
                  placeholder="Email"
                  component={FormikInput}
                  style={{color:"black"}}
                />

                {/* Password + OTP Trigger */}
                <div style={{ display: "flex", gap: "2px", padding: "8px 0" }}>
                  <div style={{ width: "90%" }}>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      component={FormikInput}
                    />
                  </div>

                  <div style={{ width: "15%", padding: "14px 0" }}>
                    <Button
                      type="primary"
                      onClick={() =>
                        dispatch(
                          generateOtpByEmail({
                            userName: values.userName,
                          })
                        )
                      }
                    >
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>

                <Spacer />

                {/* OTP Validate */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {/* <div style={{ width: "63%", marginTop: "2px" }}>
                    <Field
                      name="otp"
                      placeholder="Enter OTP"
                      component={InputComponent}
                      style={{ height: "40px" }}
                    />
                  </div> */}

                  {/* <div style={{ width: "28%", padding: "10px 0" }}>
                    <Button
                      type="primary"
                      onClick={() =>
                        dispatch(
                          validateOtp({
                            otp: values.otp,
                            userName: values.userName,
                          })
                        )
                      }
                    >
                      Validate
                    </Button>
                  </div> */}
                </div>

                <Spacer />

                {/* Login */}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting || logging}
                  style={{ width: "100%", height: "2.5em" }}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <br/>
 &nbsp;

        <Spacer />

        <Link
          to="/forgotPassword"
          style={{ textAlign: "center", fontSize: 14 }}
        >
          Forgot password?
        </Link>
                </FormWrapper>
                <Spacer/>


        {/* Footer */}
        <div
          className="footer1"
          style={{
            textAlign: "center",
            fontSize: "12x",
            fontFamily: "SFS, Arial, sans-serif",
            position: "absolute",
            bottom: 0,
          }}
        >
          Copyright © {new Date().getFullYear()} LIBAXIS B.V. All Rights Reserved.
        </div>
      </AuthContainer>
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth }) => ({
  logging: auth.logging,
  loginError: auth.loginError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    login,
    generateOtpByEmail,
    validateOtp
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Login)
