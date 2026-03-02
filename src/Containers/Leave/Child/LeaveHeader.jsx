import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
// import EmployeesActionLeft from "./EmployeesActionLeft";
import LeaveActionRight from "./LeaveActionRight";
class LeaveHeader extends Component {
    render() {
        const {
            handleEmployeeModal,
            //   handleOpportunityModal,
            //   viewType,
            //   setOpportunityViewType,
        } = this.props;
        return (
            <>
                <div>
                    <ActionHeader
                        // leftComponent={
                        //     <EmployeesActionLeft
                        //     //     // viewType={viewType}
                        //     //     // setEmployeesViewType={setEmployeesViewType}
                        //     //     //   department={this.props.department}
                        //     //     //   partnerLogin={this.props.partnerLogin}
                        //     />
                        // }
                        rightComponent={
                            <LeaveActionRight
                            // handleEmployeeModal={handleEmployeeModal}
                            />
                        }
                    />
                </div>

                <div>

                </div>
            </>

        );
    }
}

export default LeaveHeader;
