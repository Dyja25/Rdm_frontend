import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const CustomerOverView=lazy(()=> import("./CustomerOverView"));

class CustomerOverViewCard extends Component {
  render() {
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CustomerOverView customer={customer} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CustomerOverViewCard;
