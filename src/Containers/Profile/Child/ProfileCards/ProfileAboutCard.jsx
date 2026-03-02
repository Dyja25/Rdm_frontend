import React, { Component } from 'react';
import { ViewEditCard } from "../../../../Components/UI/Elements";
import ProfileAboutView from "./ProfileAboutView";
import ProfileAboutEdit from "./ProfileAboutEdit";

class ProfileAboutCard extends Component {
    render() {
        const { user } = this.props;
        console.log(user)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <ProfileAboutView
                                user={user}
                                toggleViewType={toggleViewType}
                            />
                            : <ProfileAboutEdit
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