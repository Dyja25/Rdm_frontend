import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { BundleLoader, GridLoader } from "../../Components/Placeholder";
// import CustomerWhiteTable from "../Customer/Child/CustomerTable/CustomerWhiteTable";
// import CustomerBlueTable from "../Customer/Child/CustomerTable/CustomerBlueTable";
// import {
//     handleCustomerModal,
//     getCustomerListByUserId,
//     setCustomerViewType
    
//   } from "./CustomerAction";
  
// const AddCustomerModal = lazy(() => import( "./Child/AddCustomerModal"));
 const PublishHeader = lazy(() => import("./Child/PublishHeader.jsx"));
 const PublishTable = lazy(() => import("./Child/PublishTable.jsx"));
//  const PublishTable = lazy(() =>import("./Child/PublishTable"));
// const CustomerTable = lazy(() => import("./Child/CustomerTable/CustomerTable"));

class  Publish extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    // this.props.getCustomerListByUserId(this.props.userId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  render() {
    // const {
    //   addCustomerModal,
    //   handleCustomerModal,
    // } = this.props;
    return (
      <React.Fragment>
        <PublishHeader
            viewType={this.props.viewType}
            setPublishViewType={this.props.setPublishViewType}
           //handleCustomerModal={handleCustomerModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        {/* <AddCustomerModal
          addCustomerModal={addCustomerModal}
          handleCustomerModal={handleCustomerModal}
        /> */}
        {/* <Suspense fallback={<BundleLoader />}>
        {this.props.viewType === "table" ?
         <CustomerTable/> :
         this.props.viewType === "list" ?
          <CustomerWhiteTable /> :
          this.props.viewType === "dashboard" ?
             <CustomerBlueTable/> :
            null}
        </Suspense> */} 
        <PublishTable/>
         
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ customer, auth }) => ({
//   userId: auth.userDetails.userId,
//   addCustomerModal: customer.addCustomerModal,
//   viewType: customer.viewType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   handleCustomerModal,
    //   getCustomerListByUserId,
    //   setCustomerViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Publish);
