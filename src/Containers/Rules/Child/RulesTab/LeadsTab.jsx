import React, { Component, lazy, useEffect } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import LeadsForm from "./LeadsForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLeavesDetails } from "../../../Settings/SettingsAction";

const TabPane = StyledTabs.TabPane;

function LeadsTab(props) {
  useEffect(() => {
    props.getLeavesDetails();
  }, []);
  return (
    <>
      <TabsWrapper style={{height:"90.3vh"}}>
        {/* <StyledTabs defaultActiveKey="1" type="card"> */}
        {/* <TabPane tab={`Distribution`} key="1"> */}
        <LeadsForm leadsData={props.leadsData} />
        {/* </TabPane> */}
        {/* <TabPane tab={`Aging`} key="2">
            <LeadsForm leadsData={props.leadsData} />
          </TabPane> */}
        {/* </StyledTabs> */}
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({ leadsData: settings.leadsData });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getLeavesDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTab);
