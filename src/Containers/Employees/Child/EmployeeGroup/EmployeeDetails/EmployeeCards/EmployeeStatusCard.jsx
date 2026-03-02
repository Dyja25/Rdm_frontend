import React, { Component } from 'react';
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import EmployeeStatusView from "./EmployeeStatusView";
import EmployeeStatusEdit from "./EmployeeStatusEdit";

class EmployeeStatusCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <EmployeeStatusView
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                            : <EmployeeStatusEdit
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default EmployeeStatusCard;