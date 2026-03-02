import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import LeaveJumpstartBoxex from "./Child/JumpStartBoxes/LeaveJumpstartBoxes";
import LeaveHeader from "./Child/LeaveHeader";
import { getleaveLeftSideDetails } from "./LeavesAction";
const LeaveJumpstart = lazy(() => import("./Child/JumpStartBoxes/LeaveJumpstart.jsx"));
const LeaveDetailLeft = lazy(() => import("./Child/LeaveDetailLeft.jsx"));
const LeaveDetailRight = lazy(() => import("./Child/LeaveDetailRight.jsx"));

class Leave extends Component {
  componentDidMount() {
    const {
      user: { userId },
      getleaveLeftSideDetails,
    } = this.props;
    getleaveLeftSideDetails(userId);
  }
  render() {
    return (
      <>
        <LeaveJumpstart leaveFetching={this.props.leaveFetching} />
        {/* <LeaveHeader /> */}
        {/* {false ? ( */}
        {/* // <MainWrapper>
                    //     <BundleLoader />
                    // </MainWrapper>
                // ) : ( */}
        <FlexContainer>
          <Suspense fallback={"Loading..."}>
            <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
              {/* <div style={{ width: "25%", height: "100%" }}>
                <LeaveDetailLeft leaveFetching={this.props.leaveFetching} />
              </div> */}
              <div style={{ width: "100%", height: "100%" }}>
                <LeaveDetailRight />
              </div>
            </FlexContainer>
          </Suspense>
        </FlexContainer>
        {/* )} */}
      </>
    );
  }
}

const mapStateToProps = ({ auth, leave }) => ({
  user: auth.userDetails,
  leaveFetching: leave.leaveFetching,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getleaveLeftSideDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Leave);
