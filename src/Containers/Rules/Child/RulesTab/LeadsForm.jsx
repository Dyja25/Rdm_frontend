import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../Components/UI/Elements";
import { Spacer } from "../../../../Components/UI/Elements";
import { addLeaves, getLeavesDetails } from "../../../Settings/SettingsAction";


function LeadsForm(props) {
  const [visible, setVisible] = useState(false);

  const handleChange = (checked) => {
    debugger;
    setVisible(checked);
  };
  useEffect(() => {
    props.getLeavesDetails();
    // props.getOnlySalesUser();
  }, []);

  // const teamOption = useMemo(() => {
  //   if (!props.onlySalesUsers) return [];
  //   return (
  //     props.onlySalesUsers.length &&
  //     props.onlySalesUsers.map((user) => {
  //       return {
  //         label: `${user.firstName} - ${user.emailId}` || "",
  //         value: user.userId,
  //       };
  //     })
  //   );
  // }, [props.onlySalesUsers]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          // employeeId: props.userId,

          maximumLeaves: props.leaveData.maximumLeaves || "",
          carryForward: props.leaveData.carryForward || "",

          maximumCarryForward: props.leaveData.maximumCarryForward || "",
          // organizationId: props.organizationId,
        }}
        onSubmit={(values) => {
          props.addLeaves(values);
        }}
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Field
                  isRequired
                  name="maximumLeaves"
                  // label="Max leaves (in days)"
                  label={<FormattedMessage
                    id="app.maxleavesindays"
                    defaultMessage="Max leaves (in days)"
                  />}
                  width={"10%"}
                  component={InputComponent}
                  inlineLabel
                // style={{
                //   flexBasis: "80%",
                //   marginTop: "0.25em",
                //   height: "2.0625em",
                // }}
                />
                <Spacer />
                <Field
                  isRequired
                  name="carryForward"
                  //label="Carry Forward(%)"
                  label={<FormattedMessage
                    id="app.carryforward%"
                    defaultMessage="Carry Forward(%)"
                  />}
                  inlineLabel
                  width={"10%"}
                  component={InputComponent}
                // style={{
                //   flexBasis: "80%",
                //   marginTop: "0.25em",
                //   height: "2.0625em",
                // }}
                />
                <Spacer />
                <Field
                  isRequired
                  name="maximumCarryForward"
                  //label="Max Carry Forward(%)"
                  label={<FormattedMessage
                    id="app.maxcarryforward%"
                    defaultMessage="Max Carry Forward(%)"
                  />}
                  inlineLabel
                  width={"10%"}
                  component={InputComponent}
                // style={{
                //   flexBasis: "80%",
                //   marginTop: "0.25em",
                //   height: "2.0625em",
                // }}
                />
                <Spacer />

                {/* <FlexContainer justifyContent="space-between">
                  <div style={{ width: "50%", marginTop: "0.625em" }}>
                    <StyledLabel>Assign To</StyledLabel>
                    <Switch
                      style={{ width: "7.5em", marginLeft: "0.625em" }}
                      onChange={handleChange}
                      checked={true}
                      checkedChildren="Specific"
                      unCheckedChildren="Round Robin"
                    />
                  </div>
                </FlexContainer> */}

                <Spacer />
                {/* <Field
                  name="userId"
                  label="Sales User"
                  isRequired
                  isColumn
                  style={{
                    flexBasis: "80%",

                    marginTop: "0.25em",
                  }}
                  component={SelectComponent}
                  options={Array.isArray(teamOption) ? teamOption : []}
                /> */}
                <Spacer />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.addingLeaves}
                  >
                    {/* Submit */}
                    <FormattedMessage
                    id="app.submit"
                    defaultMessage="Submit"
                  />
                  </Button>
                </FlexContainer>

                <Spacer />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, settings, team }) => ({
  userId: auth.userDetails.userId,
  addingLeaves: settings.addingLeaves,
  leaveData: settings.leaveData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLeaves,
      getLeavesDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsForm);
