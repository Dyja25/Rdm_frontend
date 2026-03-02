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
import { 
  updateMileage, 
  getMileageDetails } from "../../../Settings/SettingsAction";


function MileageForm(props) {
  const [visible, setVisible] = useState(false);

  const handleChange = (checked) => {
    debugger;
    setVisible(checked);
  };
  useEffect(() => {
    props.getMileageDetails(props.userId);
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
        mileageRate:props.mileageData.mileageRate || "" , 
          organizationId: props.organizationId,
          userId:props.userId
        }}
        onSubmit={(values) => {
          props.updateMileage(values);
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
                  name="mileageRate"
                  // label="Max leaves (in days)"
                  label={<FormattedMessage
                    id="app.mileage rate in eurkm"
                    defaultMessage="Mileage rate in EUR/km"
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
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.updatingMileage}
                  >
                    Update
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
  organizationId: auth.userDetails.organizationId,
  addingLeaves: settings.addingLeaves,
  mileageData: settings.mileageData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateMileage,
      getMileageDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MileageForm);
