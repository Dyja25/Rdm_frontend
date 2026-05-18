import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { JumpStartBox } from "../../../../Components/UI/Elements";

class LeaveJumpstart extends React.Component {
  render() {
    const {
      leaveFetching: {
        leaveBalance,
        totalAppliedLeaves,
        totalLeaves,
        totalPendingLeaves,
        
      },
    } = this.props;
     console.log(leaveBalance);
    return (
      <FlexContainer flexDirection="column" style={{ width: "100%" }}>
            <FlexContainer
  className="w-full flex justify-center gap-6 overflow-x-hidden"
>

                <div className="w-[17%] min-w-[220px]">
                <JumpStartBox
                bgColor="#005075"
                title="Maximum Leaves"
                stringValue
                noProgress
                value={totalLeaves}
                />
                </div>

                <div className="w-[17%] min-w-[220px]">
                <JumpStartBox
                bgColor="#0073a8"
                stringValue
                noProgress
                title="Total Leaves Applied"
                value={totalAppliedLeaves}
                />
                </div>

               <div className="w-[17%] min-w-[220px]">
                <JumpStartBox
                bgColor="#0093d7"
                title="Pending"
                stringValue
                noProgress
                value={totalPendingLeaves}
                />
                </div>

                <div className="w-[17%] min-w-[220px]">
                <JumpStartBox   
                bgColor="#24b9fe"
                title="Leave Balance"
                stringValue
                noProgress
                value={leaveBalance}
                />
                </div>
            </FlexContainer>
        </FlexContainer>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeaveJumpstart);
