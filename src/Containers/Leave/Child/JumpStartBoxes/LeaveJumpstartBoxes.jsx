import React from "react";
import LeaveJumpstart from "./LeaveJumpstart";
class LeaveJumpstartBoxex extends React.Component {
  render() {
    const { leaveFetching } = this.props;
    return (
      <>
        <LeaveJumpstart leaveFetching={leaveFetching} />
      </>
    );
  }
}
export default LeaveJumpstartBoxex;
