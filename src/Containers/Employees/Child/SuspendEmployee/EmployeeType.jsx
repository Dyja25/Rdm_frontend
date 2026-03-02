import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { handleLeadsConvertModal } from "../../LeadsAction";

import { getEmployeelist, employeeStatus } from "../../EmployeeAction";

class EmployeeType extends Component {
  constructor(props) {
      super(props);
      this.state = {
          toggle: false,
          empTyp:false,
      };
  }
  handleempTyp = (checked) => {
    this.setState({ empTyp: checked });
  };

  onChange = (checked) => {
      console.log(this.props.testShop)
      this.setState({ toggle: checked });
      this.props.employeeStatus({
        employeeType: this.state.empTyp ? "Internal" : "External",
        employeeId:this.props.employeeId
      },
       this.props.employeeId
       );
  };

  render() {
      return (
          <>
              <div>
                  <Popconfirm
                      title="Do you want to change?"
                      onConfirm={() => {
                          this.onChange();
                      }}
                      onCancel={null}
                      okText="Ok"
                      cancelText="Cancel"
                  >
                      <Switch
                          checked={this.state.empTyp}
                          onChange={this.handleempTyp}
                          //   disabled={this.props.collectInd}
                          checkedChildren="Internal"
                          unCheckedChildren="External"
                      />
                  </Popconfirm>
              </div>
          </>
      );
  }
}

const mapStateToProps = ({ auth, employee }) => ({
  EmployeeStatus:employee.EmployesStatus,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //     employeeType,
    //   getEmployeelist,
    employeeStatus
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeType);
