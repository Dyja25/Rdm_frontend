import React, { Component, lazy, useEffect,useState } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import RecruiterForm from "../Commission/RecruiterForm";
//import CommissionForm from "./CommissionForm";
import ThirdPartyForm from "./ThirdPartyForm";
import ThirdPartyVendorForm from "./ThirdPartyVendorForm";
//import RecruiterForm from "./RecruiterForm";
const TabPane = StyledTabs.TabPane;

function ThirdPartyAccess(props) {

    
   return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Customer`} key="1">
                        <div style={{ marginTop: 10 }}>
                            <ThirdPartyForm />
                        
                        </div>
                    </TabPane>
                    <TabPane tab={`Vendor`} key="2">
                        <div style={{ marginTop: 10 }}>
                            <ThirdPartyVendorForm/>
                        </div>
                    </TabPane>
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}



export default ThirdPartyAccess;