import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Checkbox, Button, Popconfirm, message } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { Input } from "antd";
import * as Yup from "yup";
import {addMonster,getMonster} from "../../../../SettingsAction";
import { FormattedMessage } from "react-intl";
const { Search } = Input;

const MonsterSchema = Yup.object().shape({
    userName: Yup.string().required("Input needed!"),
    password: Yup.string().required("Input needed!"),
    // startDate:Yup.string().required("Input needed!"),
    // endDate:Yup.string().required("Input needed!"),
  });
  // const {
  //   addingMonster,
  //   addMonster

  // } = this.props;

function MonsterForm(props) {

  useEffect(() => {
    props.getMonster(props.orgId);
  }, []);
  console.log(props.monster.length && props.monster[0].password)
  return (
    <>
      <Formik
        initialValues={{
          // type: undefined,
          orgId: props.orgId,
          userName:props.monster.length && props.monster[0].userName,
          password:  props.monster.length && props.monster[0].password,
          monsterInd:"true"
        }}
        validationSchema={MonsterSchema}
        onSubmit={(values) => {
          props.addMonster(
            {
              ...values,
            },
            props.orgId

            
          )
        }}
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
            <Field
                  // label="User Name"
                  label={<FormattedMessage id="app.username" defaultMessage="User Name" />}
                  name="userName"
                  type="email"
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />

                <Field
                  // label="Password"
                   label={<FormattedMessage id="app.password" defaultMessage="Password" />}
                
                  name="password"
                  type="password"
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
                      Loading={props.addingMonster}
                      className="mr-gap"
                      style={{ width: "7%", height: "2.5em" }}
                      // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                    >
                      Update
                    </Button>
                    </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ settings, auth }) => ({
  organizationId: auth.userDetails.organizationId,
  monster:settings.monster,
  userId:auth.userId,
  addingMonster: settings.addingMonster,
  addingMonsterError: settings.addingMonsterError,
  fetchingMonster: settings.fetchingMonster,
  fetchingMonsterError: settings.fetchingMonsterError,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
     addMonster,
     getMonster
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MonsterForm);
