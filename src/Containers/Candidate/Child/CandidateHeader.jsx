import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const CandidateActionLeft =lazy(()=>import("./CandidateActionLeft"));
const CandidateActionRight = lazy(()=>import("./CandidateActionRight"));
class CandidateHeader extends Component {
  render() {
    console.log("xxxr",this.props.currentUser)
    const { handleCandidateModal,handleCandidateResumeModal, viewType, setCandidateViewType ,handleCandidateFilterModal} = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <CandidateActionLeft
              viewType={viewType}
              handleChange={this.props.handleChange}
              text={this.props.text}
              setCandidateViewType={setCandidateViewType}
              currentData={this.props.currentData}
              handleClear={this.props.handleClear}
              handleCandidateFilterModal={handleCandidateFilterModal}
              setCurrentData={this.props.setCurrentData}
              currentSkillData={this.props.currentSkillData}
              handleSkillClear={this.props.handleSkillClear}
              setCurrentSkillData={this.props.setCurrentSkillData}
             
            />
          }
          rightComponent={
            <CandidateActionRight
            viewType={viewType}
            currentUser={this.props.currentUser} 
            fullName={this.props.fullName}
            handleDropChange={this.props.handleDropChange}
            handleCandidateModal={handleCandidateModal}
            handleCandidateResumeModal={handleCandidateResumeModal}
            handleCandidateFilterModal={handleCandidateFilterModal}
            
            />
          }
        />
      </div>
    );
  }
}

export default CandidateHeader;
