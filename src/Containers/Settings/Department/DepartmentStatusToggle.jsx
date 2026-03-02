import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { linkDepartmentDocumentToggle } from "../Department/DepartmentAction";

function DepartmentStatusToggle(props) {
  const [toggle, setToggle] = React.useState(props.mandetoryInd);
console.log("abc",props.mandetoryInd);
//   function handleToggleCollection(item) {
//     if (props.mandetoryInd) {
//       props.linkDepartmentDocumentToggle({
//         departmentName: props.departmentName,
//         departmentId: props.departmentId,
//         mandetoryInd: props.mandetoryInd ? false : true,
//       },
//       props.departmentId,
//       );

//     } else {
//       props.linkDepartmentDocumentToggle({
//         departmentName: props.departmentName,
//         departmentId: props.departmentId,
//         mandetoryInd: props.mandetoryInd ? false : true,
//       },
//       props.departmentId,
//       );
//     }
//   }

  function handleCancel() {
    if (props.mandetoryInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
         // onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
           // checked={props.mandetoryInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{width: "9em"}}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  // userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // linkDepartmentDocumentToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentStatusToggle);
