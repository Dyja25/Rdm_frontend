import React, { Component } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import OrganizationAboutView from "./OrganizationAboutView";
import OrganizationAboutEdit from "./OrganizationAboutEdit";

class OrganizationAboutCard extends Component {
  render() {
    const { organization } = this.props;
    console.log(organization);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OrganizationAboutView
                organization={organization}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OrganizationAboutEdit
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
