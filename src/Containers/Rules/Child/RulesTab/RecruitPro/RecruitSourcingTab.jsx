import React from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RecruitCommunicationForm from "./RecruitCommunicationForm";
import OutReachForm from "./OutReachForm";
import JobPortalForm from "./JobPortalForm";

const TabPane = StyledTabs.TabPane;

function RecruitSourcingTab(props) {
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
        <TabPane tab={`Out reach`} key="1">
                        <div style={{ marginTop: 10 }}>
                            <OutReachForm />
                                                  
                        </div>
                    </TabPane>
        <TabPane tab={`Job Portal`} key="2">
                        <div style={{ marginTop: 10 }}>
                            <JobPortalForm/>
                        
                        </div>
                    </TabPane>      
          
        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitSourcingTab);