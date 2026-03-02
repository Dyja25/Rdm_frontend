import { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";

import Dashboardheader from "./Child/DashboardHeader.jsx";
import DashboardDetailsRight from "./DashboardDetailsRight.jsx";

import { ResponsiveBox, FlexContainer } from "../../Components/UI/Layout";
import DashboardJumpStart from "./Child/JumpStart/DashboardJumpStart.jsx";
const DashboardDetailsLeft = lazy(() => import("./DashboardDetailsLeft.jsx"));
class Dashboard extends Component {
  state = { visible: false };

  render() {
    const {} = this.props;
    // console.log(timeZone);

    return (
      <>
        <Dashboardheader />

        <Suspense fallback={<BundleLoader />}>
          <DashboardJumpStart />

          <Suspense fallback={""}>
            <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
              <ResponsiveBox>
                <div style={{ width: "100%" }}>
                  <DashboardDetailsLeft />
                </div>
              </ResponsiveBox>

              <div style={{ width: "130%" }}>
                <DashboardDetailsRight />
              </div>
            
            </FlexContainer>
          </Suspense>
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ dashboard, auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
