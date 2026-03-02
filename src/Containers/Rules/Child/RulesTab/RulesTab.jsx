import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
const Rules2Form = lazy(() => import("./Rules2Form.jsx"));
const Rules3Form = lazy(() => import("./Rules3Form.jsx"));

const TabPane = StyledTabs.TabPane;

function RulesTab() {
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
          <TabPane tab={`Opportunity Closure`} key="1">
            <div style={{ marginTop: 20 }}>
              <Rules2Form />
            </div>
          </TabPane>

          <TabPane tab={`Stage Progress`} key="3">
            <div style={{ marginTop: 20 }}>{/* <Rule1Form /> */}</div>
          </TabPane>
        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

export default RulesTab;
