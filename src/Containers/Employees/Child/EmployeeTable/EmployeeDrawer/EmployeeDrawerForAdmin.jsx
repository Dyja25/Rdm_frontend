import React, { Component } from "react";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Switch, Button, message, Checkbox, Popconfirm } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import Error from "./Error";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import {
  Title,
  SubTitle,
  DrawerHeaderText,
  Spacer,
  TextInput,
} from "../../../../../Components/UI/Elements";
import { ActionIcon } from "../../../../../Components/Utils";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { handleEmployeeDrawerForAdmin } from "../../../EmployeeAction";
// import ViewportModal from "../../../../../Viewport/Child/ViewportModal";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import EmployeeJumpStartForAdmin from "./EmployeeJumpStartForAdmin";
// import AddFunctionModal from "./AddFunctionModal";

class EmployeeDrawerForAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLevelTextInputOpen: false,
      //   isModuleTextInputOpen: false,
      //   currentStageName: "",
      //   showBox: false,
      isAddModuleNameInputOpen: false,
      //   fields: {},
    };
  }
  // componentDidMount() {
  //   this.props.getCustomDepartment();
  // }

  // handleShowBox = () => {
  //   this.setState((prevState) => ({
  //     showBox: !prevState.showBox,
  //   }));
  // };

  handleAddCustomModule = () => {
    this.setState((prevState) => ({
      isAddModuleNameInputOpen: !prevState.isAddModuleNameInputOpen,
    }));
  };
  handleAddCustomeDepartment = () => {
    this.props.addCustomDepartment(this.state.fields);
    this.setState((prevState) => ({
      isAddModuleNameInputOpen: !prevState.isAddModuleNameInputOpen,
    }));
  };
  handleCancelCustomeDepartment = () => {
    this.setState((prevState) => ({
      isAddModuleNameInputOpen: !prevState.isAddModuleNameInputOpen,
    }));
  };
  // handleEdit = () => {
  //   debugger;
  //   this.setState((prevState) => ({
  //     isLevelTextInputOpen: !prevState.isLevelTextInputOpen,
  //   }));
  // };

  // handleChange = ({ target: { name, value } }) =>
  //   this.setState({
  //     fields: { [name]: value },
  //   });
  // handleUpdate = (userId, data) => {
  //   debugger;
  //   this.setState(
  //     {
  //       isLevelTextInputOpen: false,
  //     },
  //     this.props.getUserLevelUpdate(userId, data)
  //   );
  // };
  // handleLevelNotEdit = () => {
  //   debugger;
  //   this.setState(
  //     {
  //       isLevelTextInputOpen: false,
  //     },

  //     this.handleErrorMessage()
  //   );
  // };

  // handleErrorMessage = () => {
  //   message.error("Contact Korero support team to change Level");
  // };
  handleCloseDrawer = () => {
    // const { employeeDrawerProps } = this.props;
    this.setState(
      {
        isLevelTextInputOpen: false,
      },
      this.props.handleEmployeeDrawerForAdmin(false)
    );
  };
  // handleSmartBoostToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       userId,
  //       metaData: { smartBoost },
  //     },
  //     enableSmartBoostByUserId,
  //     disableSmartBoostByUserId,
  //   } = this.props;

  //   if (!smartBoost) {
  //     console.log("enabling smartboost ...");
  //     enableSmartBoostByUserId(userId);
  //   } else {
  //     console.log("disabling smartboost ...");
  //     disableSmartBoostByUserId(userId, (lastDayFromStartDate) =>
  //       message.error(
  //         `Smart Boost cannot be disabled before ${dayjs(
  //           lastDayFromStartDate
  //         ).format("lll")} `
  //       )
  //     );
  //   }
  // };
  // handleEnableSmartBoostForAll = () => {
  //   const {
  //     employeeDrawerProps: {
  //       userId,
  //       metaData: { smartBoost },
  //     },
  //     enableSmartBoostByUserId,
  //     disableSmartBoostByUserId,
  //   } = this.props;
  //   const {
  //     employeeDrawerProps: { organizationId },
  //     enableSmartBoostForAll,
  //   } = this.props;

  //   enableSmartBoostForAll(organizationId, (status) => {
  //     if (status === "success" && !smartBoost) {
  //       message.success(
  //         "You have successfully enabled smartboost for all users"
  //       );
  //       enableSmartBoostByUserId(userId);
  //     } else {
  //       message.error("Oops!, something went wrong. please retry.");
  //     }
  //   });
  // };
  // handleEnableProductForAll = () => {
  //   const {
  //     employeeDrawerProps: {
  //       userId,
  //       metaData: { productStatus },
  //     },
  //     enableProductByUserId,
  //     disableProductByUserId,
  //   } = this.props;

  //   const {
  //     employeeDrawerProps: { organizationId },
  //     enableProductForAllUsers,
  //   } = this.props;
  //   enableProductForAllUsers(organizationId, (status) => {
  //     if (status === "success" && !productStatus) {
  //       message.success("You have successfully enabled QuotPro for all users");
  //       enableProductByUserId(userId);
  //     } else {
  //       message.error("Oops!, something went wrong. please retry.");
  //     }
  //   });
  // };
  // handleProductToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       userId,
  //       metaData: { productStatus },
  //     },
  //     enableProductByUserId,
  //     disableProductByUserId,
  //   } = this.props;

  //   if (!productStatus) {
  //     console.log("enabling product ...");
  //     enableProductByUserId(userId);
  //   } else {
  //     console.log("disabling product ...");
  //     disableProductByUserId(
  //       userId,
  //       (lastDayFromStartDate) =>
  //         message.error(
  //           `QuotPro cannot be disabled before ${dayjs(
  //             lastDayFromStartDate
  //           ).format("lll")} `
  //         )
  //     );
  //   }
  // };
  // handleViewportToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { viewportStatus },
  //     },
  //     enableViewport,
  //     disableViewport,
  //   } = this.props;

  //   if (!viewportStatus) {
  //     console.log("enabling viewport ...");
  //     enableViewport(organizationId);
  //   } else {
  //     console.log("disabling  ...");
  //     disableViewport(
  //       organizationId,
  //       (lastDayFromStartDate) =>
  //         message.error(
  //           `ViewPort cannot be disabled before ${dayjs(
  //             lastDayFromStartDate
  //           ).format("lll")} `
  //         )
  //     );
  //   }
  // };

  // handleDeliveryToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { deliveryInd },
  //     },
  //     enableDelivery,
  //     disableDelivery,
  //   } = this.props;
  //   console.log(deliveryInd);
  //   if (!deliveryInd) {
  //     enableDelivery(organizationId);
  //   } else {
  //     message.success(<Error />);
  //   }
  // };

  // handleFinanceToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { financeInd },
  //     },
  //     enableFinance,
  //     disableFinance,
  //   } = this.props;
  //   console.log(financeInd);
  //   if (!financeInd) {
  //     enableFinance(organizationId);
  //   } else {
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );
  //   }
  // };

  // handleLegalToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { legalInd },
  //     },
  //     enableLegal,
  //     disableLegal,
  //   } = this.props;
  //   console.log(legalInd);
  //   console.log(legalInd);
  //   if (!legalInd) {
  //     enableLegal(organizationId);
  //   } else {
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );
  //   }
  // };

  // handleRiskManagementToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { riskManagementInd },
  //     },
  //     enableRiskManagement,
  //     disableRiskManagement,
  //   } = this.props;
  //   console.log(riskManagementInd);
  //   if (!riskManagementInd) {
  //     enableRiskManagement(organizationId);
  //   } else {
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );
  //   }
  // };

  // handleCustomeToggleChange = (name) => {
  //   message.error(
  //     `If you want to disable ${name} module then contact Korero team`
  //   );
  // };

  // handleRecruitmentToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { recriutmentInd },
  //     },
  //     enableRecruitment,
  //     disableRecruitment,
  //   } = this.props;

  //   if (!recriutmentInd) {
  //     console.log("enabling viewport ...");
  //     enableRecruitment(organizationId);
  //   } else {
  //     console.log("disabling  ...");
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );

  //   }
  // };

  // handleMarketingToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { campaignInd },
  //     },
  //     enableMarketing,
  //   } = this.props;

  //   if (!campaignInd) {
  //     console.log("enabling viewport ...");
  //     enableMarketing(organizationId);
  //   } else {
  //     console.log("disabling  ...");
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );

  //   }
  // };

  // handleInnoventoryProToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { inventoryInd },
  //     },
  //     enableInnoventoryPro,
  //   } = this.props;

  //   if (!inventoryInd) {
  //     console.log("enabling viewport ...");
  //     enableInnoventoryPro(organizationId);
  //   } else {
  //     console.log("disabling  ...");
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );
  //   }
  // };
  // handleEcommerceToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { ecommerceInd },
  //     },
  //     enableEcommercePro,
  //   } = this.props;

  //   if (!ecommerceInd) {
  //     console.log("enabling viewport ...");
  //     enableEcommercePro(organizationId);
  //   } else {
  //     console.log("disabling  ...");
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );
  //   }
  // };

  // handleFashionProToggleChange = () => {
  //   const {
  //     employeeDrawerProps: {
  //       organizationId,
  //       metaData: { garmentProInd },
  //     },
  //     enableFashionPro,
  //   } = this.props;

  //   if (!garmentProInd) {
  //     console.log("enabling viewport ...");
  //     enableFashionPro(organizationId);
  //   } else {
  //     console.log("disabling  ...");
  //     message.error(
  //       `If you want to disable this module then contact Korero team`
  //     );
  //   }
  // };
  render() {
    // console.log(this.state.fields);
    const {
      handleEmployeeDrawerForAdmin,
      employeeDrawerVisibleForAdmin,
    } = this.props;
    console.log(employeeDrawerVisibleForAdmin);
    // console.log(employeeDrawerProps);

    // const last = String(lastName);

    // const newlastName = last.substring(0, 1);
    // console.log("metaData...........................", metaData);
    return (
      <>
        <StyledDrawer
          title={
            <div className="HeaderText">
              <DrawerHeaderText fontSize={"1.375em"}>
                {/* {`${firstName || ""}  ${newlastName || ""}`} */}
                <span
                  style={{
                    fontSize: "1em",

                    marginLeft: "0.3125em",
                    cursor: "pointer",
                  }}
                >
                  {/* <Tooltip title={emailId} placement="bottomLeft">
                    {`(${elipsize(emailId, 25)})`}
                  </Tooltip> */}
                </span>
              </DrawerHeaderText>
              <div
                className="logo"
                style={{
                  position: "absolute",
                  marginLeft: "15.9375em",
                  bottom: "-20.1875em",
                  boxShadow: " 0 0.75em 0.375em -0.375em rgb(46,44,44)",
                }}
              >
                <MultiAvatar
                  // primaryTitle={firstName}
                  // imageId={imageId}
                  // imageURL={imageURL}
                  imgHeight={30}
                  imgWidth={30}
                />
              </div>
            </div>
          }
          placement="right"
          closable
          width={400}
          onClose={this.handleCloseDrawer}
          visible={employeeDrawerVisibleForAdmin}
        >
          <br />
          <EmployeeJumpStartForAdmin
          // user={this.props.employeeDrawerProps}
          // handleEdit={this.handleEdit}
          // isLevelTextInputOpen={this.state.isLevelTextInputOpen}
          // handleUpdate={this.handleUpdate}
          // handleLevelNotEdit={this.handleLevelNotEdit}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <FlexContainer style={{ width: "100%" }}>
                <FlexContainer justifyContent="space-between">
                  <div
                    style={{
                      paddingLeft: "0.625em",
                      fontSize: "1.25em",
                      fontWeight: "bold",
                      position: "sticky",
                      marginTop: "0.9375em",
                    }}
                  >
                    Functions
                  </div>

                  <div style={{ marginTop: "0.625em" }}>
                    <Button type="primary" onClick={this.handleAddCustomModule}>
                      {/* <Icon type="plus" /> */}
                    </Button>
                  </div>
                </FlexContainer>
                &nbsp;&nbsp;
                <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                  <div style={{ marginTop: "0.5em" }}>
                    {this.state.isAddModuleNameInputOpen && (
                      <FlexContainer>
                        <TextInput
                          placeholder="Custom Function"
                          name="departmentName"
                          label={
                            <FormattedMessage
                              id="app.departmentName"
                              defaultMessage="Custom Function"
                            />
                          }
                          onChange={this.handleChange}
                          width={"58%"}
                        />
                        &nbsp; &nbsp;
                        <Button
                          style={{
                            border: "0.0625em solid #1890ff",
                            color: "#1890ff",
                          }}
                          htmlType="submit"
                          onClick={this.handleAddCustomeDepartment}
                        >
                          <FormattedMessage
                            id="app.save"
                            defaultMessage="Save"
                          />
                        </Button>
                        &nbsp;
                        <Button
                          style={{
                            border: "0.0625em solid #1890ff",
                            color: "#1890ff",
                          }}
                          onClick={this.handleCancelCustomeDepartment}
                        >
                          <FormattedMessage
                            id="app.cancel"
                            defaultMessage="Cancel"
                          />
                        </Button>
                      </FlexContainer>
                    )}
                  </div>
                  {/* {this.props.customerDepartment.map((item) => {
                    return (
                      <div>
                        {" "}
                        {userType === "ADMIN" && (
                          <MainWrapper
                            style={{
                              marginTop: 5,
                              padding: 10,
                              marginLeft: "0.5rem",
                              marginRight: "0.5rem",
                            }}
                          >
                            <FlexContainer
                              flexWrap="nowrap"
                              justifyContent="space-between"
                            >
                              {this.state.isModuleTextInputOpen ? (
                                <>
                                  <div style={{ width: "99%" }}>
                                    <br />
                                    <TextInput
                                      placeholder="Module Name"
                                      name="processName"
                                      onChange={this.handleChange}
                                      width={"100%"}
                                    />

                                    <FlexContainer
                                      justifyContent="flex-end"
                                      marginTop="0.3125em"
                                    >
                                      <Button
                                        style={{
                                          border: "0.0625em solid #1890ff",
                                          color: "#1890ff",
                                        }}
                                        htmlType="submit"
                                      >
                                        Save
                                      </Button>
                                      &nbsp;
                                      <Button
                                        style={{
                                          border: "0.0625em solid #1890ff",
                                          color: "#1890ff",
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </FlexContainer>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div style={{ padding: "0em 0.625em" }}>
                                    <FlexContainer>
                                      <SubTitle
                                        fontSize="1.125em"
                                        style={{ flexBasis: "8%" }}
                                      >
                                         <Icon
                                        type="idcard"
                                        style={{
                                          color: "red",
                                          fontSize: "1.125em",
                                        }}
                                      />
                                        &nbsp;
                                        {item.departmentName || ""}
                                      </SubTitle>
                                      &nbsp;
                                    </FlexContainer>
                                  </div>

                                  <div style={{ padding: "0em 1.875em" }}>
                                    <Popconfirm
                                      title="Do you wish to proceed?"
                                      onConfirm={() =>
                                        this.handleCustomeToggleChange(
                                          item.departmentName
                                        )
                                      }
                                      onCancel={null}
                                      okText="Ok"
                                      cancelText="Cancel"
                                    >
                                      <Switch
                                        style={{ width: "3.4375em" }}
                                        checked={true}
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                      />
                                    </Popconfirm>
                                  </div>
                                </>
                              )}
                            </FlexContainer>
                          </MainWrapper>
                        )}
                      </div>
                    );
                  })} */}
                  {/* {userType === "ADMIN" && (
                    <MainWrapper
                      style={{
                        marginTop: 5,
                        padding: 10,
                        marginLeft: "0.5rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      <FlexContainer
                        flexWrap="nowrap"
                        justifyContent="space-between"
                      >
                        <div style={{ padding: "0em 0.625em" }}>
                          <SubTitle fontSize="1em" style={{ flexBasis: "8%" }}>
                          <Icon
                            type="idcard"
                            style={{ color: "red", fontSize: "1.125em" }}
                          />
                            {" Legal  " || ""}
                          </SubTitle>
                        </div>
                        <div style={{ padding: "0em 1.875em" }}>
                          {organization &&
                            organization.subscriptionType === "STARTER" && (
                              <Tooltip
                                title={
                                  organization.subscriptionType === "STARTER"
                                    ? "Not available in Starter version"
                                    : ""
                                }
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.legalInd}
                                  disabled={true}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                />
                              </Tooltip>
                            )}
                          {organization &&
                            organization.subscriptionType === "FREE" && (
                              <Tooltip
                                title={
                                  organization.subscriptionType === "FREE"
                                    ? "Not available in FREE version"
                                    : ""
                                }
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.legalInd}
                                  disabled={true}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                />
                              </Tooltip>
                            )}
                          {organization &&
                            organization.subscriptionType === "PROFESSIONAL" && (
                              <Popconfirm
                                title="Do you wish to proceed?"
                                onConfirm={this.handleLegalToggleChange}
                                onCancel={null}
                                okText="Ok"
                                cancelText="Cancel"
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.legalInd}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                  Loading={
                                    enableLegalRequest || disableLegalRequest
                                  }
                                />
                              </Popconfirm>
                            )}
                          {organization &&
                            organization.subscriptionType ===
                            "PROFESSIONALPLUS" && (
                              <Popconfirm
                                title="Do you wish to proceed?"
                                onConfirm={this.handleLegalToggleChange}
                                onCancel={null}
                                okText="Ok"
                                cancelText="Cancel"
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.legalInd}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                  Loading={
                                    enableLegalRequest || disableLegalRequest
                                  }
                                />
                              </Popconfirm>
                            )}
                        </div>
                      </FlexContainer>
                      <SubTitle
                        whiteSpace="wrap"
                        style={{
                          fontSize: 12,
                          marginLeft: 10,
                          marginTop: 10,
                          color: "#035b9b",
                        }}
                      >
                        Enable collaboration with legal department, share
                        opportunities, documentation and more for advice, manage
                        tasks and approvals
                        <SubTitle
                          whiteSpace="wrap"
                          style={{
                            fontSize: 12,
                            marginTop: 10,
                            color: "#035b9b",
                          }}
                        >
                          To disable module, reach out to Korero team
                        </SubTitle>
                      </SubTitle>
                    </MainWrapper>
                  )} */}

                  {/* {userType === "ADMIN" && (
                    <MainWrapper
                      style={{
                        marginTop: 10,
                        padding: 10,
                        marginLeft: "0.5rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      <FlexContainer
                        flexWrap="nowrap"
                        justifyContent="space-between"
                      >
                        <div style={{ padding: "0em 0.625em" }}>
                          <SubTitle fontSize="1em" style={{ flexBasis: "30%" }}>
                          <Icon
                            type="monitor"
                            style={{ color: "red", fontSize: "1.125em" }}
                          />
                            {" Risk Management  " || ""}
                          </SubTitle>
                        </div>
                        <div style={{ padding: "0em 1.875em" }}>
                          {organization &&
                            organization.subscriptionType === "STARTER" && (
                              <Tooltip
                                title={
                                  organization.subscriptionType === "STARTER"
                                    ? "Not available in Starter version"
                                    : ""
                                }
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.riskManagementInd}
                                  disabled={true}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                />
                              </Tooltip>
                            )}
                          {organization &&
                            organization.subscriptionType === "FREE" && (
                              <Tooltip
                                title={
                                  organization.subscriptionType === "FREE"
                                    ? "Not available in Free version"
                                    : ""
                                }
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.riskManagementInd}
                                  disabled={true}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                />
                              </Tooltip>
                            )}
                          {organization &&
                            organization.subscriptionType === "PROFESSIONAL" && (
                              <Popconfirm
                                title="Do you wish to proceed?"
                                onConfirm={this.handleRiskManagementToggleChange}
                                onCancel={null}
                                okText="Ok"
                                cancelText="Cancel"
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.riskManagementInd}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                  Loading={
                                    enableRiskManagementRequest ||
                                    disableRiskManagementRequest
                                  }
                                />
                              </Popconfirm>
                            )}
                          {organization &&
                            organization.subscriptionType ===
                            "PROFESSIONALPLUS" && (
                              <Popconfirm
                                title="Do you wish to proceed?"
                                onConfirm={this.handleRiskManagementToggleChange}
                                onCancel={null}
                                okText="Ok"
                                cancelText="Cancel"
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.riskManagementInd}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                  Loading={
                                    enableRiskManagementRequest ||
                                    disableRiskManagementRequest
                                  }
                                />
                              </Popconfirm>
                            )}
                        </div>
                      </FlexContainer>
                      <SubTitle
                        whiteSpace="wrap"
                        style={{
                          fontSize: 12,
                          marginLeft: 10,
                          marginTop: 10,
                          color: "#035b9b",
                        }}
                      >
                        Enable collaboration with risk management team, share
                        opportunities, documentation and more, manage tasks and
                        approvals
                      </SubTitle>
                      <SubTitle
                        whiteSpace="wrap"
                        style={{
                          fontSize: 12,
                          marginLeft: 10,
                          marginTop: 10,
                          color: "#035b9b",
                        }}
                      >
                        To disable module, reach out to Korero team
                      </SubTitle>
                    </MainWrapper>
                  )} */}

                  {/* {userType === "ADMIN" && (
                    <MainWrapper
                      style={{
                        marginTop: 10,
                        padding: 10,
                        marginLeft: "0.5rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      <FlexContainer
                        flexWrap="nowrap"
                        justifyContent="space-between"
                      >
                        <div style={{ padding: "0em 0.625em" }}>
                          <SubTitle fontSize="1em" style={{ flexBasis: "30%" }}>
                          <Icon
                            type="audit"
                            style={{ color: "red", fontSize: "1.125em" }}
                          />
                            {" Finance  " || ""}
                          </SubTitle>
                        </div>
                        <div style={{ padding: "0em 1.875em" }}>
                          {organization &&
                            organization.subscriptionType === "STARTER" && (
                              <Tooltip
                                title={
                                  organization.subscriptionType === "STARTER"
                                    ? "Not available in Starter version"
                                    : ""
                                }
                              >
                                <Switch
                                  checked={metaData && metaData.financeInd}
                                  disabled={true}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                />
                              </Tooltip>
                            )}
                          {organization &&
                            organization.subscriptionType === "FREE" && (
                              <Tooltip
                                title={
                                  organization.subscriptionType === "FREE"
                                    ? "Not available in Free version"
                                    : ""
                                }
                              >
                                <Switch
                                  checked={metaData && metaData.financeInd}
                                  disabled={true}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                />
                              </Tooltip>
                            )}
                          {organization &&
                            organization.subscriptionType === "PROFESSIONAL" && (
                              <Popconfirm
                                title="Do you wish to proceed?"
                                onConfirm={this.handleFinanceToggleChange}
                                onCancel={null}
                                okText="Ok"
                                cancelText="Cancel"
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.financeInd}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                  Loading={
                                    enableFinanceRequest || disableFinanceRequest
                                  }
                                />
                              </Popconfirm>
                            )}
                          {organization &&
                            organization.subscriptionType ===
                            "PROFESSIONALPLUS" && (
                              <Popconfirm
                                title="Do you wish to proceed?"
                                onConfirm={this.handleFinanceToggleChange}
                                onCancel={null}
                                okText="Ok"
                                cancelText="Cancel"
                              >
                                <Switch
                                  style={{ width: "3.4375em" }}
                                  checked={metaData && metaData.financeInd}
                                  checkedChildren="Yes"
                                  unCheckedChildren="No"
                                  Loading={
                                    enableFinanceRequest || disableFinanceRequest
                                  }
                                />
                              </Popconfirm>
                            )}
                        </div>
                      </FlexContainer>
                      <SubTitle
                        whiteSpace="wrap"
                        style={{
                          fontSize: 12,
                          marginLeft: 10,
                          marginTop: 10,
                          color: "#035b9b",
                        }}
                      >
                        Enable collaboration with finance team, share
                        opportunities, documentation and more, manage tasks and
                        approvals
                      </SubTitle>
                      <SubTitle
                        whiteSpace="wrap"
                        style={{
                          fontSize: 12,
                          marginLeft: 10,
                          marginTop: 10,
                          color: "#035b9b",
                        }}
                      >
                        To disable module, reach out to Korero team
                      </SubTitle>
                    </MainWrapper>
                  )} */}
                </MainWrapper>
              </FlexContainer>
            </div>
          </div>
        </StyledDrawer>

        {/* <ViewportModal /> */}
        {/* <AddFunctionModal
          addInnoventoryModal={this.props.addInnoventoryModal}
          handleInnoventoryModal={this.props.handleInnoventoryModal}
          handleEcommerceModal={this.props.handleEcommerceModal}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ employee, viewport, auth }) => ({
  // addInnoventoryModal: team.addInnoventoryModal,
  employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
  // employeeDrawerProps: employee.employeeDrawerProps,
  userDetails: auth.userDetails,
  // enableSmartBoostRequest: team.enableSmartBoostRequest,
  // enableSmartBoostRequestError: team.enableSmartBoostRequestError,
  // disableSmartBoostRequest: team.disableSmartBoostRequest,
  // disableSmartBoostRequestError: team.disableSmartBoostRequestError,
  // enableProductRequest: team.enableProductRequest,
  // enableProductRequestError: team.enableProductRequestError,
  // disableProductRequest: team.disableProductRequest,
  // disableProductRequestError: team.disableProductRequestError,
  // enableViewportRequest: team.enableViewportRequest,
  // enableViewportRequestError: team.enableViewportRequestError,
  // disableViewportRequest: team.disableViewportRequest,
  // disableViewportRequestError: team.disableViewportRequestError,

  // enableDeliveryRequest: team.enableDeliveryRequest,
  // enableDeliveryRequestError: team.enableDeliveryRequestError,
  // disableDeliveryRequest: team.disableDeliveryRequest,
  // disableDeliveryRequestError: team.disableDeliveryRequestError,

  // enableFinanceRequest: team.enableFinanceRequest,
  // enableFinanceRequestError: team.enableLegalRequestError,
  // disableFinanceRequest: team.disableFinanceRequest,
  // disableFinanceRequestError: team.disableFinanceRequestError,

  // enableLegalRequest: team.enableLegalRequest,
  // enableLegalRequestError: team.enableLegalRequestError,
  // disableLegalRequest: team.disableLegalRequest,
  // disableLegalRequestError: team.disableLegalRequestError,

  // enableRiskManagementRequest: team.enableRiskManagementRequest,
  // enableRiskManagementRequestError: team.enableRiskManagementRequestError,
  // disableRiskManagementRequest: team.disableRiskManagementRequest,
  // disableRiskManagementRequestError: team.disableRiskManagementRequestError,

  // viewportModal: viewport.viewportModal,
  // disableSmartBoost: team.disableSmartBoost,

  // enableCustomeModuleRequest: team.enableCustomeModuleRequest,
  // enableCustomeModuleRequestError: team.enableCustomeModuleRequestError,

  // organization:
  //   auth.userDetails &&
  //   auth.userDetails.metaData &&
  //   auth.userDetails.metaData.organization,

  // customerDepartment: team.customerDepartment,

  // enableRecruitmentRequest: team.enableRecruitmentRequest,
  // enableRecruitmentRequestError: team.enableRecruitmentRequestError,

  // disableRecruitmentRequest: team.disableRecruitmentRequest,
  // disableRecruitmentRequestError: team.disableRecruitmentRequestError,

  // enableMarketingRequest: team.enableMarketingRequest,

  // enableInnoventoryProRequest: team.enableInnoventoryProRequest,
  // enableInnoventoryProRequestError: team.enableInnoventoryProRequestError,

  // enableEcommerceRequest: team.enableEcommerceRequest,
  // enableEcommerceRequestError: team.enableEcommerceRequestError,

  // enableFashionProRequest: team.enableFashionProRequest,
  // enableFashionProRequestError: team.enableFashionProRequestError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // addCustomDepartment,
      handleEmployeeDrawerForAdmin,
      // enableSmartBoostByUserId,
      // disableSmartBoostByUserId,
      // enableProductByUserId,
      // disableProductByUserId,
      // enableViewport,
      // disableViewport,
      // enableDelivery,
      // disableDelivery,
      // enableFinance,
      // disableFinance,
      // enableLegal,
      // disableLegal,
      // enableRiskManagement,
      // disableRiskManagement,
      // handleViewportModal,
      // enableSmartBoostForAll,
      // enableProductForAllUsers,
      // getUserLevelUpdate,
      // getCustomDepartment,
      // addCustomDepartment,
      // enableCustomeModule,
      // enableRecruitment,
      // disableRecruitment,
      // enableMarketing,
      // enableInnoventoryPro,
      // handleInnoventoryModal,
      // enableFashionPro,
      // handleEcommerceModal,
      // enableEcommercePro,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDrawerForAdmin);
