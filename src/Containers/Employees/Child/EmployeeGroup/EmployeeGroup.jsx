import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import dayjs from "dayjs";
// import { NoData } from "../../../../Components/UI/Elements";
import { GroupView } from "../../../../Components/Common";
import SingleEmployee from "./SingleEmployee";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { getEmployeelist } from "../../EmployeeAction";

class EmployeeGroup extends Component {
  componentDidMount() {
    debugger;
    this.props.getEmployeelist();
  }
  render() {
    console.log(this.props.employees);
    return (
      <>
        <br />

        <GroupView
          groupTitle="All Employees"
          isFetching={this.props.fetchingEmployee}
          noData={!this.props.employees.length}
          length={this.props.employees.length}
        >
          {(isViewAll, toggleViewAll) =>
            !isViewAll ? (
              <FlexContainer>
                {this.props.employees &&
                  this.props.employees.slice(0, 5).map((employee, i) => {
                    return (
                      <SingleEmployee
                        key={employee.employeeId}
                        employee={employee}
                      />
                    );
                  })}
              </FlexContainer>
            ) : (
                <FlexContainer>
                  {this.props.employees &&
                    this.props.employees.map((employee, i) => {
                      return (
                        <SingleEmployee
                          key={employee.employeeId}
                          employee={employee}
                        />
                      );
                    })}
                </FlexContainer>
              )
          }
        </GroupView>
      </>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  employees: employee.employees,
  fetchingEmployee: employee.fetchingEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmployeelist,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeGroup);
