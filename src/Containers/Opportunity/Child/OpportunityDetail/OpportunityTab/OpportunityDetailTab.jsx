import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message, Tooltip, Popover } from "antd";
import { FormattedMessage } from "react-intl";

import {  StyledTabs } from "../../../../../Components/UI/Antd";
import {
  
  TabsWrapper,
} from "../../../../../Components/UI/Layout";


import { handleContactModal,handleLinkContactModal } from "../../../../Contact/ContactAction";
import RecruitmentClosedTable from "../OpportunityTab/RecruitmentClosedTable.jsx"
import {handleReactSpeechModal} from "../../../OpportunityAction"


import {
    getContactListByOpportunityId,
    clearReducerState,

  handleDocumentUploadModal,

     linkContactsCheckToOpportunity,
  handleRecruitModal,
  handleTagProfileModal,
  getRecruitByOpportunityId,
  
} from "../../../OpportunityAction";


import { BundleLoader } from "../../../../../Components/Placeholder";


import ReactSpeechModal from "./ReactSpeechModal.jsx";
import { TeamOutlined, LinkOutlined, LockOutlined,AudioOutlined, PieChartOutlined, PlusOutlined } from "@ant-design/icons";
 const RecruitmentTable = lazy(() => import("./Recruitment/RecruitmentTable.jsx"));
const AddRecruitModal = lazy(() => import("./Recruitment/AddRecruitModal.jsx"));
const AddTagProfileModal = lazy(() => import("./Recruitment/AddTagProfileModal.jsx"));
const RecruitProJumpstart = lazy(() => import("../../RecruitProJumpstart/RecruitProJumpStart.jsx"));
const SummaryTable = lazy(() => import("./Recruitment/SummaryTable.jsx"));
const LinkedNotes = lazy(() => import("./LinkedNotes.jsx"));
const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal.jsx"));
const LinkedContact = lazy(() => import("./LinkedContact.jsx"));
const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments.jsx"));

