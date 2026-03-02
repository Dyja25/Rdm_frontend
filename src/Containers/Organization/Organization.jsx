import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import { getOrganizationDetails } from "../Auth/AuthAction";

const OrganizationDetailLeft = lazy(() =>
  import("./Child/OrganizationDetailLeft.jsx")
);
const OrganizationDetailRight = lazy(() =>
  import("./Child/OrganizationDetailRight.jsx")
);

class Organization extends Component {
  componentDidMount() {
    const { getOrganizationDetails } = this.props;
    getOrganizationDetails();
  }
  render() {
    const { fetchingOrganizationDetails,organizationDetails } = this.props;
    console.log(this.props.organizationDetails.imageId)
    return (
    
      <>
        {/* <AccountDetailHeader /> */}
        {fetchingOrganizationDetails ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "25%" }}>
                    <OrganizationDetailLeft />
                  </div>
                  <div style={{ width: "75%" }}>
                    <OrganizationDetailRight />
                  </div>
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  fetchingOrganizationDetails: auth.fetchingOrganizationDetails,
  fetchingOrganizationDetailsError: auth.fetchingOrganizationDetailsError,
  organizationDetails:auth.organizationDetails
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrganizationDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
