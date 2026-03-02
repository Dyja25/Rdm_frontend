import React, { Component } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import PersonalView from "./PersonalView";
import PersonalEdit from "./PersonalEdit";

class PersonalCard extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PersonalView user={user} toggleViewType={toggleViewType} />
            ) : (
              <PersonalEdit user={user} toggleViewType={toggleViewType} />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PersonalCard;
