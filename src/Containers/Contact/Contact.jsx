import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { BundleLoader } from "../../Components/Placeholder";

import { handleContactModal, setContactsViewType, getContactListByUserId, getContactPartnerListByUserId } from "./ContactAction";
const AddContactModal = lazy(() => import("./Child/AddContactModal.jsx"));
const ContactHeader = lazy(() => import("./Child/ContactHeader.jsx"));
const ContactTable = lazy(() => import("./Child/ContactTable/ContactTable.jsx"));
const PartnerTable =lazy(()=>import("./Child/PartnerTable/PartnerTable.jsx"));

class Contact extends Component {
  state = { currentData:undefined };


  componentDidUpdate(prevProps) {
    if (prevProps.viewType !== this.props.viewType) {
      this.setState({ currentData: "" });
    }
  }
  handleClear = () => {
    this.setState({ currentData: "" });
     if (this.props.viewType === "dashboard") {
    this.props.getContactListByUserId(this.props.userId);
     } else {
         this.props.getContactPartnerListByUserId(this.props.userId);
     }
  };
  setCurrentData = (e) => {
      const value = e.target.value.trim();
  this.setState({ currentData: value });
  };

  state = { currentPartnerData: "" };
  handlePartnerClear = () => {
    this.setState({ currentPartnerData: "" });
 
  };
  setCurrentPartnerData = (value) => {
    this.setState({ currentPartnerData: value });
  };

   

  render() {
    const {
      addContactModal,
      handleContactModal,
      setContactsViewType,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <ContactHeader
          handleContactModal={handleContactModal}
          setContactsViewType={setContactsViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          handlePartnerClear={this.handlePartnerClear}
          currentPartnerData={this.state.currentPartnerData}
          setCurrentPartnerData={this.setCurrentPartnerData}
        />

        <AddContactModal
          addContactModal={addContactModal}
          handleContactModal={handleContactModal}
        />
        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "table" ?  
          <PartnerTable 
          viewType={viewType}
          /> 
       
          :
            this.props.viewType === "dashboard" ? (
              <ContactTable 
              viewType={viewType}
              />
            ) : null}

        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ contact, account, auth }) => ({
  userId: auth.userDetails.userId,
  addContactModal: contact.addContactModal,
  viewType: contact.viewType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleContactModal,
      setContactsViewType,
      getContactListByUserId,
      getContactPartnerListByUserId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
