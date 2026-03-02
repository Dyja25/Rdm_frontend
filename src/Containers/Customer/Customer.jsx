import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import CustomerWhiteTable from "../Customer/Child/CustomerTable/CustomerWhiteTable.jsx";
import CustomerBlueTable from "../Customer/Child/CustomerTable/CustomerBlueTable.jsx";
import {
    handleCustomerModal,
    getCustomerListByUserId,
    setCustomerViewType
    
  } from "./CustomerAction";
import CustomerDeleteTable from "./CustomerDeleteTable.jsx";
  
const AddCustomerModal = lazy(() => import( "./Child/AddCustomerModal.jsx"));
const CustomerHeader = lazy(() => import("./Child/CustomerHeader.jsx"));
const CustomerTable = lazy(() => import("./Child/CustomerTable/CustomerTable.jsx"));

class  Customer extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getCustomerListByUserId(this.props.userId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  render() {
    const {
      addCustomerModal,
      handleCustomerModal,
    } = this.props;
    return (
      <React.Fragment>
        <CustomerHeader
           viewType={this.props.viewType}
           setCustomerViewType={this.props.setCustomerViewType}
          handleCustomerModal={handleCustomerModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddCustomerModal
          addCustomerModal={addCustomerModal}
          handleCustomerModal={handleCustomerModal}
        />
        <Suspense fallback={<BundleLoader />}>
        {this.props.viewType === "table" ?
         <CustomerTable/> :
         this.props.viewType === "list" ?
          <CustomerWhiteTable /> :
          this.props.viewType === "dashboard" ?
             <CustomerBlueTable/> :
             this.props.viewType === "delete" ?
             <CustomerDeleteTable/> :
            null}
        </Suspense>
         
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
  addCustomerModal: customer.addCustomerModal,
  viewType: customer.viewType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerModal,
      getCustomerListByUserId,
      setCustomerViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
