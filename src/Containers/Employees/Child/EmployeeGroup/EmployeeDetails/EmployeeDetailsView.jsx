import React, { Component } from "react";
import { Link } from "react-router-dom";


class EmployeeDetailsView extends Component {
  render() {
    return (
      <>
        <Link
          to={`/employee/${this.props.employeeId}`}
        >
        {this.props.fullName}  
        </Link>
      </>
    );
  }
}
export default EmployeeDetailsView;
