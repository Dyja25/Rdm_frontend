import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../../Components/Utils";
const CandidateDetailActionLeft=lazy(()=>import("./CandidateDetailActionLeft.jsx"));

class CandidateDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<CandidateDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default CandidateDetailHeader;
