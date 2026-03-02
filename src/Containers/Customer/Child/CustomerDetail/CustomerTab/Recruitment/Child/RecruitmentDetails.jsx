import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../../../Components/UI/Layout";

const RecruitmentDetailsLeft = lazy(() => import("./RecruitmentDetailsLeft"));
const RecruitmentDetailsRight = lazy(() => import("./RecruitmentDetailsRight"));

class RecruitmentDetails extends Component {
  render() {
    console.log(this.props.stageList);
    return (
      <>
        {this.props.fetchingContactById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "25%" }}>
                    <RecruitmentDetailsLeft contact={this.props.contact} />
                  </div>
                  <div style={{ width: "75%" }}>
                    <RecruitmentDetailsRight
                      contact={this.props.contact}
                      stageList={this.props.stageList}
                      profileId={this.props.profileId}
                    />
                  </div>
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
      </>
    );
  }
}
const mappropsToProps = ({ contact }) => ({
  fetchingContactById: contact.fetchingContactById,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mappropsToProps, mapDispatchToProps)(RecruitmentDetails);
