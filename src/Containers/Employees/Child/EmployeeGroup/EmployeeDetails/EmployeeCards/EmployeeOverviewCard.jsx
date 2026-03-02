import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import EmployeeOverviewView from "./EmployeeOverviewView";
import EmployeeOverviewEdit from "./EmployeeOverviewEdit";

class ProfileOverviewCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee);
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <EmployeeOverviewView
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                        ) : (
                                <EmployeeOverviewEdit
                                    singleEmployee={singleEmployee}
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
