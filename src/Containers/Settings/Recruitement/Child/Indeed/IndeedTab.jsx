import React from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IndeedForm from "./IndeedForm";
import WebsiteForm from "./Website/WebsiteForm";
import UpWorkForm from "./Upwork/UpWorkForm";
import PartnerForm from "./Partner/PartnerForm";
import MonsterForm from "./Monster/MonsterForm";
import { FormattedMessage } from "react-intl";

const TabPane = StyledTabs.TabPane;

function IndeedTab(props) {
  return (
    <>
      <TabsWrapper style={{height:"90.3vh"}}>
        <StyledTabs defaultActiveKey="1" type="card">
          <TabPane
           tab={`Website`}
            key="1"
          >
            <div style={{ marginTop: 10 }}>
            <WebsiteForm/>
            </div>
          </TabPane>
          <TabPane
           tab={`Monster`}
            key="2"
          >
            <div style={{ marginTop: 10 }}>
            <MonsterForm />
            </div>
          </TabPane>
          <TabPane
           tab={`UpWork`}
            key="3"
          >
            <div style={{ marginTop: 10 }}>
            <UpWorkForm/>
            </div>
          </TabPane>
          <TabPane
          //  tab={`Indeed`}
          tab={<FormattedMessage id="app.indeed" defaultMessage="Indeed" />}
            key="4"
          >
            <div style={{ marginTop: 10 }}>
            <IndeedForm />
             
            </div>
          </TabPane>
          <TabPane
           tab={`Partner`}
            key="5"
          >
            <div style={{ marginTop: 10 }}>
            <PartnerForm/>
             
            </div>
          </TabPane>
          {/* <TabPane
            tab={
              <Icon
                type="bell"
                style={{
                  marginTop: "0.375em",
                  fontSize: "1.125em",
                  paddingLeft: "0.625em",
                }}
              />
            }
            key="2"
          >
            <div style={{ marginTop: 10 }}>
              <QuotationCommunicationFormForNotification />
            </div>
          </TabPane> */}
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
)(IndeedTab);