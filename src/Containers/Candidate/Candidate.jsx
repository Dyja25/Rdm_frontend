import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CandidateBlackListTable from "../Candidate/CandidateBlackListTable.jsx"

import { BundleLoader } from "../../Components/Placeholder";
 import AddCandidateResumeModal from "../Candidate/Child/AddCandidateResumeModal.jsx";
import CandidateWhiteTable from "../Candidate/Child/CandidateWhiteTable.jsx";
import CandidateBlueTable from "../Candidate/Child/CandidateBlueTable.jsx";

import {
  handleCandidateModal,
  handleCandidateResumeModal,
  getCandidateListByUserId,
  setCandidateViewType,
  handleCandidateFilterModal,
  getCandidatePagination,
  shareCandidatePermission,
  emptyCandidate,
  getCandidateWhitePagination,
  getCandidateBluePagination
  
} from "./CandidateAction";
import AddCandidateFilterModal from "../Candidate/Child/AddCandidateFilterModal.jsx"

import CandidateDeletedTable from "../Candidate/Child/CandidateDeletedTable.jsx";
const AddCandidateModal = lazy(() => import("./Child/AddCandidateModal.jsx"));
const CandidateHeader = lazy(() => import("./Child/CandidateHeader.jsx"));
const CandidateTable = lazy(() =>
  import("./Child/CandidateTable/CandidateTable.jsx")
);
const CandidateCardView = lazy(() =>
  import("./CandidateCardView.jsx")
);


class Candidate extends Component {
  state = { currentData: undefined,responseData:null,text:undefined,currentSkillData: "",
    currentUser:this.props.fullName || "all" };
  
  handleResponseData=(data)=>{
    this.setState({responseData:data})
  }

  handleClear = (value) => {
    this.setState({ currentData: undefined ,});
    this.props.emptyCandidate();
    this.props.getCandidateListByUserId(this.state.currentUser?this.props.userId:this.props.userId,0);
  };

  setCurrentData = (e) => {
      const value = e.target.value.trim();
  this.setState({ currentData: value });
  };
   handleDropChange=(value)=>{
    this.setState({ currentUser: value });
    
    if(this.props.viewType === "table"){
      this.props.getCandidatePagination(value,0 );
    }
    
   if(this.props.viewType === "list"){
    this.props.getCandidateWhitePagination("white",value,0 );
 

  }

  if(this.props.viewType === "dashboard"){
    this.props.getCandidateBluePagination("blue",value,0 );
 

  }
    
    console.log("valid",value)
  }


  handleSkillClear = () => {
    this.setState({ currentSkillData: "" });
    this.props.getCandidateListByUserId(this.props.userId,0);
  };
  handleChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  setCurrentSkillData = (value) => {
    this.setState({ currentSkillData: value });
  };
  
  render() {
    console.log("candidadte render")
    const {
      addCandidateModal,
      addCandidateResumeModal,
      addCandidateFilterModal,
      handleCandidateModal,
      handleCandidateResumeModal,
      handleCandidateFilterModal,
      handleContactDrawer,
      viewType,
      setCandidateViewType,
      contacts,
      fetchingContacts,
    } = this.props;
    console.log("crest",this.props.value);
    return (
      <React.Fragment>
        <CandidateHeader
          viewType={viewType}
   handleDropChange={this.handleDropChange}
   currentUser={this.state.currentUser}
   fullName={this.props.fullName}
          setCandidateViewType={setCandidateViewType}
          handleCandidateModal={handleCandidateModal}
          handleCandidateResumeModal={handleCandidateResumeModal}
          handleCandidateFilterModal={handleCandidateFilterModal}
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          text={this.state.text}
          setCurrentData={this.setCurrentData}
          handleSkillClear={this.handleClear}
          currentSkillData={this.state.currentSkillData}
          setCurrentSkillData={this.setCurrentSkillData}
        />

        <AddCandidateModal
          addCandidateModal={addCandidateModal}
          handleCandidateModal={handleCandidateModal}
         
          responseData={this.state.responseData}
        />
         <AddCandidateResumeModal
          addCandidateResumeModal={addCandidateResumeModal}
          handleCandidateResumeModal={handleCandidateResumeModal}
          handleResponseData={this.handleResponseData}
          responseData={this.state.responseData}
        />
         <AddCandidateFilterModal
          addCandidateFilterModal={addCandidateFilterModal}
          handleCandidateFilterModal={handleCandidateFilterModal}
          // handleResponseData={this.handleResponseData}
          // responseData={this.state.responseData}
        />
 
 <Suspense fallback={<BundleLoader />}>
        {this.props.viewType === "table" ?
          <CandidateTable
          handleResponseData={this.handleResponseData}
          responseData={this.state.responseData}
          currentUser={this.state.currentUser}
          /> :
         this.props.viewType === "list" ?
         <CandidateWhiteTable
         currentUser={this.state.currentUser}
         /> :
          this.props.viewType === "dashboard" ?
          <CandidateBlueTable
          currentUser={this.state.currentUser}
          /> :
          this.props.viewType==="black"?
          <CandidateBlackListTable/>:
          this.props.viewType==="card"?
          <CandidateCardView/>:
          this.props.viewType === "map" ?
          <CandidateDeletedTable/> :
            null}
        </Suspense>

      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ candidate, account, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addCandidateModal: candidate.addCandidateModal,
  addCandidateResumeModal:candidate.addCandidateResumeModal,
  viewType: candidate.viewType,
  addCandidateFilterModal:candidate.addCandidateFilterModal,
  // fetchingContacts: contact.fetchingContacts,
  // contacts: contactsSelector(contact, account),
  fullName:(auth.userDetails.fullName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCandidateFilterModal,
      // emptyContactData,
      // getContactsForLazyLoading,
      handleCandidateModal,
      handleCandidateResumeModal,
      getCandidateListByUserId,
      shareCandidatePermission,
      setCandidateViewType,
      getCandidatePagination,
      emptyCandidate,
      getCandidateWhitePagination,
      getCandidateBluePagination
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Candidate);
