import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import ProfileOverviewCard from "./ProfileCards/ProfileOverviewCard";
import ProfileAboutCard from "./ProfileCards/ProfileAboutCard";
import ProfileStatsCard from "./ProfileCards/ProfileStatsCard";
import PersonalCard from "./ProfileCards/PersonalCard";
import ProfileTopicOfIntrest from "./ProfileCards/ProfileTopicOfIntrest";
import ProfileDetailMap from "./ProfileCards/ProfileDetailMap";

class ProfileDetailLeft extends Component {
  render() {
    const { userDetails } = this.props;
    console.log(userDetails);
    return (
      <FlexContainer
        flexDirection="column"
        style={{ display: "block", height: "100%" }}
      >
        <ProfileOverviewCard user={userDetails} />
        <ProfileTopicOfIntrest user={userDetails} />
        <ProfileStatsCard user={userDetails} />
        <ProfileAboutCard user={userDetails} />
        <PersonalCard user={userDetails} />
        {/* <ProfileDetailMap user={userDetails} /> */}
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailLeft);
