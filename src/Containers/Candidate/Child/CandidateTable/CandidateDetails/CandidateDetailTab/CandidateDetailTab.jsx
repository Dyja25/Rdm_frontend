import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
import { BankOutlined ,CustomerServiceOutlined, PlusOutlined, TeamOutlined,AudioOutlined    } from "@ant-design/icons";
import { handleCandidateReactSpeechModal } from "../../../../CandidateAction";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";

import { handleCandidateEducationModal } from "../../../../CandidateAction";

import { handleDocumentUploadModal } from "../../../../CandidateAction";
import { handleCandidateTrainingModal } from "../../../../CandidateAction";
import {
  handleCandidateEmploymentModal,
  handleCandidateBankModal,
  handleCandidateActivityModal,
} from "../../../../CandidateAction";

import ReactCandidateSpeechModal from "../../ReactCandidateSpeechModal.jsx";

const LinkedDocuments = lazy(()=>import("./Document/LinkedDocuments.jsx"));

const AddDocumentModal = lazy(()=>import("./Document/AddDocumentModal.jsx"));
const CandidateEducationTable = lazy(()=>import("./Education/CandidateEducationTable.jsx"));
const AddCandidateEducationModal = lazy(()=>import("../CandidateDetailTab/Education/AddCandidateEducationModal.jsx"));
const AddCandidateTrainingModal =lazy(()=>import("../CandidateDetailTab/Training/AddCandidateTrainingModal.jsx"));
const CandidateTrainingTable =lazy(()=>import("./Training/CandidateTrainingTable.jsx"));
const AddCandidateEmploymentModal =lazy(()=>import("./Employment/AddCandidateEmploymentModal.jsx"));
const CandidateEmploymentTable =lazy(()=>import("./Employment/CandidateEmploymentTable.jsx"));
const AddBankModal =lazy(()=>import("./Bank/AddBankModal.jsx"));
const BankTable =lazy(()=>import("./Bank/BankTable.jsx"));
const PlacementTable =lazy(()=>import("./Placement/PlacementTable"));
const ActivityModal =lazy(()=>import("./Activity/ActivityModal.jsx"));
const ActivityTable = lazy(() => import("./Activity/ActivityTable.jsx"));
const LinkedNotes = lazy(() => import("./Notes/LinkedNotes.jsx"));

const TabPane = StyledTabs.TabPane;