const AddContactModal = lazy(() => import("../../../../Contact/Child/AddContactModal.jsx"));
const LinkContactModal = lazy(() => import("../../../../Contact/Child/LinkContactModal.jsx"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class OpportunityDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      closedPopover:false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      recruitmentboard:false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }

  handleRecriutmentdashboard = () => {
    this.setState({ 
      recriutmentdashboard: true,
      breadCumb:false,
      closedPopover:false
     });

    console.log(this.state.breadCumb);
  };
  // handleRecriutmenthboard = () => {
  //   this.setState({ recriutmentdashboard: true });

  //   console.log(this.state.breadCumb);
  // };

  handleRecruitClick = () => {
    this.setState({ 
      closedPopover:false,
      breadCumb:true,
      recriutmentdashboard: false,
     });
  };

  // componentDidMount() {
  //   this.props.getContactListByOpportunityId(
  //     this.props.opportunity.opportunityId
  //   );
  //   this.props.getRecruitByOpportunityId(this.props.opportunity.opportunityId);
  // }

  componentWillUnmount() {
    this.props.clearReducerState();
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
    handleClosedPopoverVisibleChange = () =>
    this.setState({ 
      closedPopover: true,
      recriutmentdashboard:false,
      breadCumb:false
     });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
    // if (key === "1") {
    //   this.props.getQuotation(this.props.opportunity.opportunityId);
    // }
  };
  render() {
    const { activeKey } = this.state;
    const {
      user: {
        metaData: { productStatus },
      },
      opportunity: { opportunityId, opportunityName, accountId },
      user,
      fetchingOpportunityDetailsById,
      partnerLogin,
      department,
      addContactModal,
      handleContactModal,
      getTimeLineDataByOpportunityId,
      addCallModal,
      linkContactsCheckToOpportunity,
      getProductsByOpportunityId,
      productsByOpportunityId,
      handleLinkPartnerModal,
      addLinkPartnerModal,
      handleCallModal,
      addEventModal,
      handleEventModal,
      addTaskModal,
      handleTaskModal,
      getContactListByOpportunityId,
      getEventsListByOpportunityId,
      getCallsListByOpportunityId,
      getTasksListByOpportunityId,
      handleLinkContactModal,
      linkContactsToOpportunity,
      handleDocumentUploadModal,
      handleLinkConfigureModal,
      addLinkConfigureModal,
      handleTagProfileModal,
      addTagProfileModal,
      linkDeliveryModal,
      handleReactSpeechModal,
      linkServiceModal,
      handleLinkServiceModal,
      handleLinkDeliveryModal,
      subscriptionType,
      opportunity,
      addSpeechModal,
      documentUploadModal,
    } = this.props;
    // alert("detailsTab",opportunityId);
    const { deliveryInd, stageName } = this.props;
    if(fetchingOpportunityDetailsById){
return  <BundleLoader />
    }
    return (
      <>
        {/* <OpportunityStatsCard opportunity={opportunity} /> */}
        <TabsWrapper style={{height:"80vh"}}>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
              <TeamOutlined />
                    <span style={{ marginLeft: '0.25em' }}>
                      {/* RecruitPro */}
                      <FormattedMessage
                            id="app.recruitpro"
                            defaultMessage="RecruitPro"
                          />
                      </span>
                  </span>
                  {activeKey === "1" && (
                    <>

                      <>
                     
                        <Tooltip title="Add Requirement">
                        {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                          <PlusOutlined
                            type="plus"
                            tooltipTitle="Add Requirement"
                            onClick={() =>
                              this.props.handleRecruitModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />
                        )}
                          </Tooltip>
                        
                        {/* <Tooltip //title="Tag Position"
                          title={<FormattedMessage
                            id="app.tagposition"
                            defaultMessage="Tag Position"
                          />}

                        >
                           {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                          <Icon
                            type="link"
                            onClick={() => {
                              this.handlepartnerPopoverVisibleChange();
                              handleTagProfileModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "-5px",
                              verticalAlign: "center",
                            }}
                          />
                           )}
                        </Tooltip> */}

                        <Tooltip title="Summary">
                      <span
                       style={{marginLeft:"-4px"}}
                          type="area-chart"
                          // tooltipTitle="Summary"
                          onClick={() => {
                            this.handleRecriutmentdashboard();
                          }}
                          size="0.875em"                         
                          >
                       
                          {/* <FontAwesomeIcon icon={solid("chart-pie")} /> */}
                          <PieChartOutlined/>
                          </span>
                        </Tooltip>

                        <Tooltip title="Close">
                         <span
                     
                      style={{marginLeft:"4px"}}
                          type="area-chart"
                          // tooltipTitle="Summary"
                          onClick={() => {
                            this.handleClosedPopoverVisibleChange();
                          }}
                          size="0.8em"                         
                          >
                             {/* <FontAwesomeIcon icon={solid("lock")} /> */}
                             <LockOutlined/>
                    
                          
                          </span>
                      
                        </Tooltip>
                      
                       
                      </>
                  
                    </>
                  )}
                </>
              }
              key="1"
            >
               
              {this.state.recriutmentdashboard ? (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  <RecruitProJumpstart />
                  <SummaryTable />
                 
                </Suspense>
              ) :this.state.closedPopover ? 
              (
                <Suspense fallback={"Loading ..."}>
                <RecruitmentClosedTable  opportunityId={opportunityId}/>
               
                </Suspense>
              ):(
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <RecruitmentTable  opportunityId={opportunityId}/>
              
                    
                  </Suspense>
                  
                )}
                  
            </TabPane>
             <TabPane
              tab={
                <>
                  <span>
                    {/* <Icon type="user" /> */}
                    <i class="far fa-address-card"></i>
                    <span style={{ marginLeft: '0.25em' }}>
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contacts"
                      />
                      {/* Contacts */}
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
                      <Tooltip //title="Create"
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                         {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Create"
                          onClick={() => {
                            this.handleContactPopoverVisibleChange();
                            handleContactModal(true);
                          }}
                          size="0.875em"
                          style={{ verticalAlign: "center", marginLeft: "0.125em" }}
                        />
                         )}
                         
                      </Tooltip>
                      <Tooltip //title="Tag Position"
                          title={<FormattedMessage
                            id="app.tagexisting"
                            defaultMessage="Tag Existing"
                          />}
                      >
                        <LinkOutlined
                            type="link"
                            onClick={() => {
                              this.handleContactPopoverVisibleChange();
                              handleLinkContactModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "-0.31em",
                              verticalAlign: "center",
                            }}
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
                  <i class="far fa-file-alt"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.documents"
                        defaultMessage="Documents"
                      />
                      {/* Documents */}

                    

                  </span>
                  {activeKey === "3" && (
                    <>


                      <Tooltip //title="Upload Document"
                        title={<FormattedMessage
                          id="app.uploaddocument"
                          defaultMessage="Upload Document"
                        />}
                      >
                        <PlusOutlined
                          type="plus"
                          //tooltipTitle="Upload Document"
                          tooltiptitle={<FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />}
                          onClick={() =>
                            handleDocumentUploadModal(true)
                          }
                          size="0.875em"
                          style={{ marginLeft: "0.25em", verticalAlign: "center" }}
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
                <LinkedDocuments opportunity={opportunity} />
              
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
                   onClick={()=>handleReactSpeechModal(true)}>
                  {/* <FontAwesomeIcon
                   icon={solid("microphone")}/> */}
                   <AudioOutlined />
                  
                  </span>
                  </Tooltip>
                  </>
                    )}
                  </span>
                  
                  {/* <Tooltip title="Add">
                        {user.userType !== "USER" && user.department !== "Notes" && ( 
                          <Icon
                            type="plus"
                            tooltipTitle="Add"
                            onClick={() =>
                              this.props.handleRecruitModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />
                        )}
                          </Tooltip>
                   */}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedNotes />
            
              </Suspense>
            </TabPane>

           

            
            {/* )} */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>

           <AddRecruitModal
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
          />
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
          />

          <AddContactModal
            addContactModal={addContactModal}
            handleContactModal={handleContactModal}
            callback={() => getContactListByOpportunityId(opportunityId)}
            linkContact
          />

          <LinkContactModal
            opportunityId={{ value: opportunityId }}
            linkAction={linkContactsToOpportunity}
            linkContactsCheckToOpportunity={linkContactsCheckToOpportunity}
            defaultOpportunities={[
              { label: opportunityName, value: opportunityId },
            ]}
            linkType="opportunity"
          />

          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <ReactSpeechModal
          opportunityId={opportunityId}
          handleReactSpeechModal={handleReactSpeechModal}
          addSpeechModal={addSpeechModal}
          /> 
      
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  auth,
  contact,
  account,
  opportunity,
  call,
  event,
  task,
  partner,
  customeField,
}) => ({
  fetchingOpportunityDetailsById:opportunity.fetchingOpportunityDetailsById,
 
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  // refreshedData: opportunity.refreshedData,
  opportunityId: opportunity.opportunity.opportunityId,
  // organizationId: auth.userDetails.organizationId,
  opportunity: opportunity.opportunity,

  addContactModal: contact.addContactModal,
  linkContactModal:contact.linkContactModal,
  addSpeechModal:opportunity.addSpeechModal, 
  addRecruitModal: opportunity.addRecruitModal,
  addTagProfileModal: opportunity.addTagProfileModal,
 
  documentUploadModal: opportunity.documentUploadModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearReducerState,
      handleContactModal,
      handleLinkContactModal,
      handleReactSpeechModal,
      handleDocumentUploadModal,

      getContactListByOpportunityId,
    
       linkContactsCheckToOpportunity,
      handleRecruitModal,
      handleTagProfileModal,
      getRecruitByOpportunityId,
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailTab);
