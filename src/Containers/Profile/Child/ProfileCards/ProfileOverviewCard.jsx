import React, { Component } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import ProfileOverviewView from "./ProfileOverviewView";
import ProfileOverviewEdit from "./ProfileOverviewEdit";

class ProfileOverviewCard extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ProfileOverviewView
                user={user}
                toggleViewType={toggleViewType}
              />
            ) : (
              <ProfileOverviewEdit
                user={user}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ProfileOverviewCard;
