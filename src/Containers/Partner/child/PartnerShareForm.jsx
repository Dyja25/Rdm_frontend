import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { sharePartnerPermission, getPartnerPermissionsList } from "../PartnerAction";

import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function PartnerShareForm(props) {
  useEffect(() => {
    props.getPartnerPermissionsList();
    // props.getsharePartnerUsers();
  }, []);

  const permissionListForAll = props.permissionsDataList.map((item) => {
    return item.userId;
  });
  // function handleChange(value){
  //   if(value === "all"){
  //   props.sharePartnerPermission(
  //     {
  //       type: "partner",
  //       user: permissionListForAll,
  //     },
  //     value,
  //     "All"
  //   );
  //   }else{
  //     props.sharePartnerPermission(
  //       {
  //         type: "partner",
  //         user: [value],
  //       },
  //       value,
      
  //     );
  //   }
  // }
  // console.log(props.shareUsers);
  const findLoginData=props.permissionsDataList.find((element)=>{
    if(element.userId === props.userId){
         return element.userName
   }
});
console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
     <StyledSelect
        // showArrow={false}
        // value={props.name || undefined}
        // disabled={props.stageInd || props.approveInd || props.rejectInd}
        // showSearch
        defaultValue={props.fullName}
        style={{ width: 140 }}
        placeholder="Select to View"
        onChange={(e) => props.handleDropChange(e)}
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataList.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ partner, team, permissions,auth }) => ({
  addSharingPartner: partner.addSharingPartner,
  userId:auth.userDetails.userId,
  fullName:
  (auth.userDetails.fullName),
  permissionsDataList: partner.permissionsDataList,
  permissionsDataList: permissions.permissionsDataList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sharePartnerPermission,
      //   getUsers,
      //   getsharePartnerUsers,
      getPartnerPermissionsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PartnerShareForm);
