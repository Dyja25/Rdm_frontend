import React, { Component } from 'react';
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import EmployeePersonalView from "./EmployeePersonalView";
import EmployeePersonalEdit from "./EmployeePersonalEdit";

class EmployeePersonalCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <EmployeePersonalView
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                            : <EmployeePersonalEdit
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default EmployeePersonalCard;