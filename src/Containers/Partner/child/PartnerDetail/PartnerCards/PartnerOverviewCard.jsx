import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import PartnerOverView from "./PartnerOverView.jsx";

class PartnerOverViewCard extends Component {
  render() {
    const { partner } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? <PartnerOverView partner={partner} /> : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PartnerOverViewCard;
