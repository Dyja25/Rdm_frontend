import React, { Component } from "react";
// import { Dropdown, Menu, Icon, Tooltip } from "antd";
// import { ActionIcon } from "../../../../Components/Utils";
import { BussinessCard } from "../../../../Components/UI/Elements";
// import { StyledPopconfirm } from "../../../../Components/UI/Antd";
class SingleEmployee extends Component {  
  render() {
    const { employee } = this.props;
    const employeeId = employee.employeeId;
    console.log(employee.role);

    return (
      <>
        <BussinessCard
          primaryTitle={employee.firstName}
          imageId={employee.imageId}
          handleClick={() => this.props.history.push(`employee/${employeeId}`)}
          department={employee.department}
          subtitle1={employee.role === "ADMIN" ? "ADMIN" : employee.role === "USER" && employee.department === "Hr" ? "HR" : "EMPLOYEE"}
          subtitle2={employee.department}
          bottomBarComponent={
            !employee.emailValidationInd ? (
              <p style={{ margin: 0 }}>Awaiting registration</p>
            ) : (
                <p style={{ margin: 0 }}>Registered</p>
              )
          }   
         
        />
        {/* <button onClick={() => deleteUserById(user.userId)}>Delete</button> */}
      </>
    );
  }
}
export default SingleEmployee;
