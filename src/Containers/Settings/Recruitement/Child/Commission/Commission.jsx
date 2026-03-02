import React, { Component, lazy, useEffect } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import CommissionForm from "./CommissionForm";
import RecruiterForm from "./RecruiterForm";
const TabPane = StyledTabs.TabPane;

function CattleFeedTab(props) {
    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Sales`} key="1">
                        <div style={{ marginTop: 10 }}>
                            <CommissionForm />
                        </div>
                    </TabPane>
                    <TabPane tab={`Recruiter`} key="2">
                        <div style={{ marginTop: 10 }}>
                            <RecruiterForm/>
                        </div>
                    </TabPane>
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}



export default CattleFeedTab;