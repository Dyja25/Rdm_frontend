import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Checkbox, Button, Popconfirm, message } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { Spacer } from "../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { Input } from "antd";
const { Search } = Input;

function IndeedForm(props) {
  return (
    <>
      <Formik
        initialValues={{
          type: undefined,
        }}
        onSubmit={(values) => {}}
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                    <Search style={{width:"50%"}}
                    
          placeholder="Search ..."
        //   onSearch={(value) => {
        //     props.inputCandidateDataSearch(value);
        //     props.setCurrentData(value);
        //   }}
        //   defaultValue={props.currentData}
          allowClear={false}
          enterButton
        />
                <Field
                  label="User Name"
                  name="userName"
                  type="email"
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />

                <Field
                  label="Verify Email"
                  name="verifyemail"
                  type="email"
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />
              </div>
            
            </div>
            <FlexContainer justifyContent="flex-end">
            <Button 
                      type="primary"
                      htmlType="submit"
                    //   Loading={isSubmitting}
                      className="mr-gap"
                      style={{ width: "7%", height: "2.5em" }}
                      // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                    >
                      Sign In
                    </Button>
                    </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ rule, auth }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IndeedForm);
