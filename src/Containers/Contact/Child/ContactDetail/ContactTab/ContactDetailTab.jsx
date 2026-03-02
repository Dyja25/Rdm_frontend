import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FormattedMessage } from "react-intl";
import {  Tooltip } from "antd";
import ReactContactSpeechModal from "../ReactContactSpeechModal.jsx"
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";

import { handleDocumentUploadModal } from "../../../ContactAction";
import LinkedDocuments from "./Document/LinkedDocuments.jsx";
import AddDocumentModal from "./Document/AddDocumentModal.jsx";
import LinkedContactNotes from "./LinkedContactNotes.jsx";
import OpportunityTable from "./Opportunity/LinkedOpportunity.jsx";
import { handleContactOpportunityModal,handleContactReactSpeechModal } from "../../../ContactAction";
import AddContactOpportunityModal from "../../../Child/ContactDetail/ContactTab/Opportunity/AddContactOpportunityModal.jsx";
import { getOpportunityListByContactId } from "../../../ContactAction";
import { PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import MicIcon from '@mui/icons-material/Mic';

const TabPane = StyledTabs.TabPane;

class ContactDetailTab extends Component {
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
      contact: { contactId, firstName, middleName, lastName },
      handleDocumentUploadModal,
      documentUploadModal,
      handleContactOpportunityModal,
      addContactOpportunityModal,
      handleContactReactSpeechModal,
      addContactSpeechModal,
      getOpportunityListByContactId,
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <i class="far fa-file-alt"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                   
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                    {/* Documents */}
                  </span>
                  {activeKey === "1" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        // tooltipTitle="Upload Document"
                        tooltiptitle={<FormattedMessage
                          id="app.uploaddocument"
                          defaultMessage="Upload Document"
                        />}
                    onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments />
              </Suspense>
            </TabPane>
          
             <TabPane
              tab={
                <>
                  <span>
                    <i className="fa fa-sticky-note" aria-hidden="true"></i>
                    &nbsp;
                    <FormattedMessage
                      id="app.notes"
                      defaultMessage="Notes"
                    />
                    &nbsp;
                    {activeKey === "2" && (
                      <>
                      
                        <Tooltip title="Voice to Text">
                      <span                       
                    onClick={()=>handleContactReactSpeechModal(true)}
                   >
                 
                   <MicIcon/>
                  
                  </span>
                  </Tooltip>
                  </>
                    )}
                  </span>
                  
                 
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContactNotes />
             
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                 
                    <i className="far fa-lightbulb" aria-hidden="true"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                     <FormattedMessage
                      id="app.opportunity"
                      defaultMessage="Opportunity"
                    />
                    {/* Opportunity */}
                  </span>
                  {activeKey === "3" && (
                    <>
                      <Tooltip //title="Create"
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                        <PlusOutlined
                          type="plus"
                          //tooltipTitle="Create"
                          tooltiptitle={<FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />}
                          onClick={() => {
                            handleContactOpportunityModal(true);
                          }}
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "0.25em" }}
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <OpportunityTable />
             
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddContactOpportunityModal
            addContactOpportunityModal={addContactOpportunityModal}
            handleContactOpportunityModal={handleContactOpportunityModal}
            defaultContacts={[
              {
                label: `${firstName || ""} ${middleName || ""} ${lastName ||
                  ""}`,
                value: contactId,
              },
            ]}
            contactId={{ value: contactId }}
            callback={() => getOpportunityListByContactId(contactId)}
          />
           <ReactContactSpeechModal
           contactId={ contactId }
          handleContactReactSpeechModal={handleContactReactSpeechModal}
          addContactSpeechModal={addContactSpeechModal}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ contact }) => ({
  addContactSpeechModal:contact.addContactSpeechModal,
  documentUploadModal: contact.documentUploadModal,
  addContactOpportunityModal: contact.addContactOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleContactOpportunityModal,
      getOpportunityListByContactId,
      handleContactReactSpeechModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);
