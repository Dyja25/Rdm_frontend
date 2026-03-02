import React, { Component } from 'react';
import { ViewEditCard } from "../../../Components/UI/Elements";
import StatusView from "./StatusView";
import ProfileStatsEdit from "../../Profile/Child/ProfileCards/ProfileStatsEdit";

class StatusCard extends Component {
    render() {
        const { leaveFetching } = this.props;
        console.log(leaveFetching)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <StatusView
                                leaveFetching={leaveFetching}
                                toggleViewType={toggleViewType}
                            />
                            : <ProfileStatsEdit
                                leaveFetching={leaveFetching}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default StatusCard;