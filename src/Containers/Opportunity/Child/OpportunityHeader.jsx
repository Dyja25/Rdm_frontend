import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import OpportunityActionLeft from "./OpportunityActionLeft.jsx";
import OpportunityActionRight from "./OpportunityActionRight.jsx";
class OpportunityHeader extends Component {
  render() {
    const {
      handleOpportunityModal,
      viewType,
      setOpportunityViewType,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <OpportunityActionLeft
              viewType={viewType}
              setOpportunityViewType={setOpportunityViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <OpportunityActionRight
              viewType={viewType}
              handleOpportunityModal={handleOpportunityModal}
            />
          }
        />
      </div>
    );
  }
}

export default OpportunityHeader;
