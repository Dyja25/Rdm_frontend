import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import EmployeeOverviewCard from "./EmployeeCards/EmployeeOverviewCard";
import EmployeeTopicOfInterest from "./EmployeeCards/EmployeeTopicOfInterest";
import EmployeeStatusCard from "./EmployeeCards/EmployeeStatusCard";
// import EmployeeStatusView from "./EmployeeTab/EmployeeStatusView";
import EmployeeAboutCard from "./EmployeeCards/EmployeeAboutCard";
import EmployeePersonalCard from "./EmployeeCards/EmployeePersonalCard";
import EmployeeDetailMap from "./EmployeeCards/EmployeeDetailMap";

class EmployeeDetailLeft extends Component {
  render() {
    const { singleEmployee } = this.props;
    // console.log(userDetails);
    return (
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <EmployeeOverviewCard singleEmployee={singleEmployee} />
        <EmployeeTopicOfInterest singleEmployee={singleEmployee} />
        <EmployeeStatusCard singleEmployee={singleEmployee} />
        <EmployeeAboutCard singleEmployee={singleEmployee} />
        {/* <EmployeeDetailMap singleEmployee={singleEmployee} /> */}
        <EmployeePersonalCard singleEmployee={singleEmployee} />
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ employee }) => ({
  singleEmployee: employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailLeft);