class CandidateDetailTab extends Component {
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
      addingEmail,
      handleDocumentUploadModal,
      documentUploadModal,
      handleOpportunityModal,
      addOpportunityModal,
      addCandidateEducationModal,
      handleCandidateEducationModal,
      handleCandidateTrainingModal,
      addCandidateTrainingModal,
      handleCandidateEmploymentModal,
      addCandidateEmploymentModal,
      handleCandidateBankModal,
      addCandidateBankModal,
      handleCandidateActivityModal,
      addCandidateActivityModal,
      handleCandidateReactSpeechModal,
      addCandidateSpeechModal,
    } = this.props;
    console.log(this.props.candidateId);
    return (
      <>
        <TabsWrapper>
          <StyledTabs 
          activeKey={activeKey}
  onChange={this.handleTabChange}
  destroyInactiveTabPane
          >
           
            <TabPane
              tab={
                <>
                 
               <TeamOutlined />
                    <span style={{ marginLeft: "0.25em" }}>
                      {/* RecruitPro */}
                      <FormattedMessage
                                  id="app.recruitpro"
                                  defaultMessage="RecruitPro"
                                />
                      </span>
                  
                  {activeKey === "1" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleCandidateBankModal(true)}
                        size="1em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PlacementTable 
                />
               
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <>
                <FontAwesomeIcon icon={solid('arrow-trend-up')}/>                
                  <span style={{ marginLeft: "0.25em" }}>                  
                   Experience
                  </span>                 
                </>
              }
              key="9"
            >
              <ExperienceForm/>
            </TabPane> */}
            <TabPane
              tab={
                <>
                  <span>
                    <i class="fab fa-connectdevelop"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      {/* Activity */}
                      <FormattedMessage
                                  id="app.activity"
                                  defaultMessage="Activity"
                                />
                      </span>
                  </span>
                  {activeKey === "2" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Create"
                        onClick={() =>
                          handleCandidateActivityModal(true)
                        }
                        size="1em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ActivityTable 
                candidate={this.props.candidateId}
                />
              
              </Suspense>
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
                        tooltipTitle="Upload Document"
                        onClick={() => handleDocumentUploadModal(true)}
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
                   onClick={()=>handleCandidateReactSpeechModal(true)}>
               <AudioOutlined />
                  
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
                <LinkedNotes />{" "}
           
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <i class="fa fa-graduation-cap"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                    {/* Education */}
                    <FormattedMessage
                                  id="app.education"
                                  defaultMessage="Education"
                                />
                  </span>
                  {activeKey === "5" && (
                    <>
                      {addingEmail ? (
                        <></>
                      ) : (
                        <>
                          <PlusOutlined
                            type="plus"
                            tooltipTitle="Add"
                        onClick={() =>
                              handleCandidateEducationModal(true)
                            }
                            size="1em"
                            style={{
                              marginLeft: "0.3125em",
                              verticalAlign: "center",
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEducationTable />
              
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
             <BankOutlined />
                  <span style={{ }}>
                    {/* Employment */}
                     <FormattedMessage
                                  id="app.employment"
                                  defaultMessage="Employment"
                                />
                  </span>
                  {activeKey === "7" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() =>
                          handleCandidateEmploymentModal(true)
                        }
                        size="1em"
                        style={{ marginLeft: "0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEmploymentTable />
              
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                 <CustomerServiceOutlined />
                  <span style={{ marginLeft: "0.25em" }}>
                    {/* Training */}
                     <FormattedMessage
                                  id="app.training"
                                  defaultMessage="Training"
                                />
                  </span>
                  {activeKey === "6" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() =>
                          handleCandidateTrainingModal(true)
                        }
                        size="1em"
                        style={{ marginLeft:"0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateTrainingTable />
              </Suspense>
            </TabPane>

            
            
            <TabPane
              tab={
                <>
                <i class="fa fa-credit-card"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                     {/* Bank Details */}
                      <FormattedMessage
                                  id="app.bankDetails"
                                  defaultMessage="Bank Details"
                                />
                  </span>
                  {activeKey === "8" && (
                    <>
                  <Tooltip title="Add Bank Details" placement="left">
  <PlusOutlined onClick={() => handleCandidateBankModal(true)} />
</Tooltip>
                    </>
                  )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <BankTable />
              
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddCandidateEducationModal
            addCandidateEducationModal={addCandidateEducationModal}
            handleCandidateEducationModal={handleCandidateEducationModal}
          />
          <AddCandidateTrainingModal
            addCandidateTrainingModal={addCandidateTrainingModal}
            handleCandidateTrainingModal={handleCandidateTrainingModal}
          />
          <AddCandidateEmploymentModal
            addCandidateEmploymentModal={addCandidateEmploymentModal}
            handleCandidateEmploymentModal={handleCandidateEmploymentModal}
          />
          <AddBankModal
            addCandidateBankModal={addCandidateBankModal}
            handleCandidateBankModal={handleCandidateBankModal}
          />
          <ActivityModal
            addCandidateActivityModal={addCandidateActivityModal}
            handleCandidateActivityModal={handleCandidateActivityModal}
          />

      <ReactCandidateSpeechModal
          candidate={this.props.candidate}
          handleCandidateReactSpeechModal={handleCandidateReactSpeechModal}
          addCandidateSpeechModal={addCandidateSpeechModal}
          /> 
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ candidate }) => ({
  documentUploadModal: candidate.documentUploadModal,
  addCandidateEducationModal: candidate.addCandidateEducationModal,
  addCandidateTrainingModal: candidate.addCandidateTrainingModal,
  addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
  addCandidateBankModal: candidate.addCandidateBankModal,
  addCandidateActivityModal: candidate.addCandidateActivityModal,
  addCandidateSpeechModal:candidate.addCandidateSpeechModal,
  candidateId: candidate.candidateId,
  candidate: candidate.candidate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleCandidateEducationModal,
      handleCandidateTrainingModal,
      handleCandidateEmploymentModal,
      handleCandidateBankModal,
      handleCandidateActivityModal,
      handleCandidateReactSpeechModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetailTab);
