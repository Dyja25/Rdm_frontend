import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const CandidateDetailExtra = lazy(()=>import("./CandidateDetailExtra.jsx"));

class CandidateDetailExtraCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateDetailExtra candidate={candidate} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CandidateDetailExtraCard;
