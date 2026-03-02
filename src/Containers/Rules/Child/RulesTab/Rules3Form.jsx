import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../Components/UI/Elements";
import { Spacer } from "../../../../Components/UI/Elements";

function Rules3Form() {
  const [visible, setVisible] = useState(false);

  const handleChange = (checked) => {
    debugger;
    setVisible(checked);
  };

  return (
    <>
      <Formik
        initialValues={{
          type: undefined,
        }}
        onSubmit={(values) => { }}
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
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "50%", marginTop: "0.625em" }}>
                    <StyledLabel>Auto Approval</StyledLabel>
                    <Switch
                      style={{ width: "5em", marginLeft: "0.625em" }}
                      onChange={handleChange}
                      checked={visible}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  {visible && (
                    <div style={{ width: "50%" }}>
                      <Field
                        name="type"
                        component={SelectComponent}
                        options={["Aging", "Days in Final stage"]}
                        inlineLabel
                        isColumn
                        style={{ flexBasis: "80%", marginTop: "0.25em" }}
                      // defaultValue='low'
                      />
                    </div>
                  )}
                </FlexContainer>
                <Spacer />
                {values.type && (
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "65%" }}>
                      <Field
                        name="unit"
                        label="Time"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          marginTop: "0.25em",
                          height: "2.0625em",
                        }}
                      />
                    </div>
                    <div style={{ width: "30%", marginTop: "1.375em" }}>
                      <FastField
                        name="unitValue"
                        isRequired
                        type="text"
                        isColumn
                        options={["Days", "Hours"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        style={{
                          flexBasis: "80%",
                          margintop: "0.25em",
                        }}
                      />
                    </div>
                    <Spacer />
                    <FlexContainer justifyContent="flex-end">
                      <Button type="primary" htmlType="submit">
                        Add Rule
                      </Button>
                    </FlexContainer>
                  </FlexContainer>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rules3Form);
