import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../../Components/Utils";
import AddIcon from '@mui/icons-material/Add';
import {
  handlePersonalModal,
  handleEmploymentModal,
  handleTrainingModal,
  handleBankModal,
  handleEducationModal,
  handlePersonalDetailsModal,
  handleSalaryModal,
  handleDocumentUploadModal,
  handleContractModal,
} from "../../../../../Profile/ProfileAction";
import AddPersonalModal from "./Personal/AddPersonalModal.jsx";
import AddEducationModal from "./Education/AddEducationModal.jsx";
import AddTrainingModal from "./Training/AddTrainingModal.jsx";
import AddEmploymentModal from "./Employment/AddEmploymentModal.jsx";
import AddBankModal from "./Bank/AddBankModal.jsx";
import PersonalDetailsTable from "./PersonalDetails/PersonalDetailsTable.jsx";
import AddPersonalDetailsModal from "./PersonalDetails/AddPersonalDetailsModal.jsx";
import AddSalaryModal from "./Salary/AddSalaryModal.jsx";
import SalaryTable from "./Salary/SalaryTable.jsx";
import AddContractModal from "./Contract/AddContractModal.jsx";
import ContractTable from "./Contract/ContractTable.jsx";
import CandidateTable from "../../../../../Candidate/Child/CandidateTable/CandidateTable.jsx";
// import OpportunityTable from "../../../../../Opportunity/Child/OpportunityTable/OpportunityTable";
import CustomerTable from "../../../../../Customer/Child/CustomerTable/CustomerTable.jsx";
import { Tooltip } from "antd";
//import PartnerTable from "../../../../../Partner/child/PartnerTable/PartnerTable"
//import RecruitmentTable from "../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentTable";
const BankTable = lazy(() => import("./Bank/BankTable.jsx"));
const EducationTable = lazy(() => import("./Education/EducationTable.jsx"));
const EmploymentTable = lazy(() => import("./Employment/EmploymentTable.jsx"));
const TrainingTable = lazy(() => import("./Training/TrainingTable.jsx"));
const PersonalTable2 = lazy(() => import("./Personal/PersonalTable2.jsx"));
const EmployeesNotes = lazy(() => import("./Notes/EmployeesNotes.jsx"));
const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments.jsx"));
const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal.jsx"));
const TabPane = StyledTabs.TabPane;

class EmployeeDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
componentDidMount(){
  
}
  handleTabChange = (key) => this.setState({ activeKey: key });

 
  render() {
    const { activeKey } = this.state;
    const {
      addEducationModal,
      handleEducationModal,
      addTrainingModal,
      handleTrainingModal,
      addEmploymentModal,
      handleEmploymentModal,
      addPersonalModal,
      handlePersonalModal,
      addPersonalDetailsModal,
      addSalaryModal,
      handlePersonalDetailsModal,
      handleSalaryModal,
      addBankModal,
      handleBankModal,
      handleDocumentUploadModal,
      documentUploadModal,
      addContractModal,
      handleContractModal,
    } = this.props;
    console.log(this.props.employeeId);

    console.log("sos", this.props.singleEmployee.suspendInd)
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                <i class="fa fa-graduation-cap"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                    
                    {/*&nbsp;{" "}*/}
                    <FormattedMessage
                      id="app.education"
                      defaultMessage="Education"
                    />
                  </span>
                  {activeKey === "1" && (
                    <>
                     <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handleEducationModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
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
                <EducationTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                  {/* <FontAwesomeIcon icon={solid('headphones')}/> */}
                  <span style={{ marginLeft: "0.25em" }}>
                    {/* Training */}
                    <FormattedMessage
                          id="app.training"
                          defaultMessage="Training"
                        />
                  </span>
                  {activeKey === "2" && (
                    <>
                       <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handleTrainingModal(true)}
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
                <TrainingTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  {/* <FontAwesomeIcon icon={solid('building-columns')}/> */}
                  <span style={{ marginLeft: "0.25em" }}>
                    
                    <FormattedMessage
                      id="app.employment"
                      defaultMessage="Employment"
                    />
                  </span>
                  {activeKey === "3" && (
                    <>
                      <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handleEmploymentModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
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
                <EmploymentTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                
                {/* <FontAwesomeIcon icon={solid('phone')} /> */}
                  <span style={{ marginLeft: "0.25em" }}>
                    
                    <FormattedMessage
                      id="app.emergency"
                      defaultMessage="Emergency"
                    />
                  </span>
                  {activeKey === "4" && (
                    <>
                     
                       <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handlePersonalModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <PersonalTable /> */}
                <PersonalTable2 />
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
                   {/*  &nbsp;*/} 
                  </span>
                  {activeKey === "5" && (
                    <>
                      
                        <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handleBankModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <BankTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <i class="fa fa-id-card" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                    {/* Personal Details */}
                    <FormattedMessage
                          id="app.personaldetails"
                          defaultMessage="Personal Details"
                        />
                   {/*  &nbsp; */} 
                    {/* <i className="fa fa-sticky-note" aria-hidden="true"></i>
                    &nbsp;Notes */}
                  </span>
                  {activeKey === "6" && (
                    <>
                     
                       <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handlePersonalDetailsModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PersonalDetailsTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <i className="fa fa-sticky-note" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                   {/* &nbsp; */} 
                   
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
                  </span>
                  {activeKey === "7" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add note"
                        handleIconClick={() => console.log("contact clicked")}
                        size="0.875em"
                        style={{ marginLeft: 10, verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeesNotes />
              </Suspense>
            </TabPane> 
       
     
            <TabPane
              tab={
                <>
                 <i class="fas fa-coins" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                    {/* Salary */}
                     <FormattedMessage
                          id="app.salary"
                          defaultMessage="Salary"
                        />
                   {/*&nbsp;*/} 
                  </span>
                  {activeKey === "8" && (
                    <>
                     
                       <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handleSalaryModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <SalaryTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                {/* <FontAwesomeIcon icon={solid('file')}/> */}
                  <span style={{ marginLeft: "0.25em" }}>
                    
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                  </span>
                  {activeKey === "9" && (
                    <>
                   
                      <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handleDocumentUploadModal(true)}
                            sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
                          />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="9"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <i class="fas fa-file-signature" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.1em" }}>
                    
                   
                    <FormattedMessage
                      id="app.contract"
                      defaultMessage="Contract"
                    />
                  </span>
                  {activeKey === "10" && (
                    <>
                  
                       <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                      <AddIcon
                            fontSize="small"
                            onClick={() => handleContractModal(true)}
                            sx={{ cursor: "pointer", verticalAlign: "middle" }}
                          />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="10"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ContractTable />
              </Suspense>
            </TabPane>
            
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
               <i class="fas fa-portrait" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                    
                   
                    <FormattedMessage
                      id="app.talent"
                      defaultMessage="Talent"
                    />
                  </span>
                  {activeKey === "11" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="11"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateTable />
              </Suspense>
            </TabPane>
                :null} 

              {this.props.singleEmployee.suspendInd?    
            <TabPane
              tab={
                <>
                 <i class="far fa-lightbulb" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                id="app.opportunity"
                defaultMessage="Opportunity"
              />
                  </span>
                  {activeKey === "12" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="12"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <OpportunityTable /> */}
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-building" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              />
                  </span>
                  {activeKey === "13" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="13"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CustomerTable />
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-address-card" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                  id="app.requirement"
                  defaultMessage="Requirement"
                />
                  </span>
                  {activeKey === "14" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="14"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <RecruitmentTable /> */}
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-handshake" aria-hidden="true"></i>
                  <span style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                id="app.vendor"
                defaultMessage="Vendor"
              />
                  </span>
                  {activeKey === "15" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="15"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <PartnerTable /> */}
              </Suspense>
            </TabPane>:null}
      
        
          </StyledTabs> 
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddEmploymentModal
            addEmploymentModal={addEmploymentModal}
            handleEmploymentModal={handleEmploymentModal}
          />
          <AddPersonalModal
            addPersonalModal={addPersonalModal}
            handlePersonalModal={handlePersonalModal}
          />
          <AddEducationModal
            addEducationModal={addEducationModal}
            handleEducationModal={handleEducationModal}
          />

          <AddTrainingModal
            addTrainingModal={addTrainingModal}
            handleTrainingModal={handleTrainingModal}
          />

          <AddBankModal
            addBankModal={addBankModal}
            handleBankModal={handleBankModal}
          />
          <AddPersonalDetailsModal
            addPersonalDetailsModal={addPersonalDetailsModal}
            handlePersonalDetailsModal={handlePersonalDetailsModal}
          />
          <AddSalaryModal
            addSalaryModal={addSalaryModal}
            handleSalaryModal={handleSalaryModal}
          />

          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddContractModal
            addContractModal={addContractModal}
            handleContractModal={handleContractModal}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ profile,employee }) => ({
  addEducationModal: profile.addEducationModal,
  addTrainingModal: profile.addTrainingModal,
  addEmploymentModal: profile.addEmploymentModal,
  addPersonalModal: profile.addPersonalModal,
  addBankModal: profile.addBankModal,
  addPersonalDetailsModal: profile.addPersonalDetailsModal,
  addSalaryModal: profile.addSalaryModal,
  documentUploadModal: profile.documentUploadModal,
  addContractModal: profile.addContractModal,
  singleEmployee:employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTrainingModal,
      handleEducationModal,
      handleEmploymentModal,
      handlePersonalModal,
      handleBankModal,
      handlePersonalDetailsModal,
      handleSalaryModal,
      handleDocumentUploadModal,
      handleContractModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailTab);
