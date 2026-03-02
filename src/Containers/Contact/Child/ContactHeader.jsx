import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const ContactActionLeft = lazy(()=>import("./ContactActionLeft.jsx"));
const ContactActionRight = lazy(() =>import("./ContactActionRight.jsx"));
class ContactHeader extends Component {
  render() {
    const {
      handleContactModal,
      viewType,
      setContactsViewType,
      currentData,
      handleButtonClick,
      visibility,
      handleSecondFilterChange,
      currentSecondData,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <ContactActionLeft
              currentData={this.props.currentData}
              handleClear={this.props.handleClear}
              setCurrentData={this.props.setCurrentData}
              viewType={viewType}
              setContactsViewType={setContactsViewType}
              currentPartnerData={this.props.currentPartnerData}
              handlePartnerClear={this.props.handlePartnerClear}
              setCurrentPartnerData={this.props.setCurrentPartnerData}
            />
          }
          rightComponent={
            <ContactActionRight handleContactModal={handleContactModal} 
            viewType={viewType}
            />
          }
        />
      </div>
    );
  }
}

export default ContactHeader;
