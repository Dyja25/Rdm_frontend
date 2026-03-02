import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// import PublishActivity from "./PublishActivity";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button, Tooltip,Switch, Divider } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Formik, Form, Field,FastField } from "formik";
import { TextInput, Spacer, Select } from "../../../../../Components/UI/Elements";
import { ActionIcon } from "../../../../../Components/Utils";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import { EditOutlined } from "@ant-design/icons";
import AddApprovalModal from "./AddApprovalModal";
import {handleApprovalModal,} from "../../../SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const { Option } = Select;

class SingleRecruitStages extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      // currentStage: [],
      fields: {},
      publish:false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    debugger;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  }; 

  
 
  

  render() {
    console.log(this.state.fields);
    const { recruitProcessStages } = this.props;
    console.log(recruitProcessStages);

    const {
      recruitProcessStages: {
        stageName,
        stageId,
        probability,
        days,
        publishInd,
        stageSequence,
      },
      linkedStages,
      organization,
      newStageName,
      newProbability,
      newDays,
      stageValue1,
      handleChange,
      updatingStages,
      handleUpdateStage,
      handleStagePublishClick,
      handleDeleteStage,
      handleStageClick,
      color,
      key,
      currentStage,
    } = this.props;
    console.log(stageId, "----------", linkedStages);
    console.log(stageName);
    console.log(color);
    console.log(currentStage);

    const disabled = probability === 100 || probability === 0 ? true : false;
    // const disabled = false;
    const disableDelete = linkedStages && linkedStages.includes(stageId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer
                justifyContent="center"
                alignItems="center"
                // onClick={() => handleStageClick(stageId, stageName)}
                style={{
                  backgroundColor:
                    stageId === currentStage && "rgb(161, 185, 185)",
                }}
              >
                
                <StageName style={{ flexBasis: "25%", textAlign: "left" }}>
                  {elipsize(stageName, 23)}
                </StageName>
                <StageName style={{ flexBasis: "25%"}}>
                <Select style={{ width: "70%"}}>
                <Option value="jack">1</Option>
              <Option value="lucy">2</Option>
            <Option value="tom">3</Option>
                </Select>
                </StageName>
                <StageValue style={{ flexBasis: "14%", textAlign: "center" }}>
                  {`${probability}%`}
                </StageValue>
                <StageValue style={{ flexBasis: "14%", textAlign: "center" }}>
                  {`${days}D`}
                </StageValue>            

                <div style={{ flexBasis:"no-wrap",justifyContent:"space-between" }}>
                    <>                 
                   <Tooltip title="Edit">
                        <ActionIcon
                          tooltipTitle="Edit"
                          iconType="edit"
                          onClick={toggleViewType}
                          size="0.75em"
                        />
                      </Tooltip>
                    </>
                     &nbsp;
                   <Tooltip title="Approval" >
                    <span
                    onClick={(item) => 
                     {
                       this.props.handleApprovalModal(true);  
                       this.props.handleApproveIconClick(stageId)                                         
                    }                     
                    }
                     style={{ 
                     marginLeft: "35px",
                      }} 
                     >
                   <i class="far fa-thumbs-up"></i>
                   </span>
                   </Tooltip>
                   &nbsp; 
                   <span>
                       
                     {recruitProcessStages.probability === 0 || recruitProcessStages.probability === 100 ? null :
                
                <Button
                     onClick={() =>
                      handleStagePublishClick(
                        this.props.stageId,
                        publishInd
                       
                      )
                    }
                    >
                         {publishInd? "Unpublish" :"Publish"} 
                             
                             </Button> 
                             }
                   </span>

                  

                  </div>
                     
                   

                 
           </FlexContainer>
            
            ) : (
              
              <FlexContainer justifyContent="center">
                <TextInput
                  name={newStageName}
                  // value={stageValue1 || stageName}
                  defaultValue={stageName}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
                &nbsp;&nbsp;
                <TextInput
                  name={newProbability}
                  defaultValue={probability}
                  disabled={disabled}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                  onChange={this.handleChange}
                  // placeholder="Weightage"
                  // disabled={true}
                  width={"12%"}
                />
                &nbsp;&nbsp;
                <TextInput
                  name={newDays}
                  defaultValue={days}
                  disabled={disabled}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                  onChange={this.handleChange}
                  placeholder="Days"
                  width={"8%"}
                />
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={disabled}
                  loading={updatingStages}                  
                  onClick={() =>
                    handleUpdateStage(
                      this.props.stageId,
                      this.state.fields.stageName,
                      this.state.fields.probability,
                      this.state.fields.days,
                      toggleViewType()
                    )
                  }
                >
                  {/* Save */}
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={() => toggleViewType()}>
               {/* Cancel */}
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
              </FlexContainer>
            )
          }

            {/* <AddApprovalModal
        handleApprovalModal={this.props.handleApprovalModal}
        addRecruitmentApprovalModal={this.props.addRecruitmentApprovalModal}
        /> */}
        </ViewEditCard>  

         

      </StageWrapper>
     
   
     
    );
   
  }

}
const mapStateToProps = ({ settings, auth }) => ({
  addRecruitmentApprovalModal:settings.addRecruitmentApprovalModal,
 


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleApprovalModal,
      
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecruitStages);
// export default SingleRecruitStages;


const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;

