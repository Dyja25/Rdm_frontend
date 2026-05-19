import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip } from "antd";
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from "react-intl";
import MicIcon from '@mui/icons-material/Mic';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../Components/Utils";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import {
  handleDocumentUploadModal,
  getContactListByCustomerId,
  getOpportunityListByCustomerId,
  handleCustomerOpportunityModal,
  handleCustomerContactModal,
  //handleCustomerCommercialsModal,
  handleRecruitModal,
  handlefileRecruitModal,
  handleTagProfileModal,
  handleInvoiceModal,
  handleCustomerReactSpeechModal
} from "../../../CustomerAction";
import ReactCustomerSpeechModal from "../ReactCustomerSpeechModal"
import CommercialsForm from "./Commercials/CommercialsForm";
import RecruitmentFileTable from "./Recruitment/Child/RecruitmentFileTable";
const LinkedDocuments=lazy(()=> import("./Document/LinkedDocuments.jsx"));
const AddDocumentModal=lazy(()=> import("./Document/AddDocumentModal.jsx"));
const AddCustomerContactModal=lazy(()=> import("./ContactTab/AddCustomerContactModal.jsx"));
const AddCustomerOpportunityModal=lazy(()=> import("./OpportunityTab/AddCustomerOpportunityModal.jsx"));
const LinkedNotes=lazy(()=> import("./Notes/LinkedNotes.jsx"));
const LinkedOpportunity=lazy(()=> import("./OpportunityTab/LinkedOpportunity.jsx"));
const LinkedContact=lazy(()=> import("./ContactTab/LinkedContact.jsx"));
const RecruitmentTable=lazy(()=> import("./Recruitment/RecruitmentTable.jsx"));
const RecruitProJumpstart=lazy(()=> import("../../RecruitProJumpstart/RecruitProJumpstart.jsx"));
const SummaryTable=lazy(()=> import("./Recruitment/Child/SummaryTable.jsx"));
const AddRecruitModal=lazy(()=> import("./Recruitment/AddRecruitModal.jsx"));
const AddFileRecruitModal=lazy(()=> import("./Recruitment/Child/AddFileRecruitModal.jsx"));
const AddTagProfileModal=lazy(()=> import("./Recruitment/AddTagProfileModal.jsx"));
const AddInvoiceModal=lazy(()=> import("./Invoice/AddInvoiceModal.jsx"));
const LinkedInvoice = lazy(()=> import("./Invoice/LinkedInvoice.jsx"));
const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
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
      file:false,
    };
  }
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ file: true });
  };

  componentDidMount() {
    this.props.getContactListByCustomerId(
      this.props.customer.customerId
    );
  }

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
      customer: { customerId, name },
      handleDocumentUploadModal,
      documentUploadModal,
      handleCustomerReactSpeechModal,
      addCustomerSpeechModal,
      handleCustomerContactModal,
      // ComhandleCustomermercialsModal,
      addCustomerContactModal,
      handleCustomerOpportunityModal,
      addCustomerOpportunityModal,
      getContactListByCustomerId,
      getOpportunityListByCustomerId,
      handleTagProfileModal,
      addInvoiceModal,
      handleInvoiceModal
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
          <TabPane
              tab={
                <>
                  <span>
                    {/* <Icon type="user" /> */}
                    <i class="far fa-lightbulb"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.opportunity"
                        defaultMessage="Opportunity"
                      />
                      {/* Opportunity */}
                    </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip //title="Create"
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                         {this.props.user.opportunityCreateInd ===true && (
                     
                       
                          <AddIcon
                            fontSize="small"
                            onClick={() => handleCustomerOpportunityModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                      
                        )} 
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedOpportunity />
              </Suspense>
            </TabPane>
          <TabPane
              tab={
                <>
                  <span>
                    {/* <Icon type="user" /> */}
                    <i class="far fa-address-card"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      {/* Contacts */}
                      <FormattedMessage
                      id="app.contact"
                      defaultMessage="Contacts"
                    />
                      
                      </span>
                  </span>
                  {activeKey === "2" && (
                    <>
                      {/* {this.props.partnerLogin === "Yes" &&
                        this.props.department === "Partner" ? null : ( */}
                      {/* <Tooltip title="Tag Existing">
                        
                        <ActionIcon
                          type="link"
                          tooltipTitle="Tag Existing"
                          // onClick={() => {
                          //   this.handleContactPopoverVisibleChange();
                          //   handleLinkContactModal(true);
                          // }}
                          size="0.875em"
                          style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                        />
                        </Tooltip> */}
                      {/* )} */}
                      
                      &nbsp;
                      <Tooltip //title="Create"
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      
                         <AddIcon
                            fontSize="small"
                            onClick={() => handleCustomerContactModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContact />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    {/* <Icon type="user" /> */}
                    <i class="fas fa-print"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.recruitpro"
                        defaultMessage="RecruitPro"
                      />
                      {/* RecruitPro */}
                    </span>
                  </span>

                  {activeKey === "3" && (
                    <>
                      <>
                        <Tooltip //title="Create"
                          title={
                            <FormattedMessage
                              id="app.addrequirement"
                              defaultMessage="Add Requirement"
                            />
                          }
                        ></Tooltip>
                        {/* <Tooltip //title="Tag Position"
                          title={<FormattedMessage
                            id="app.tagposition"
                            defaultMessage="Tag Position"
                          />}

                        >
                          <Icon
                            type="link"
                            onClick={() => {
                              this.handlepartnerPopoverVisibleChange();
                              handleTagProfileModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "-0.31em",
                              verticalAlign: "center",
                            }}
                          />
                        </Tooltip> */}

                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.summary"
                              defaultMessage="Summary"
                            />
                          }
                        >
                          <span
                            type="area-chart"
                            // tooltipTitle="Summary"
                            onClick={() => {
                              this.handleRecriutmentdashboard();
                            }}
                            size="0.875em"
                          >
                            {/* <PieChartIcon 
                            // icon={solid("chart-pie")}
                             /> */}
                          </span>
                        </Tooltip>
                      </>
                    </>
                  )}
                </>
              }
              key="3"
            >
              {/* {this.state.recriutmentdashboard ? (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  <RecruitProJumpstart />
                  <SummaryTable />
                </Suspense>
              ) : this.state.file ? (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  <RecruitmentFileTable />
                </Suspense>
              ) : (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  <RecruitmentTable />
                </Suspense>
              )} */}
                 <RecruitmentTable />
            </TabPane>
            {/* <TabPane
              tab={
                <>    
                <FontAwesomeIcon icon={solid('file-invoice-dollar')} />            
                  <span style={{ marginLeft: "0.25em" }}>
                   Commercials
                  </span>                 
                </>
              }
              key="9"
            >
              <CommercialsForm/>
            
            </TabPane> */}
          
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
                  {activeKey === "5" && (
                    <>
                  
                       <AddIcon
                            fontSize="small"
                            onClick={() => handleDocumentUploadModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments />
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                <i className="fa fa-sticky-note" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                    
                 
                    <FormattedMessage
                      id="app.notes"
                      defaultMessage="Notes"
                    />
                   
                  </span>
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedNotes />
              </Suspense>
            </TabPane> */}
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
                    {activeKey === "6" && (
                      <>
                      
                        <Tooltip title="Voice to Text">
                      <span                       
                    onClick={()=>handleCustomerReactSpeechModal(true)}
                   >
                    <MicIcon/>
        
                  </span>
                  </Tooltip>
                  </>
                    )}
                  </span>
                  
                 
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedNotes />
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <i class="far fa-file-alt"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                   {<FormattedMessage
                          id="app.invoice"
                          defaultMessage="Invoice"
                        />}
                  
                  </span>
                  {activeKey === "7" && (
                    <>
                      <ActionIcon
                        type="plus"
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                        handleIconClick={() => handleInvoiceModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedInvoice/>
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>

        <AddRecruitModal
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
          />

{/* <AddFileRecruitModal
            addFileRecruitModal={this.props.addFileRecruitModal}
            handlefileRecruitModal={this.props.handlefileRecruitModal}
          /> */}
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
          />

          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />

          <AddCustomerContactModal
            addCustomerContactModal={addCustomerContactModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            callback={() => getContactListByCustomerId(customerId)}
          />

      {/* <AddCustomerCommercialsModal
            addCustomerCommercialsModal={addCustomerCommercialsModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            callback={() => getCommercialsListByCustomerId(customerId)}
          /> */}
          <AddInvoiceModal
          addInvoiceModal={addInvoiceModal}
          handleInvoiceModal={handleInvoiceModal}
          />
             <ReactCustomerSpeechModal
           customerId={ customerId }
           handleCustomerReactSpeechModal={handleCustomerReactSpeechModal}
          addCustomerSpeechModal={addCustomerSpeechModal}
          />
          <AddCustomerOpportunityModal
            addCustomerOpportunityModal={addCustomerOpportunityModal}
            handleCustomerOpportunityModal={handleCustomerOpportunityModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            callback={() => getOpportunityListByCustomerId(customerId)}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  documentUploadModal: customer.documentUploadModal,
  addCustomerContactModal: customer.addCustomerContactModal,
  addCustomerOpportunityModal: customer.addCustomerOpportunityModal,
  customerId: customer.customer.customerId,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  addCustomerSpeechModal:customer.addCustomerSpeechModal,
  customer:customer.customer,
  addRecruitModal: customer.addRecruitModal,
  addFileRecruitModal:customer.addFileRecruitModal,
  addTagProfileModal: customer.addTagProfileModal,
  addInvoiceModal:customer.addInvoiceModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleCustomerContactModal,
      handleCustomerOpportunityModal,
      getContactListByCustomerId,
      getOpportunityListByCustomerId,
      handleRecruitModal,
      handlefileRecruitModal,
      handleTagProfileModal,
      handleInvoiceModal,
      handleCustomerReactSpeechModal
      //handleCustomerCommercialsModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);
