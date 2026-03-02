import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
//import SignatureView from "./SignatureView";
import { handleEmailModal,handleWebsiteModal } from "../../../Settings/SettingsAction";
import { connect } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { bindActionCreators } from "redux";
import AddEmailModal from "../Email/AddEmailModal";
import AddWebsiteModal from "../Website/AddWebsiteModal";
import EmailTable from "../Email/EmailTable";
import WebsiteTable from "../Website/WebsiteTable"
import { Tooltip } from "antd";
const OrganizationBoost = lazy(() =>
  import("./OrganizationBoost/OrganizationBoost")
);

const TabPane = StyledTabs.TabPane;

class OrganizationDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const {
      userDetails: { firstName },
      handleEmailModal,
      addEmailModal,
      addWebsiteModal,
      handleWebsiteModal
    } = this.props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
          
            {/* <TabPane
              tab={
                <>
                  <span>
                    <i className="fas fa-file-signature"></i>
                    &nbsp; Signature
                  </span>
                  {activeKey === "1" && <></>}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <SignatureView />
              </Suspense>
            </TabPane> */}
            <TabPane
              tab={
                <>
                  <span>
                    
                    Email
                  </span>
                  {activeKey === "2" && (
                    <>
                      <>
                       
                        <Tooltip title="Configure">
                          <AddIcon
                            fontSize="small"
                            onClick={() => this.props.handleEmailModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                        </Tooltip>
                      </>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmailTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                   
                    Website
                  </span>
                  {activeKey === "3" && (
                    <>
                      <>
                       
                          <Tooltip title="Configure">
                          <AddIcon
                            fontSize="small"
                            onClick={() =>  this.props.handleWebsiteModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                        </Tooltip>
                      </>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <WebsiteTable />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
        <AddEmailModal
          addEmailModal={addEmailModal}
          handleEmailModal={handleEmailModal}
        />
        <AddWebsiteModal
        addWebsiteModal={addWebsiteModal}
        handleWebsiteModal={handleWebsiteModal}
        />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ settings }) => ({
  addEmailModal: settings.addEmailModal,
  addWebsiteModal:settings.addWebsiteModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleEmailModal,
      handleWebsiteModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDetailTab);
