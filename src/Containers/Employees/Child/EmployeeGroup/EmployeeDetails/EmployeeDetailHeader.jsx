import React, { Component } from "react";
import { ActionHeader } from "../../../../../Components/Utils";
import EmployeeDetailActionLeft from "./EmployeeDetailActionLeft.jsx";

class EmployeeDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<EmployeeDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default EmployeeDetailHeader;
