import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
const CustomerDetailActionLeft =lazy(()=> import("./CustomerDetailActionLeft"));

class CustomerDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<CustomerDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default CustomerDetailHeader;
