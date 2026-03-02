import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Icon, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../Components/UI/Elements";
import { Spacer } from "../../../../Components/UI/Elements";
import { getProcess } from "../../../Settings/SettingsAction";
import { addSla, getSla } from "../../RulesAction";
import { StyledTabs } from "../../../../Components/UI/Antd";
// import { getRiskManagementUser } from "../../../Team/TeamAction";
const TabPane = StyledTabs.TabPane;

function SlaForm(props) {
  const [highVisible, setHighVisible] = useState(false);
  const [mediumVisible, setMediumVisible] = useState(false);
  const [lowVisible, setLowVisible] = useState(false);

  function handleChangeHigh(checked) {
    debugger;
    setHighVisible(checked);
  }
  function handleChangMedium(checked) {
    debugger;
    setMediumVisible(checked);
  }

  function handleChangLow(checked) {
    debugger;
    setLowVisible(checked);
  }
  useEffect(() => {
    props.getProcess();
  }, []);
  useEffect(() => {
    props.getSla(props.processId);
  }, [props.processId]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          processId: props.sla.processId || "",
          escalationRuleId: props.sla.escalationRuleId || "",
          highPriorityMapper: {
            startUnit:
              (props.sla &&
                props.sla.highPriorityMapper &&
                props.sla.highPriorityMapper.startUnit) ||
              "",
            startUnitValues:
              (props.sla &&
                props.sla.highPriorityMapper &&
                props.sla.highPriorityMapper.startUnitValues) ||
              undefined,
            endUnit:
              (props.sla &&
                props.sla.highPriorityMapper &&
                props.sla.highPriorityMapper.endUnit) ||
              "",
            endUnitValues:
              (props.sla &&
                props.sla.highPriorityMapper &&
                props.sla.highPriorityMapper.endUnitValues) ||
              undefined,
          },
          mediumPriorityMapper: {
            startUnit:
              (props.sla &&
                props.sla.mediumPriorityMapper &&
                props.sla.mediumPriorityMapper.startUnit) ||
              "",
            startUnitValues:
              (props.sla &&
                props.sla.mediumPriorityMapper &&
                props.sla.mediumPriorityMapper.startUnitValues) ||
              undefined,
            endUnit:
              (props.sla &&
                props.sla.mediumPriorityMapper &&
                props.sla.mediumPriorityMapper.endUnit) ||
              "",
            endUnitValues:
              (props.sla &&
                props.sla.mediumPriorityMapper &&
                props.sla.mediumPriorityMapper.endUnitValues) ||
              undefined,
          },
          lowPriorityMapper: {
            startUnit:
              (props.sla &&
                props.sla.lowPriorityMapper &&
                props.sla.lowPriorityMapper.startUnit) ||
              "",
            startUnitValues:
              (props.sla &&
                props.sla.lowPriorityMapper &&
                props.sla.lowPriorityMapper.startUnitValues) ||
              undefined,
            endUnit:
              (props.sla &&
                props.sla.lowPriorityMapper &&
                props.sla.lowPriorityMapper.endUnit) ||
              "",
            endUnitValues:
              (props.sla &&
                props.sla.lowPriorityMapper &&
                props.sla.lowPriorityMapper.endUnitValues) ||
              undefined,
          },
        }}
        onSubmit={(values) => {
          props.addSla(values);
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
                {props.processId && props.sla && (
                  <div>
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "0%" }}>
                        <StyledLabel style={{ marginLeft: "1.5625em" }}>
                          Priority
                        </StyledLabel>
                      </div>
                      <div
                        style={{
                          marginTop: "1.875em",
                          width: "17%",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            borderRadius: "50%",
                            height: "2.1875em",
                            width: "2.1875em",
                            backgroundColor: "red",
                          }}
                        ></div>
                        &nbsp;&nbsp;
                        <StyledLabel style={{ marginTop: "0.375em" }}>
                          High
                        </StyledLabel>
                      </div>

                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "30%" }}
                      >
                        <div style={{ width: "55%" }}>
                          <StyledLabel style={{ marginLeft: "1.5625em" }}>
                            To Start
                          </StyledLabel>
                          <Field
                            name="highPriorityMapper.startUnit"
                            // label="To Start"

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
                        <div style={{ width: "43%", marginTop: "1.5625em" }}>
                          <FastField
                            name="highPriorityMapper.startUnitValues"
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
                      </FlexContainer>
                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "48%" }}
                      >
                        <Switch
                          style={{
                            width: "4.0625em",
                            marginLeft: "5em",
                            marginTop: "1.875em",
                          }}
                          onChange={handleChangeHigh}
                          checked={highVisible}
                          checkedChildren="Before"
                          unCheckedChildren="After"
                        />
                        &nbsp;&nbsp;
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "55%" }}>
                            <Field
                              name="highPriorityMapper.endUnit"
                              // label="To Start"
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
                          <div style={{ width: "43%", marginTop: "1.5625em" }}>
                            <FastField
                              name="highPriorityMapper.endUnitValues"
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
                        </FlexContainer>
                      </FlexContainer>
                    </FlexContainer>

                    <FlexContainer justifyContent="space-between">
                      <div
                        style={{
                          marginTop: "1.875em",
                          width: "17%",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            borderRadius: "50%",
                            height: "2.1875em",
                            width: "2.1875em",
                            backgroundColor: "orange",
                          }}
                        ></div>
                        &nbsp;&nbsp;
                        <StyledLabel style={{ marginTop: "0.375em" }}>
                          Medium
                        </StyledLabel>
                      </div>

                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "30%" }}
                      >
                        <div style={{ width: "55%" }}>
                          <Field
                            name="mediumPriorityMapper.startUnit"
                            // label="To Start"
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
                        <div style={{ width: "43%", marginTop: "1.5625em" }}>
                          <FastField
                            name="mediumPriorityMapper.startUnitValues"
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
                      </FlexContainer>

                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "48%" }}
                      >
                        <Switch
                          style={{
                            width: "4.0625em",
                            marginLeft: "5em",
                            marginTop: "1.875em",
                          }}
                          onChange={handleChangMedium}
                          checked={mediumVisible}
                          checkedChildren="Before"
                          unCheckedChildren="After"
                        />
                        &nbsp;&nbsp;
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "55%" }}>
                            <Field
                              name="mediumPriorityMapper.endUnit"
                              // label="To Start"
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
                          <div style={{ width: "43%", marginTop: "1.5625em" }}>
                            <FastField
                              name="mediumPriorityMapper.endUnitValues"
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
                        </FlexContainer>
                      </FlexContainer>
                    </FlexContainer>

                    <FlexContainer justifyContent="space-between">
                      <div
                        style={{
                          marginTop: "1.875em",
                          width: "17%",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            borderRadius: "50%",
                            height: "2.1875em",
                            width: "2.1875em",
                            backgroundColor: "teal",
                          }}
                        ></div>
                        &nbsp;&nbsp;
                        <StyledLabel style={{ marginTop: "0.375em" }}>
                          Low
                        </StyledLabel>
                      </div>
                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "30%" }}
                      >
                        <div style={{ width: "55%" }}>
                          <Field
                            name="lowPriorityMapper.startUnit"
                            // label="To Start"
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
                        <div style={{ width: "43%", marginTop: "1.5625em" }}>
                          <FastField
                            name="lowPriorityMapper.startUnitValues"
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
                      </FlexContainer>
                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "48%" }}
                      >
                        <Switch
                          style={{
                            width: "4.0625em",
                            marginLeft: "5em",
                            marginTop: "1.875em",
                          }}
                          onChange={handleChangLow}
                          checked={lowVisible}
                          checkedChildren="Before"
                          unCheckedChildren="After"
                        />
                        &nbsp;&nbsp;
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "55%" }}>
                            <Field
                              name="lowPriorityMapper.endUnit"
                              // label="To Start"
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
                          <div style={{ width: "43%", marginTop: "1.5625em" }}>
                            <FastField
                              name="lowPriorityMapper.endUnitValues"
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
                        </FlexContainer>
                      </FlexContainer>
                    </FlexContainer>
                    <Spacer />
                    <FlexContainer justifyContent="flex-end">
                      <Button type="primary" htmlType="submit">
                        Update
                      </Button>
                    </FlexContainer>
                  </div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, rule }) => ({
  Process: settings.Process,
  sla: rule.sla,
  highPriorityMapper: rule.sla && rule.sla.highPriorityMapper,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getProcess, addSla, getSla }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SlaForm);
