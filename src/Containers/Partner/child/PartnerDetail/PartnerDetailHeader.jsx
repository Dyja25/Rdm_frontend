import React, { Component } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import PartnerDetailActionLeft from "./PartnerDetailActionLeft.jsx";

class PartnerDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<PartnerDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default PartnerDetailHeader;
