import React, { Component,lazy} from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
const CustomerOverviewCard =lazy(()=> import("./CustomerCards/CustomerOverViewCard.jsx"));
const CustomerDetailCard =lazy(()=> import("./CustomerCards/CustomerDetailCard.jsx"));

class CustomerDetailLeft extends Component {
  render() {
    const { customer } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <CustomerOverviewCard customer={customer} />
          <CustomerDetailCard customer={customer} />
        </FlexContainer>
      </>
    );
  }
}
export default CustomerDetailLeft;
