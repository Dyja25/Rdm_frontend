import React, { Component } from "react";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";


 import CandidateCatagoryCard from "./RecruitmentCard/CandidateCatagoryCard.jsx";
 import RecruitmentDocumentCard from "./RecruitmentCard/RecruitmentDocumentCard.jsx"


 import RecruitmentDetailsRight from "./RecruitmentDetailsRight.jsx"


class RecruitmentDetailsLeft extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <FlexContainer flexDirection="" style={{ display: "block" }}>
      {/* <RecruitmentCandidateCard candidate={candidate} /> */}
      <RecruitmentDetailsRight  
      candidate={this.props.candidate}
                    stageList={this.props.stageList}
                    profileId={this.props.profileId}
                    />
<div style={{display:"flex"}}>  
<div style={{width: "50%"}}>         
       <CandidateCatagoryCard candidate={candidate} />
       </div>
       <div style={{width: "50%"}}>
       <RecruitmentDocumentCard candidate={candidate} />
       </div>
       </div>
    
    </FlexContainer>
    );
  }
}

export default RecruitmentDetailsLeft;
