import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import PartnerHeader from "./child/PartnerHeader.jsx";
import PartnerDeletedTable from "./child/PartnerTable/PartnerDeletedTable.jsx";
import { handlePartnerModal,emptyPartner,getPartnerListByUserId, sharePartnerPermission,
  getPartnerPagination,setPartnerViewType } from "./PartnerAction";
const AddPartnerModal=lazy(()=>import("./child/AddPartnerModal.jsx"));
const PartnerTable=lazy(()=>import("./child/PartnerTable/PartnerTable.jsx"));


class Partner extends Component {
  state = { currentData: undefined,text:undefined,currentUser:"" };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.emptyPartner()
    this.props.getPartnerListByUserId(this.state.currentUser?this.state.currentUser:this.props.userId,0);
  };
  handleDropChange=(value)=>{
    this.setState({ currentUser: value });
    
    // if(value === "all"){
    // this.props.sharePartnerPermission(0);
    // }
    // else{
      this.props.getPartnerPagination(value,0 );
    // }
    console.log("valid",value)
  };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  

  render() {
    const { handlePartnerModal, addPartnerModal,viewType,setPartnerViewType } = this.props;
    return (
      <React.Fragment>
        <PartnerHeader
         handleDropChange={this.handleDropChange}
         currentUser={this.state.currentUser}
          viewType={viewType}
          setPartnerViewType={setPartnerViewType}
          handlePartnerModal={handlePartnerModal}
          handleClear={this.handleClear}
          text={this.state.text}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          
          
        />
        <AddPartnerModal
          addPartnerModal={addPartnerModal}
          handlePartnerModal={handlePartnerModal}
        />
        <Suspense fallback={<BundleLoader />}>
        {this.props.viewType === "list" ?
         <PartnerTable
         currentUser={this.state.currentUser} /> :
         this.props.viewType === "dashboard" ?
         <PartnerDeletedTable/> :
            null}
        </Suspense>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ partner, auth }) => ({
  userId: auth.userDetails.userId,
  addPartnerModal: partner.addPartnerModal,
  viewType: partner.viewType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handlePartnerModal,
      getPartnerPagination,
      emptyPartner,
      setPartnerViewType,
      getPartnerListByUserId,
      sharePartnerPermission
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Partner);
