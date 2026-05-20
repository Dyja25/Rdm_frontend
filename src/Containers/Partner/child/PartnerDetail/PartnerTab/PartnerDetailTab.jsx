import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handlePartnerReactSpeechModal } from "../../../PartnerAction";
import {  Tooltip } from "antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { FormattedMessage, IntlProvider } from "react-intl";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import MicIcon from '@mui/icons-material/Mic';

import {
  handleDocumentUploadModal,
  getContactListByPartnerId,
  getOpportunityListByPartnerId,
} from "../../../PartnerAction";

import LinkedDocuments from "./DocumentTab/LinkedDocuments.jsx";
import AddDocumentModal from "./DocumentTab/AddDocumentModal.jsx";
import { handlePartnerContactModal } from "../../../PartnerAction";
import { handlePartnerOpportunityModal } from "../../../PartnerAction";
import AddPartnerContactModal from "./ContactTab/AddPartnerContactModal";

import LinkedPartnerNotes from "./NotesTab/LinkedPartnerNotes.jsx";

import LinkedPartnerContact from "./ContactTab/LinkedPartnerContact.jsx";
import CommercialsForm from "./Commercials/CommercialsForm.jsx";
import ReactPartnerSpeechModal from "../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/ReactPartnerSpeechModal.jsx";

import { DollarOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";

const TabPane = StyledTabs.TabPane;

class ContactDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ recriutmentdashboard: false });
  };

  componentWillUnmount() {
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
    // if (key === "1") {
    //   this.props.getQuotation(this.props.opportunity.opportunityId);
    // }
  };
  render() {
    const { activeKey } = this.state;
    const {
      partner: { partnerId, partnerName },
      handleDocumentUploadModal,
      documentUploadModal,
      user,
      handlePartnerContactModal,
      addPartnerContactModal,
      handlePartnerOpportunityModal,
      addPartnerOpportunityModal,
      getContactListByPartnerId,
      addPartnerSpeechModal,
      getOpportunityListByPartnerId,
      handlePartnerReactSpeechModal,
    } = this.props;
    console.log(partnerId);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            
          <TabPane
              tab={
                <>
                  <span>
                    {/* <Icon type="user" /> */}
                    <i class="far fa-address-card"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                              id="app.contact"
                              defaultMessage="Contacts"
                            />
                      </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      {/*&nbsp;*/}
                     
                      <Tooltip title="Create">
                        <PlusOutlined
                          onClick={() => {
                            handlePartnerContactModal(true);
                          }}
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
                        />
                     
                    
                      </Tooltip>
                    
                     
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedPartnerContact partnerId={partnerId} />
            
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>  
                <DollarOutlined/>
                  {/* <FontAwesomeIcon icon={solid('file-invoice-dollar')} />               */}
                  <span style={{ marginLeft: "0.25em" }}>                  
                   {/* Commercials */}
                   <FormattedMessage
                              id="app.commercials"
                              defaultMessage="Commercials"
                            />
                  </span>                 
                </>
              }
              key="2"
            >
             <CommercialsForm/>
             
            </TabPane>
            <TabPane
              tab={
                <>
                   <i class="far fa-file-alt"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                    {/* Documents */}
                    <FormattedMessage
                            id="app.documents"
                            defaultMessage="Documents"
                          />
                  </span>
                  {activeKey === "3" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        // tooltipTitle="Upload Document"
                        tooltipTitle={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
            onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{ marginLeft: "5px", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
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
                    {activeKey === "4" && (
                      <>
                      
                        {/* <ActionIcon
                          type="phone"
                          tooltipTitle="Speech"
                          // tooltiptitle={<FormattedMessage
                          //   id="app.uploaddocument"
                          //   defaultMessage="Upload Document"
                          // />}
                          onClick={() =>
                            handleReactSpeechModal(true)
                          }                          
                        /> */}
                        <Tooltip title="Voice to Text">
                      <span                       
                   >
                  {/* <FontAwesomeIcon
                   icon={solid("microphone")}/> */}
                   <MicIcon
                   onClick={()=>handlePartnerReactSpeechModal(true)}
                   />
                  
                  </span>
                  </Tooltip>
                  </>
                    )}
                    </span>
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                <LinkedPartnerNotes />{" "}
            
              </Suspense>
            </TabPane>


          
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
           
          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />

          <AddPartnerContactModal
            addPartnerContactModal={addPartnerContactModal}
            handlePartnerContactModal={handlePartnerContactModal}
            defaultPartners={[{ label: partnerName, value: partnerId }]}
            partnerId={{ value: partnerId }}
            callback={() => getContactListByPartnerId(partnerId)}
          />
          <ReactPartnerSpeechModal
          partnerId={partnerId}
          handlePartnerReactSpeechModal={handlePartnerReactSpeechModal}
          addPartnerSpeechModal={addPartnerSpeechModal}
          />

        
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ partner, opportunity }) => ({
  documentUploadModal: partner.documentUploadModal,
  addPartnerContactModal: partner.addPartnerContactModal,
  addPartnerOpportunityModal: partner.addPartnerOpportunityModal,
  partnerId: partner.partnerId,
  addPartnerSpeechModal:partner.addPartnerSpeechModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handlePartnerContactModal,
      handlePartnerOpportunityModal,
      getContactListByPartnerId,
      getOpportunityListByPartnerId,
      handlePartnerReactSpeechModal,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);
