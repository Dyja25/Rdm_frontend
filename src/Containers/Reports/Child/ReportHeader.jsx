import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import ReportActionLeft from "./ReportActionLeft";
// import ReportActionRight from "./ReportActionRight";
class ReportHeader extends Component {
  render() {
    const {} = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={<ReportActionLeft />}
          // rightComponent={<ReportActionRight
          // />}
        />
      </div>
    );
  }
}

export default ReportHeader;
