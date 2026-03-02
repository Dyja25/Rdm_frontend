import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../../../Components/UI/Elements";
import CandidateCatagoryView from "./CandidateCatagoryView.jsx";

class CandidateCatagoryCard extends Component {
  render() {
    const { candidate } = this.props;
    console.log(candidate);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateCatagoryView
              candidate={candidate}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CandidateCatagoryCard;
