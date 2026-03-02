import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import PartnerActionLeft from "./PartnerActionLeft.jsx";
import PartnerActionRight from "./PartnerActionRight.jsx";
class PartnerHeader extends Component {
  render() {
    const { handlePartnerModal,setPartnerViewType,viewType } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <PartnerActionLeft
            viewType={viewType}
            text={this.props.text}
            handleChange={this.props.handleChange}
            setPartnerViewType={setPartnerViewType}
              currentData={this.props.currentData}
              handleClear={this.props.handleClear}
              setCurrentData={this.props.setCurrentData}
            />}
          rightComponent={
            <PartnerActionRight 
            currentUser={this.props.currentUser} 
            handleDropChange={this.props.handleDropChange}
            handlePartnerModal={handlePartnerModal} />
          }
        />
      </div>
    );
  }
}

export default PartnerHeader;
