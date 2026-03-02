import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import EmployeesActionLeft from "./EmployeesActionLeft.jsx";
import EmployeesActionRight from "./EmployeesActionRight.jsx";
class EmployeesHeader extends Component {
    render() {
        const {
            handleEmployeeModal,
            viewType,
            setEmployeeViewType,
        } = this.props;
        return (
            <>
                <div>
                    <ActionHeader
                        leftComponent={
                            <EmployeesActionLeft
                                viewType={viewType}
                                setEmployeeViewType={setEmployeeViewType}
                                currentData={this.props.currentData}
                                handleClear={this.props.handleClear}
                                setCurrentData={this.props.setCurrentData}
                            />
                        }
                        rightComponent={
                            <EmployeesActionRight
                                handleEmployeeModal={handleEmployeeModal}
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

export default EmployeesHeader;
