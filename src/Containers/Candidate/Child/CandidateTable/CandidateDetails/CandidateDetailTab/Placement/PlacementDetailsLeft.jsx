import React from "react";
import PlacementDetailsTab from "./PlacementDetailsTab.jsx";

class PlacementDetailsLeft extends React.Component {
  render() {
    // console.log(this.props.stageList);
    return (
      <div style={{ width: "100%" }}>
        <PlacementDetailsTab
        //   candidate={this.props.candidate}
          stageList={this.props.stageList}
        //   profileId={this.props.profileId}
        />
      </div>
    );
  }
}
export default PlacementDetailsLeft;
