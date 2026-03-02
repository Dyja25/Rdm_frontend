import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import PartnerDetailView from "./PartnerDetailView.jsx";

class PartnerDetailCard extends Component {
  render() {
    const { partner } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PartnerDetailView
                partner={partner}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PartnerDetailCard;
