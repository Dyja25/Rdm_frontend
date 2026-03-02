import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import OverviewCard from "./OverviewCard";
// import ProfileAboutCard from "../../Profile/Child/ProfileCards/ProfileAboutCard";
import StatusCard from "./StatusCard";
// import PersonalCard from "./ProfileCards/PersonalCard";
// import ProfileTopicOfIntrest from "./ProfileCards/ProfileTopicOfIntrest";
// import ProfileDetailMap from "./ProfileCards/ProfileDetailMap";

class LeaveDetailLeft extends Component {
  render() {
    const { leaveFetching } = this.props;
    return (
      <FlexContainer
        flexDirection="column"
        style={{ display: "block", height: "100%" }}
      >
        <StatusCard leaveFetching={leaveFetching} />
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeaveDetailLeft);
