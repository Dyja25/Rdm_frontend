import React, { useState, useEffect, useMemo, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import {
//     getFunctions,

//   } from "../../../Function/FunctionAction";
import * as Yup from "yup";
import { Button, Switch, Tooltip, Popconfirm, Popover } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { Spacer } from "../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {
  addApproval,
  // linkExceptionTypePayment,
  getApprovalData,
} from "../../../SettingsAction";
import { functions } from "lodash";
import StandardApprovalForm from "./StandardApprovalForm";
// import { getFunctionNameByUserId, getDesignationByUserId } from "../../../Users/UsersAction";

class ApprovalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approve: false,
      type: true,
    };
  }
  handleApproveToggle = (checked) => {
    console.log(checked);
    this.setState({
      approve: checked,
    });
  };

  handleApproveType = (checked) => {
    console.log(checked);
    this.setState({
      type: checked,
    });
  };

   componentDidMount=() => {
  //  this.props.getFunctions();

      // this.props.getFunctionNameByUserId();
  //     this.props.getDesignationByUserId();
       this.props.getApprovalData(this.props.stageId);
   }

  render() {
    // const functionNameOption = this.props.functionTypeId.map((item) => {
    //     return {
    //         label: `${item.functionType || ""}`,
    //         value: item.functionTypeId,
    //     };
    // });

    // const getDesignationOption = (filterOptionKey, filterOptionValue) => {
    // const designationOptions =
    //     this.props.designationById.length &&
    //     this.props.designationById
    //         .filter((option) => {
    //             if (
    //                 option.functionId === filterOptionValue &&
    //                 option.probability !== 0
    //             ) {
    //                 return option;
    //             }
    //         })
    //         .map((option) => ({
    //             label: option.designationName || "",
    //             value: option.designationId,
    //         }));

    // return designationOptions;
    // }
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            reportingTo: "",
            threshold: "",
            functionTypeId: "",
            designationTypeId: "",
            jobLevel: "",
            recruitmentProcessId: this.props.recruitmentProcessId,
            stageId: this.props.stageId,
            approvalType: "Standard" ? true : false,
            //  approvalIndicator:  true : false,
          }}
          onSubmit={(values) => {
            console.log(values);
            // if (this.state.approveType) {
            this.props.addApproval({
              ...values,
              approvalType: values.approvalType ? "Standard" : "Exception",
              approvalIndicator: values.approvalIndicator ? true : false,
              recruitmentProcessId: this.props.recruitmentProcessId,
              stageId: this.props.stageId,
            });
            // } else {
            //     this.props.linkExceptionTypePayment(
            //         {
            //             ...values,
            //         }
            //     )
            // }
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
            <Form className="form-background">
              <div
                style={{
                  height: "28vh",
                  width: "100%",
                }}
              >
                <div>
                  <FlexContainer justifyContent="space-between">
                    <div
                      style={{
                        // marginTop: "35px",
                        width: "12%",
                        display: "flex",
                      }}
                    >
                      <StyledLabel>Needed</StyledLabel>
                    
                    </div>

                    <FlexContainer
                      justifyContent="space-between"
                      style={{ width: "30%" }}
                    >
                      <div style={{ width: "30%" }}>
                        <Field
                          name="approvalIndicator"
                          component={SwitchComponent}
                          data={values.approvalIndicator}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"5em"}
                        />
                        {/* <Switch
                                        style={{ width: "80px", marginLeft: "10px" }}
                                        onChange={this.handleApproveToggle}
                                        checked={this.state.approve}
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                    /> */}
                      </div>
                    </FlexContainer>
                  </FlexContainer>
                </div>
                {values.approvalIndicator ? (
                  <div>
                    <Spacer style={{ marginTop: "1%" }} />

                    <div>
                      <FlexContainer justifyContent="space-between">
                        <div
                          style={{
                            // marginTop: "35px",
                            width: "12%",
                            display: "flex",
                          }}
                        >
                          <StyledLabel>Type</StyledLabel>
                        </div>

                        <FlexContainer
                          justifyContent="space-between"
                          style={{ width: "30%" }}
                        >
                          <div style={{ width: "30%" }}>
                            <Field
                              name="approvalType"
                              component={SwitchComponent}
                              data={values.approvalType}
                              checkedChildren={"Standard"}
                              unCheckedChildren={"Exception"}
                              width={"6em"}
                            />
                            {/* <Switch
                                                style={{ width: "80px", marginLeft: "10px" }}
                                                onChange={this.handleApproveType}
                                                checked={this.state.type}
                                                checkedChildren="Standard"
                                                unCheckedChildren="Exception"
                                            /> */}
                          </div>
                        </FlexContainer>
                      </FlexContainer>
                    </div>
                    <Spacer />
                   
                    <div style={{ marginTop: "2%" }}>
                      {values.approvalType ? (
                        <div>
                          <StandardApprovalForm/>
                          {/* <FlexContainer justifyContent="space-between">
                            <div style={{ width: "47%" }}>
                              <Field
                                name="reportingTo"
                                label="Level 1"
                                isRequired
                                isColumn
                                component={SelectComponent}
                                options={[
                                  "Reporting Manager",
                                  "Reporting Manager +1",
                                  "Management",
                                  " Sales Owner" ,
                                  "Opportunity Creator",
                                ]}
                               
                              />
                            </div>
                            <div style={{width: "47%"}}>
                              <Field
                                name="threshold"
                                label="Threshold"
                                isColumn
                                component={InputComponent}                                
                              />
                            </div>
                          </FlexContainer>
                          <FlexContainer justifyContent="space-between">
                            <div style={{width: "47%" }}>
                            <Field
                                name="reportingTo2"
                                label="Level 2"
                                isRequired
                                isColumn
                                component={SelectComponent}
                                options={[
                                  "Reporting Manager",
                                  "Management",
                                  "Admin",
                                 " Sales Owner" ,
                                  "Opportunity Creator"
                                ]}
                               
                              />
                      
                            </div>
                            <div style={{ width: "47%" }}>
                              <Field
                                name="threshold2"
                                label="Threshold"
                                isColumn
                                component={InputComponent}
                               
                              />
                            </div>
                          </FlexContainer> */}
    
                        </div>
                      ) : (
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "32%" }}>
                            <Field
                              name="functionTypeId"
                              isColumnWithoutNoCreate
                              selectType="functionType"
                              label="Function"
                              isColumn
                              component={SearchSelect}
                              // options={Array.isArray(functionNameOption) ? functionNameOption : []}
                              //  component={SelectComponent}
                              // value={values.functionTypeId}
                              placeholder
                           
                              inlineLabel
                              width={"100%"}
                            />
                          </div>

                          <div style={{ width: "32%" }}>
                            <Field
                              name="designationTypeId"
                              label="Designation"
                              isColumnWithoutNoCreate
                              selectType="designationType"
                              // options={
                              //     Array.isArray(
                              //         getDesignationOption("functionId", values.functionId)
                              //     )
                              //         ? getDesignationOption("functionId", values.functionId)
                              //         : []
                              // }
                              component={SearchSelect}
                              value={values.designationTypeId}
                              // placeholder
                              isColumn
                              inlineLabel
                              width={"100%"}
                            />
                          </div>
                          <div style={{ width: "32%" }}>
                            <Field
                              name="jobLevel"
                              label="Job Level"
                              options={[
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                                "12",
                                "13",
                                "14",
                              ]}
                              component={SelectComponent}
                              // placeholder
                              isColumn
                              inlineLabel
                              width={"100%"}
                            />
                          </div>
                        </FlexContainer>
                      )}
                    </div>

                    
                    <Spacer style={{marginTop:"1.25em"}} />
                    <FlexContainer justifyContent="flex-end">
                      <Button
                        type="primary"
                        htmlType="submit"
                        // style={{ marginRight: "40%" }}
                        loading={this.props.addingApproval}
                      >
                        Submit
                      </Button>
                    </FlexContainer>
                  </div>
                ) : null}
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ settings, user, functions }) => ({
  addingApproval: settings.addingApproval,
  // functionById: user.functionById,
  // fetchingFunctions:functions.fetchingFunctions,
  functions: functions.functions,
  // designationById: user.designationById,
  approvalData: settings.approvalData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addApproval,
      // getFunctions
      // getFunctionNameByUserId,
      // getDesignationByUserId,
      // linkExceptionTypePayment,
      getApprovalData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalForm);
