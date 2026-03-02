import React, { Component, lazy, useEffect } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import AllCustomerForm from "./AllCustomerForm";
import AllCustomerListTable from "./AllCustomerListTable";
import AllVendorListTable from "./AllVendorListTable";
import ReportSchedulerForm from "./ReportSchedulerForm";
import ReportSchedulerTable from "./ReportSchedulerTable";
import VendorForm from "./VendorForm";

const TabPane = StyledTabs.TabPane;

function SchedulerTab(props) {
    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Internal`} key="1">
                        <div style={{ marginTop: 10 }}>
                            <ReportSchedulerForm />
                            <ReportSchedulerTable/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Customer`} key="2">
                        <div style={{ marginTop: 10 }}>
                            <AllCustomerForm/>
                            <AllCustomerListTable/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Vendor`} key="3">
                        <div style={{ marginTop: 10 }}>
                            <VendorForm/>
                            <AllVendorListTable/>
                        </div>
                    </TabPane>
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}



export default SchedulerTab;