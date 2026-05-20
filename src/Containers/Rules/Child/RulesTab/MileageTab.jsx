import React, { Component, lazy, useEffect } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import MileageForm from "./MileageForm.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMileageDetails } from "../../../Settings/SettingsAction";

const TabPane = StyledTabs.TabPane;

function MileageTab(props) {
  useEffect(() => {
    props.getMileageDetails(props.userId);
  }, []);
  return (
    <>
      <TabsWrapper style={{height:"90.3vh"}}>
        {/* <StyledTabs defaultActiveKey="1" type="card"> */}
        {/* <TabPane tab={`Distribution`} key="1"> */}
        <MileageForm mileageData={props.mileageData} />
        {/* </TabPane> */}
        {/* <TabPane tab={`Aging`} key="2">
            <LeadsForm leadsData={props.leadsData} />
          </TabPane> */}
        {/* </StyledTabs> */}
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ settings,auth }) => ({ 
  mileageData: settings.mileageData,
  userId: auth.userDetails.userId,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      getMileageDetails 
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MileageTab);
