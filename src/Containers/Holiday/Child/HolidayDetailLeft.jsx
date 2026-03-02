import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
const OverviewCard=lazy(()=>import("./OverviewCard"));
// import ProfileAboutCard from "../../Profile/Child/ProfileCards/ProfileAboutCard";
const StatusCard=lazy(()=>import("./StatusCard"));
// import PersonalCard from "./ProfileCards/PersonalCard";
// import ProfileTopicOfIntrest from "./ProfileCards/ProfileTopicOfIntrest";
// import ProfileDetailMap from "./ProfileCards/ProfileDetailMap";

class HolidayDetailLeft extends Component {
    render() {
        // const { userDetails } = this.props;
        // console.log(userDetails);
        return (
            <FlexContainer
                flexDirection="column"
                style={{ display: "block", height: "100%" }}
            >
                <OverviewCard
                // user={userDetails}
                />
                {/* <ProfileAboutCard user={userDetails} /> */}
                <StatusCard
                // user={userDetails}
                />
                {/* <ProfileTopicOfIntrest user={userDetails} />
        <ProfileStatsCard user={userDetails} />
        // <ProfileAboutCard user={userDetails} />
        <PersonalCard user={userDetails} /> */}
                {/* <ProfileDetailMap user={userDetails} /> */}
            </FlexContainer>
        );
    }
}
const mapStateToProps = ({ auth }) => ({
    // userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HolidayDetailLeft);
