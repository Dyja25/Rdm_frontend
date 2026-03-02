import React, { Component, lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
  //import PublishActivity from "../RecruitmentTab/PublishActivity"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FastField } from "formik";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { bindActionCreators } from "redux";

import {
  getProcessStagesForRecruit,
  addProcessStageForRecruit,
  updateStageForRecruit,
  getProcessForRecruit,
  LinkProcessPublish,
  LinkStagePublish,
  handleProcessModal,
  updateProcessNameForRecruit,
} from "../../../SettingsAction";
import { Button, Tag, message, Tooltip,Switch } from "antd";
import styled from "styled-components";
import {
  MainWrapper,
  Spacer,
  TextInput,
} from "../../../../../Components/UI/Elements";
import SingleRecruitStages from "./SingleRecruitStages";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import { ActionIcon } from "../../../../../Components/Utils";
import AddProcessModalForRecruit from "../../AddProcessModalForRecruit";
import { EditOutlined } from "@ant-design/icons";
import AddApprovalModal from "./AddApprovalModal";
// import PublishActivity from "./PublishActivity";

const TabPane = StyledTabs.TabPane;
class RecruitmentTab extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
      activeKey: "0",
      // viewAll:false,
      // setIsViewAll:false,
      change: true,
      isTextInputOpen: false,
      addingStage: false,
      stageName: "",
      probability: null,
      days: null,
      visible: false,
      isViewAll: false,
      currentProcess: [],
      currentStageId: "",
      currentStage: [],
      currentStageName: "",
      exist: false,
      isProcessTextInputOpen: false,
      recruitmentProcessName: "",
      publish:false,
    };
  }

  componentDidMount() {
    this.props.getProcessForRecruit(this.props.organizationId);
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  handleEdit = () => {
    this.setState((prevState) => ({
      isProcessTextInputOpen: !prevState.isProcessTextInputOpen,
    }));
  };
  handleCancel = () => {
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleProcessClick = (item, i) => {
    this.setState({
      currentProcess: item,
    });
    this.props.getProcessStagesForRecruit(item.recruitmentProcessId);
  };

  handlePublishClick = ()=>{
    const {currentProcess,publish}=this.state;
  console.log(currentProcess);
    
    const Id = currentProcess.recruitmentProcessId;
    let data = {
      recruitmentProcessId:Id,
      publishInd:currentProcess.publishInd ? false: true
    }

    this.props.LinkProcessPublish(data,this.handleCallBack1);
    
  }

 

  handleApproveIconClick =(item)=>{
    this.setState({
      currentStageId:item
    })
  }

  

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
      this.props.getProcessForRecruit(this.props.organizationId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
  handleEditProcessName = () => {
    const { updateProcessNameForRecruit } = this.props;

    const {
      recruitmentProcessName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.recruitmentProcessId;
    let process = { recruitmentProcessName, recruitmentProcessId: Id };
    updateProcessNameForRecruit(process, this.handleCallBack1);
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleUpdateStage = (stageId, stageName, probability, days) => {
    //debugger;
    const { recruitProcessStages } = this.props;
    let exist =
      recruitProcessStages &&
      recruitProcessStages.some(
        (element) => element.stageName == stageName
      );
    if (exist) {
      message.error(
        "Stage with same name already exists as part of this workflow"
      );
    } else {
      this.props.updateStageForRecruit(stageId, stageName, probability, days);
    }
  };

  handleStagePublishClick=(stageId,publishInd)=>{
     const { recruitProcessStages } = this.props;
    // let exist =
    //   recruitProcessStages &&
    //   recruitProcessStages.some(
    //     (element) => element.stageName == stageName
    //   );
    const data={
      stageId,
      publishInd:publishInd ? false: true
    }
    console.log(publishInd)
    this.props.LinkStagePublish(data,this.handleCallBack)
  };
  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { recruitmentProcessId },
      } = this.state;

      this.props.getProcessStagesForRecruit(recruitmentProcessId);
    } else {
      alert("error");
    }
  };
  handleAddStage = () => {
    const { addProcessStage } = this.props;
    const {
      stageName,
      probability,
      addingStage,
      isTextInputOpen,
     
      currentProcess,
      days,
      currentStage,
    } = this.state;

    const { recruitProcessStages } = this.props;
    let exist =
      recruitProcessStages &&
      recruitProcessStages.some(
        (element) => element.stageName == stageName
      );

    const Id = currentProcess.recruitmentProcessId;
    console.log(Id);
    console.log(currentProcess);
    let stage = {
      stageName,
      probability,
      days,
      recruitmentProcessId: Id,
      organizationId:this.props.organizationId,
      processId:this.props.processId
    };
    if (exist) {
      debugger;
      message.error(
        "Can not create as another stage exists with same name !"
      );
    } else {
      // message.success("probability add");
      this.props.addProcessStageForRecruit(stage, this.handleCallBack,this.props.organizationId,this.props.processId);
      // this.props.getProcessStagesForRecruit(this.props.recruitmentProcessId);
    }
    this.setState({
      stageName: "",
      probability: "",
      days: "",
      isTextInputOpen: false,
    });
  };
  render() {
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.25em",
                color: "#40A9FF",
                marginTop: "0.62em",
              }}
            >
              {/* Workflow */}
              <FormattedMessage
                id="app.workflow"
                defaultMessage="Workflow"
              />
            </h1>

            <FlexContainer>
              <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.recruitProcess.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.recruitmentProcessName, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                })}
              </StyledTabs>

              <Button
                style={{ margin: 10 }}
                ghost
                onClick={() => this.props.handleProcessModal(true)}
                type="primary"
              >
                Add
              </Button>
            </FlexContainer>

            <FlexContainer
              flexDirection="column"
              className="stages"
              justifyContent="center"
              alignItems="center"
              style={{
                marginTop: "1.87em",
                width: "100%",
                marginBottom: this.state.currentProcess.recruitmentProcessName
                  ? "1.87em"
                  : "0px",
              }}
            >
              {this.state.isProcessTextInputOpen ? (
                <div style={{}}>
                  <FlexContainer alignItems="center" justifyContent={"center"}>
                    <br />
                    <TextInput
                      placeholder="Process Name"
                      name="recruitmentProcessName"
                      defaultValue={
                        this.state.currentProcess.recruitmentProcessName
                      }
                      onChange={this.handleChange}
                      width={"100%"}
                      style={{ marginLeft: "2.81em" }}
                    />

                    <FlexContainer justifyContent="flex-end" marginTop="0.31em">
                      <Button
                        style={{
                          border: "0.06em solid #1890ff",
                          color: "#1890ff",
                        }}
                        htmlType="submit"
                        onClick={this.handleEditProcessName}
                      >
                        {/* Save */}
                        <FormattedMessage
                          id="app.save"
                          defaultMessage="Save"
                        />
                      </Button>
                      &nbsp;
                      <Button
                        style={{
                          border: "0.06em solid #1890ff",
                          color: "#1890ff",
                        }}
                        onClick={this.handleCancel}
                      >
                        {/* Cancel */}
                        <FormattedMessage
                          id="app.cancel"
                          defaultMessage="Cancel"
                        />
                      </Button>
                    </FlexContainer>
                  </FlexContainer>
                </div>
              ) : (
                <>
                  <h1
                    style={{
                      fontSize: "1.25em",
                      color: "white",
                      margin: 0,
                      padding: "0.31em",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.currentProcess.recruitmentProcessName ||
                      `${"Select Workflow"}`}{" "}
                    &nbsp;&nbsp;
                    {this.state.currentProcess.recruitmentProcessName && (
                      // <Tooltip title="Edit">
                        <ActionIcon
                          tooltipTitle="Edit"
                          iconType="edit"
                          onClick={this.handleEdit}
                          size="0.875em"
                        />

                       
                       

                        
                      // </Tooltip>
                    )}
                    {/* <Button
                              type="primary"
                              ghost
                              htmlType="button"
                            // onClick={this.toggleInput}
                            >
                            Publish
                            </Button> */}
                            
                          {/* <span
                            
                                       onClick={() => {
                                       
                                       
                                        this.props.LinkProcessPublish({
                                                opportunityId: this.props.opportunityId,
                                              //  stageId: item.stageId,
                                                recruitmentProcessId: this.props.recruitmentProcessId,
                                              //  skillName:this.state.skillSetData || item.skillName,
                                              //  recruitmentId: item.recruitmentId,
                                              //  profileId: item.profileId,
                                             });
                                       }}
                          > */}
                               {this.state.currentProcess.recruitmentProcessName &&
                             <Button 
                             style={{marginLeft:"12px"}}
                             onClick={this.handlePublishClick}
                             >
                              {/* {this.state.change?"Publish":"Unpublish"}  */}
                           {this.state.currentProcess.publishInd? "Unpublish": "Publish"} 
                             </Button>
                              } 
                             
                            
                            
                            {/* </span> */}
                           
                           
                            
                           
                    &nbsp;&nbsp;&nbsp;
                  </h1>
                 
                </>
              )}
            
                
            </FlexContainer>
            

            {this.props.recruitProcessStages.map((recruitProcessStages, i) => (
              <SingleRecruitStages
                key={i}
                stageValue1={this.state.stageName}
                newStageName="stageName"
                newProbability="probability"
                newDays="days"
                recruitmentProcessId={this.state.currentProcess.recruitmentProcessId}
                recruitProcessStages={recruitProcessStages}
                organization={this.props.organization}
                handleApproveIconClick={this.handleApproveIconClick}
                handleUpdateStage={this.handleUpdateStage} 
                handleStagePublishClick={this.handleStagePublishClick}              
                stageId={recruitProcessStages.stageId}
                className="scrollbar"
                id="style-3"
              />
            ))}

            <Spacer />
            {this.state.isTextInputOpen ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Stage name"
                  name="stageName"
                  value={this.state.stageName}
                  onChange={this.handleChange}
                  width={"20%"}
                />
                &nbsp; &nbsp;
                <TextInput
                  type="number"
                  placeholder="Weightage"
                  name="probability"
                  value={this.state.probability}
                  onChange={this.handleChange}
                  width={"12%"}
                />
                &nbsp; &nbsp;
                <TextInput
                  type="days"
                  placeholder="Days"
                  name="days"
                  value={this.state.days}
                  onChange={this.handleChange}
                  width={"8%"}
                />
                &nbsp; &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleAddStage}
                >
                  {/* Save */}
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
               
               
              </div>
              
            ) : (
              <>
               
                <FlexContainer justifyContent="flex-end">
              
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    onClick={this.toggleInput}
                    style={{ marginTop: "0.62em" }}
                  >
                    {/* Add Stage */}
                    <FormattedMessage
                      id="app.addstage"
                      defaultMessage="Add Stage"
                    />
                  </Button>
                </FlexContainer>
              </>
            )}
          </MainWrapper>
        </StageWrapper>
        
        <AddProcessModalForRecruit />
        <AddApprovalModal
        recruitmentProcessId={this.state.currentProcess.recruitmentProcessId}
        stageId={this.state.currentStageId}
        />
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  recruitProcessStages: settings.recruitProcessStages,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  recruitProcess: settings.recruitProcess,
  processPublish:settings.processPublish,
  stagesPublish:settings.stagesPublish,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessStagesForRecruit,
      addProcessStageForRecruit,
      updateStageForRecruit,
      getProcessForRecruit,
      handleProcessModal,
      LinkStagePublish,
      LinkProcessPublish,
      updateProcessNameForRecruit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentTab);
const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
