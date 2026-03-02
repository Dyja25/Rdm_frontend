import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import OrganizationOverviewCard from "./OrganizationCards/OrganizationOverviewCard";
import OrganizationAboutCard from "./OrganizationCards/OrganizationAboutCard";
import OrganizationStatsCard from "./OrganizationCards/OrganizationStatsCard";
import OrganizationDetailMap from "./OrganizationCards/OrganizationDetailMap";
// import OrganizationTopicOfIntrest from "./OrganizationCards/OrganizationTopicOfIntrest";
// import OrgannizationTermsCard from "./OrganizationCards/OrganizationTermsCard";

class OrganizationDetailLeft extends Component {
  render() {
    const { organizationDetails } = this.props;
    console.log(organizationDetails);
    return (
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <OrganizationOverviewCard organization={organizationDetails} />
        {/* <OrganizationTopicOfIntrest organizationDetails={organizationDetails} /> */}
        <OrganizationAboutCard organization={organizationDetails} />
        <OrganizationStatsCard organization={organizationDetails} />
        {/* <OrgannizationTermsCard organizationDetails={organizationDetails} /> */}
        <OrganizationDetailMap organization={organizationDetails} />
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  organizationDetails: auth.organizationDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDetailLeft);
