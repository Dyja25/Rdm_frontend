import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";

const ProfileDetailLeft = lazy(() => import("./Child/ProfileDetailLeft"));
const ProfileDetailRight = lazy(() => import("./Child/ProfileDetailRight"));

class Profile extends Component {
  componentDidMount() {
    const {
      user: { userId },
    } = this.props;
  }
  render() {
    return (
      <>
        {false ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "25%", height: "100%" }}>
                    <ProfileDetailLeft />
                  </div>
                  <div style={{ width: "75%", height: "100%" }}>
                    <ProfileDetailRight />
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
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
