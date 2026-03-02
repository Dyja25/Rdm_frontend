import React from "react";
import { Formik, Form, Field, FastField } from "formik";
import { Button, Icon, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { StyledLabel, Spacer } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { addSequenceLeads } from "../../../RulesAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { addSequence } from "../../../../Settings/SettingsAction";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
class SequenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priority: "High",
      selectedType: "LinkedIn post",
    };
  }
  handleButtonClick = (type) => {
    this.setState({
      priority: type,
    });
  };
  handleTypeChange = (type) => {
    this.setState({
      selectedType: type,
    });
  };
  handleReset = (resetForm) => {
    // const {callback}=this.props;
    // callback && callback();
    resetForm();
  };
  render() {
    const { isEditing, prefillTask, addSequence, addingSequence } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            name: "",
            pageName: "Contact Us",
            taskDays: "",
            taskType: this.state.selectedType,
            priority: this.state.priority,
            type: "Task",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addSequence(
              {
                ...values,
                taskType: this.state.selectedType,
                priority: this.state.priority,
              },
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
            <Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2%",
                  marginBottom: "3%",
                }}
              >
                <div style={{ width: "33%", marginRight: "2%" }}>
                  <Field
                    isRequired
                    name="name"
                    label="Name"
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                    style={{
                      flexBasis: "60%",
                      height: "33px",
                      marginTop: "4px",
                    }}
                  />
                </div>

                <FlexContainer
                  justifyContent="spcae-between"
                  style={{ width: "100%" }}
                >
                  <div style={{ width: "25%" }}>
                    <FlexContainer
                      justifyContent="spcae-between"
                      style={{ width: "100%" }}
                    >
                      <div style={{ width: "100%" }}>
                        <StyledLabel>
                          {/* Priority */}

                          <FormattedMessage
                            id="app.priority"
                            defaultMessage="Priority"
                          />
                        </StyledLabel>

                        <FlexContainer>
                          <Tooltip
                            //title="High"
                            title={
                              <FormattedMessage
                                id="app.high"
                                defaultMessage="High"
                              />
                            }
                          >
                            <Button
                              //type="primary"
                              shape="circle"
                              onClick={() => this.handleButtonClick("High")}
                              style={{
                                borderRadius: "50%",
                                height: "2.1875em",
                                width: "2.1875em",
                                backgroundColor:
                                  this.state.priority === "High"
                                    ? "red"
                                    : "white",
                              }}
                            />
                          </Tooltip>
                          &nbsp;
                          <Tooltip
                            //title="Medium"
                            title={
                              <FormattedMessage
                                id="app.medium"
                                defaultMessage="Medium"
                              />
                            }
                          >
                            <Button
                              // type="primary"
                              shape="circle"
                              onClick={() => this.handleButtonClick("Medium")}
                              style={{
                                borderRadius: "50%",
                                height: "2.1875em",
                                width: "2.1875em",
                                backgroundColor:
                                  this.state.priority === "Medium"
                                    ? "Orange"
                                    : "white",
                              }}
                            />
                          </Tooltip>
                          &nbsp;
                          <Tooltip //title="Low"
                            title={
                              <FormattedMessage
                                id="app.low"
                                defaultMessage="Low"
                              />
                            }
                          >
                            <Button
                              //type="primary"
                              shape="circle"
                              onClick={() => this.handleButtonClick("Low")}
                              style={{
                                borderRadius: "50%",
                                height: "2.1875em",
                                width: "2.1875em",
                                backgroundColor:
                                  this.state.priority === "Low"
                                    ? "teal"
                                    : "white",
                              }}
                            ></Button>
                          </Tooltip>
                        </FlexContainer>
                      </div>
                    </FlexContainer>
                  </div>
                  <div style={{ width: "42%", marginLeft: "1%" }}>
                    <FlexContainer
                      justifyContent="space-between"
                      style={{ width: "100%" }}
                    >
                      <div
                       style={{ width: "65%" }}
                       >
                        <StyledLabel>Type</StyledLabel>

                        <FlexContainer
                          justifyContent="space-between"
                          style={{ width: "100%", marginTop: "3px" }}
                        >
                          <Tooltip title="Mail">
                            <div
                              onClick={() => this.handleTypeChange("Mail")}
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                                color:
                                  this.state.selectedType === "Mail"
                                    ? "Orange"
                                    : null,
                              }}
                            >
                              <Icon type="mail"></Icon>
                            </div>
                          </Tooltip>

                          <Tooltip title="Call">
                            <div
                              onClick={() => this.handleTypeChange("Call")}
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                                color:
                                  this.state.selectedType === "Call"
                                    ? "Orange"
                                    : null,
                              }}
                            >
                              <FontAwesomeIcon icon={solid('phone')} />
                            </div>
                          </Tooltip>

                          <Tooltip title="Whatsapp">
                            
                             <span
                              onClick={() => this.handleTypeChange("Whatsapp")}
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                                color:
                                  this.state.selectedType === "Whatsapp"
                                    ? "Orange"
                                    : null,
                              }}
                            >
                              {/* <FontAwesomeIcon icon={brands('whatsapp')} /> */}
                              <FontAwesomeIcon icon={brands("whatsapp")} />
                              </span>
                            
                            
                          </Tooltip>
                        </FlexContainer>
                      </div>
                    </FlexContainer>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div style={{ width: "20%" }}>
                    <Field
                      isRequired
                      name="taskDays"
                      label="No of Days"
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                      inlineLabel
                      style={{
                        flexBasis: "60%",
                        height: "33px",
                        marginTop: "4px",
                      }}
                    />
                  </div>
                </FlexContainer>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingSequence}
                >
                  Submit
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ rule, settings, auth }) => ({
  addingSequence: settings.addingSequence,
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //  addSequenceLeads,
      addSequence,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SequenceForm);
