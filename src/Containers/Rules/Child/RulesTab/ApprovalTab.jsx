import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import Rules3Form from "./Rules3Form.jsx";

const TabPane = StyledTabs.TabPane;

function NotificationRulesTab() {
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
          <TabPane tab={`Auto Approval`} key="1">
            <div style={{ marginTop: 20 }}>
              <Rules3Form />
            </div>
          </TabPane>
        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

export default NotificationRulesTab;
