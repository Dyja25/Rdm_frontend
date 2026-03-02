import React, { Component } from 'react';
import { ViewEditCard } from "../../../../../../Components/UI/Elements"
import EmployeeAboutView from "./EmployeeAboutView";
import EmployeeAboutEdit from "./EmployeeAboutEdit";

class EmployeeAboutCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <EmployeeAboutView
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                            : <EmployeeAboutEdit
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default EmployeeAboutCard;