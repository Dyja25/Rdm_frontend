import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import { Spacer } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import {
  addProcessForRecruiter,
  getProcessForRecruit,
} from "../SettingsAction";
import { FlexContainer } from "../../../Components/UI/Layout";

class ProcessForm extends Component {
  handleCallback = (status) => {
    if (status === "success") {
      return getProcessForRecruit(this.props.organizationId);
    } else {
      return null;
    }
  };
  render() {
    const { addingProcessForRecruit, addProcessForRecruiter } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            recruitmentProcessName: "",
            organizationId:this.props.organizationId
          }}
          onSubmit={(values) => {
            addProcessForRecruiter(
              values,
              this.props.organizationId,
              () => this.handleCallback
            );
          }}
        >
          {({ values }) => (
            <Form className="form-background">
              <div style={{ width: "auto", margin: "auto" }}>
                <Field
                  name="recruitmentProcessName"
                  label="Name"
                  // label={<FormattedMessage
                  //   id="app.recruitmentProcessName"
                  //   defaultMessage="Enter Workflow name"
                  // />}
                  component={InputComponent}
                  isColumn
                  width={"100%"}
                  placeholder={"Enter Workflow name "}
                  style={{ flexBasis: "80%", marginTop: "0.25em" }}
                />
                <Spacer />

                <Spacer style={{ marginTop: 15 }} />
                <FlexContainer justifyContent="flex-end">
                  {" "}
                  <Button
                    type="primary"
                    disabled={!values.recruitmentProcessName}
                    htmlType="submit"
                    Loading={addingProcessForRecruit}
                  >
                    Create
                  </Button>
                </FlexContainer>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  addingProcessForRecruit: settings.addingProcessForRecruit,
  addingProcessForRecruitError: settings.addingProcessForRecruitError,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProcessForRecruiter,
      getProcessForRecruit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProcessForm);
