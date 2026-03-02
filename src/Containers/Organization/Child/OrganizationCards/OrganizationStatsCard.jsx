import React, { Component } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import OrganizationStatsView from "./OrganizationStatsView";
import OrganizationStatsEdit from "./OrganizationStatsEdit";

class OrganizationAboutCard extends Component {
  render() {
    const { organization } = this.props;
    console.log(organization);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OrganizationStatsView
                organization={organization}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OrganizationStatsEdit
                organization={organization}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OrganizationAboutCard;
