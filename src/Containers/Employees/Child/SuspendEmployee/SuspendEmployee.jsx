import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { handleLeadsConvertModal } from "../../LeadsAction";

import { getEmployeelist, suspendEmployee,suspendStatus } from "../../EmployeeAction";

function SuspendEmployee(props) {
  const [assignedIndicator, setAssignedIndicator] = React.useState(false);
  const [toggle, setToggle] = React.useState(props.suspendInd)

console.log(props.employeeId)

  function handleToggleClick() {
     setAssignedIndicator(!assignedIndicator);
    if (props.suspendInd){
      props.suspendStatus(
        {
          employeeId: props.employeeId,
          userId: props.userId,
        },
        handleCallback,
        props.employeeId,
      );
    
  }else{
    props.suspendEmployee(
      {
        employeeId: props.employeeId,
        userId: props.userId,
        // suspendInd:props.suspendInd? false:true,
      },
      handleCallback,
      props.employeeId,
    );
  
  }
}



  function handleCallback(a, b, c) {
    // debugger;
    if (a === "success") {
      // debugger;
      if (c === false) {
        // debugger;
        message.info(b);
        setAssignedIndicator(false);
        props.getEmployeelist(props.employeeId);
      } else {
        // debugger;
        message.success("User login disabled sucessfully");
        props.getEmployeelist(props.employeeId);
      }
    } else {
      // debugger;
      message.error("something went wrong");
    }
  }
  function handleCancel() {
    if (props.suspendInd) {
        setToggle(true);
    } else {
        setToggle(false);
    }
}

  return (
    <>
      <div>
        <Popconfirm
          title="Change Login Status?"
          onConfirm={() => handleToggleClick()}
          onCancel={handleCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            checked={props.suspendInd || toggle}
            isLoading={true}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth, employee }) => ({
  suspendedEmployees: employee.suspendedEmployees,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      suspendEmployee,
      getEmployeelist,
      suspendStatus
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SuspendEmployee);
