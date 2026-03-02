import React, { Component, lazy,useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import CandidateDetailHeader from "./CandidateDetailHeader.jsx";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getCandidateById } from "../../../CandidateAction";
const CandidateDetailLeft = lazy(() => import("./CandidateDetailLeft.jsx"));
const CandidateDetailRight = lazy(() => import("./CandidateDetailRight.jsx"));

function CandidateDetails (props) {
    const { candidateId } = useParams();
 

  useEffect(() => {
      props.getCandidateById(candidateId);
    }, []);

 
    const { candidate, fetchingCandidateById } = props;
    console.log(props.candidateId);
    return (
      <>
        <CandidateDetailHeader />
        {fetchingCandidateById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <FlexContainer>
            <Suspense fallback={""}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <CandidateDetailLeft candidate ={candidate}/>
                </div>
                <div style={{ width: "75%" }}>
                  <CandidateDetailRight candidate={candidate}/>
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
      </>
    );
  }


const mapStateToProps = ({ candidate }) => ({
  fetchingCandidateById: candidate.fetchingCandidateById,
  candidate: candidate.candidate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      getCandidateById,
    }, 
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetails);
