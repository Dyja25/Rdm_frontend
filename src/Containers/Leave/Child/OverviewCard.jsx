import React, { Component } from "react";
import { ViewEditCard } from "../../../Components/UI/Elements";
import OverviewView from "./OverviewView";
import ProfileOverviewEdit from "../../Profile/Child/ProfileCards/ProfileOverviewEdit";

class OverviewCard extends Component {
    render() {
        const { leaveFetching } = this.props;
        console.log(leaveFetching);
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <OverviewView
                                leaveFetching={leaveFetching}
                                toggleViewType={toggleViewType}
                            />
                        ) : (
                                <ProfileOverviewEdit
                                    leaveFetching={leaveFetching}
                                    toggleViewType={toggleViewType}
                                />
                            )
                    }
                </ViewEditCard>
            </div>
        );
    }
}

export default OverviewCard;
