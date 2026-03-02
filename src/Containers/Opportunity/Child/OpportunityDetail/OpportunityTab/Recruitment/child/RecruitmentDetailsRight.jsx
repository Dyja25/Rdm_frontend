import React from "react";
import RecruitmentDetailsTab from "./RecruitmentCard/RecruitmentDetailsTab.jsx";

class RecruitmentDetailsRight extends React.Component {
  render() {
    console.log(this.props.stageList);
    return (
      <div style={{ width: "100%" }}>
        <RecruitmentDetailsTab
          candidate={this.props.candidate}
          stageList={this.props.stageList}
          profileId={this.props.profileId}
        />
      </div>
    );
  }
}
export default RecruitmentDetailsRight;
