import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const EmployeeDetailTab = lazy(() =>
  import("./EmployeeTab/EmployeeDetailTab")
);

class EmployeeDetailRight extends Component {
  render() {
    console.log(this.props.employeeId);
    return (
      <div style={{ width: "100%" }}>
        <EmployeeDetailTab singleEmployee={this.props.singleEmployee}/>
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetailRight);
