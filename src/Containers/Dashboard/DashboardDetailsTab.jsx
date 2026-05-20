import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BarChartIcon from '@mui/icons-material/BarChart';
// import { solid, } from '@fortawesome/fontawesome-svg-core/import.macro';
import { StyledTabs } from "../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../Components/UI/Layout";
import DashboardTable2 from "../Dashboard/Child/DashboardTable2.jsx";
import { FormattedMessage } from "react-intl";



const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DashboardDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }

  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
    // if (key === "1") {
    //   this.props.getQuotation(this.props.opportunity.opportunityId);
    // }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
        {/* <OpportunityStatsCard opportunity={opportunity} /> */}
        <div
          className="
  rounded-[0.3rem]
  shadow-[0_0.25em_0.625em_-0.125em_rgba(0,0,0,0.15)]
  border border-gray-400
  bg-[var(--bg-color)]
  m-[0.3rem]
  w-[97.8%]
  h-[42vh]
  max-[600px]:w-[96.5%]
  max-[600px]:h-[66.85vh]

"
>

          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >

          <TabPane
              tab={
                <>
                  {/* <FontAwesomeIcon icon={solid('bars-progress')} /> */}
                  <BarChartIcon/>
                    <span style={{ marginLeft: "0.25em" }}>
                      {/* Open Requirements */}
                          <FormattedMessage
          id="app.openRequirements"
          defaultMessage="Open Requirements"
        />
                    </span>
                  
                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <DashboardTable2
                />
              </Suspense>
    </TabPane>
            {/* <TabPane
              tab={
                <>
                 
                  <FontAwesomeIcon icon={solid('people-group')} />
                    <span style={{ marginLeft: "0.25em" }}>Open Requirements</span>
                  
                  {activeKey === "2" && (
                    <>
                     
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <DashboardTable 
                />
              </Suspense>
            </TabPane>
            */}
            {/* <TabPane
              tab={
                <>
                 
                 <FontAwesomeIcon icon={solid ('dollar-sign')} />
                    <span style={{ marginLeft: "0.25em" }}>Customer</span>
                  
                  {activeKey === "2" && (
                    <>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <StackedChart
                />
              </Suspense>
            </TabPane> */}
           
            {/* <TabPane
              tab={
                <>
                 
                 <FontAwesomeIcon icon={solid ('dollar-sign')} />
                    <span style={{ marginLeft: "0.25em" }}>Commission</span>
                  
                  {activeKey === "3" && (
                    <>
                
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <DashBoardCommissionTable
                />
              </Suspense>
            </TabPane> */}
           
           

            
            {/* )} */}
          </StyledTabs>
        </div>
        <Suspense fallback={null}>
                  </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  auth,
  contact,
  account,
  opportunity,
  call,
  event,
  task,
  partner,
  customeField,
}) => ({

 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

  
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsTab);
