import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EmployeesHeader from "./Child/EmployeesHeader.jsx";
// import { setEmployeesViewType } from "./EmployeesAction";
// import EmployeesTable from "./Child/EmployeesTable";
import AddEmploymentModal from "./Child/AddEmployeeModal.jsx";
import { setEmployeeViewType, handleEmployeeModal, getEmployeelist } from "./EmployeeAction";
const EmployeeTable = lazy(() => import("./Child/EmployeeTable/EmployeeTable.jsx"));
const EmployeeGroup = lazy(() => import("./Child/EmployeeGroup/EmployeeGroup.jsx"));

class Employees extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getEmployeelist();
  };
  setCurrentData = (e) => {
       const value = e.target.value.trim();
  this.setState({ currentData: value });
  };
  render() {
    const {
      setEmployeeViewType,
      addEmployeeModal,
      handleEmployeeModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <EmployeesHeader
          handleEmployeeModal={handleEmployeeModal}
          setEmployeeViewType={setEmployeeViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddEmploymentModal
          addEmployeeModal={addEmployeeModal}
          handleEmployeeModal={handleEmployeeModal}
        />
        {/* <EmployeeGroup /> */}
        <EmployeeTable />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  addEmployeeModal: employee.addEmployeeModal,
  viewType: employee.viewType,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEmployeeViewType,
      handleEmployeeModal,
      getEmployeelist,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Employees);
