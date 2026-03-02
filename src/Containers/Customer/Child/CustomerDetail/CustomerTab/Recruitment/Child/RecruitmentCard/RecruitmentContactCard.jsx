import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../../../Components/UI/Elements";
import ContactView from "./ContactView";

class RecruitmentContactCard extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ContactView contact={contact} toggleViewType={toggleViewType} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default RecruitmentContactCard;
