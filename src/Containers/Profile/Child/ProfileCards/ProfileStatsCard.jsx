import React, { Component } from 'react';
import { ViewEditCard } from "../../../../Components/UI/Elements";
import ProfileStatsView from "./ProfileStatsView";
import ProfileStatsEdit from "./ProfileStatsEdit";

class ProfileAboutCard extends Component {
    render() {
        const { user } = this.props;
        console.log(user)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <ProfileStatsView
                                user={user}
                                toggleViewType={toggleViewType}
                            />
                            : <ProfileStatsEdit
                                user={user}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default ProfileAboutCard;