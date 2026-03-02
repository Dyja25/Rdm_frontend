import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import CandidateAddressCard from "./CandidateCards/CandidateAddressCard.jsx";
import CertificationLibrary from "./CandidateCards/CertificationLibrary.jsx";
const CandidateDetailCard =lazy(()=>import("./CandidateCards/CandidateDetailCard.jsx"));
const CandidateOverViewCard =lazy(()=>import("./CandidateCards/CandidateOverViewCard.jsx"));

const ProfileTopicOfIntrest =lazy(()=>import("./CandidateCards/CandidateTopicOfInterest.jsx"));
const CandidateDetailExtraCard=lazy(()=>import("./CandidateCards/CandidateDetailExtraCard.jsx"));

class CandidateDetailLeft extends Component {
  render() {
    const { candidate } = this.props;
    // console.log(userDetails);
    return (
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <CandidateOverViewCard 
       
        candidate={candidate} />
        <ProfileTopicOfIntrest 
        candidate={candidate} />
         <CertificationLibrary 
        candidate={candidate} />
        
        <CandidateDetailCard candidate={candidate} />
       
        <CandidateDetailExtraCard candidate={candidate}/>
        <CandidateAddressCard candidate={candidate}/>
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ candidate }) => ({
  // singleCandidate: candidate.singleCandidate,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDetailLeft);
