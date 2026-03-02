import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  FlexContainer,
  
} from "../../../../../../../Components/UI/Layout";

const PlacementDetailsLeft = lazy(() => import("./PlacementDetailsLeft.jsx"));
// const RecruitmentDetailsRight = lazy(() => import("./RecruitmentDetailsRight"));

class PlacementDetails extends Component {
  render() {
    // console.log(this.props.stageList);
    return (
      <>
     
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "100%" }}>
                    <PlacementDetailsLeft 
                    stageList={this.props.stageList}
                   
                     />
                  </div>
                
                </FlexContainer>
              </Suspense>
            </FlexContainer>
         
      </>
    );
  }
}
const mappropsToProps = ({ candidate }) => ({
//   fetchingCandidateById: candidate.fetchingCandidateById,
  
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mappropsToProps, mapDispatchToProps)(PlacementDetails);
