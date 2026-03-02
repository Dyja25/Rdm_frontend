import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { shareContactCustomerPermission, getPermissionsListCustomer } from "../ContactAction";

import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function ContactShareCustomerForm(props) {
  useEffect(() => {
    props.getPermissionsListCustomer();
    // props.getsharePartnerUsers();
  }, []);
  // const permissionList = props.permissionsDataListContactCustomer.map((item) => {
  //   return {
  //     label: `${item.userName || ""}`,
  //     value: item.userId,
  //   };
  // });
  // permissionList.unshift({label:"All", value:"All"})
  // function handleReset(resetForm) {
  //   resetForm();
  // }
  const permissionListForAll = props.permissionsDataListContactCustomer.map((item) => {
    return item.userId;
  });
  
  
  function handleChange(value){
          if (value ==="all"){
          props.shareContactCustomerPermission(
            {
              type: "contact",
              user:permissionListForAll,
            },
            value,
      "All"
    );
              }    else {
            props.shareContactCustomerPermission(
            {
              type: "contact",
              userId:[value],
            },
            value,
          );
          }
        }   

 return (
  <>
     {props.user.employee_type!=="external"&&(  
    <StyledSelect
      // showArrow={false}
      // value={props.name || undefined}
      // disabled={props.stageInd || props.approveInd || props.rejectInd}
      // showSearch
      style={{ width: 140 }}
      // defaultValue={findLoginData && findLoginData.userName}
      defaultValue={props.fullName}
      placeholder="Select to View"
      onChange={(e) => handleChange(e)}
   
    >
       <Option value={"all"}>{"All"} </Option>
      {props.permissionsDataListContactCustomer.map((item) => {
        return <Option value={item.userId}>{item.userName} </Option>;
      })}
    </StyledSelect>
    )} 
  </>
);
}
const mapStateToProps = ({ contact,auth }) => ({
  addSharingContactCustomer: contact.addSharingContactCustomer,
  userId:auth.userDetails.userId,
  user: auth.userDetails,
  fullName:
   (auth.userDetails.fullName),
  permissionsDataListContactCustomer: contact.permissionsDataListContactCustomer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        shareContactCustomerPermission,
      //   getUsers,
      //   getsharePartnerUsers,
      getPermissionsListCustomer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactShareCustomerForm);
