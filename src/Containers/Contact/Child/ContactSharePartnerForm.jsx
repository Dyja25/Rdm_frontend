import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { shareContactPartnerPermission, getPermissionsListPartner } from "../ContactAction";
;
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function ContactSharePartnerForm(props) {
  useEffect(() => {
    props.getPermissionsListPartner();
    // props.getsharePartnerUsers();
  }, []);
 
  const permissionListForAll = props.permissionsDataListPartner.map((item) => {
    return item.userId;
  });
  function handleChange(value){
    if(value === "all"){
    props.shareContactPartnerPermission(
      {
        type: "partnerContact",
        user: permissionListForAll,
      },
      value,
      "All"
    );
    }else{
      props.shareContactPartnerPermission(
        {
          type: "partnerContact",
          user: [value],
        },
        value,
      
      );
    }
  }
  const findLoginData=props.permissionsDataListPartner.find((element)=>{
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
        style={{ width: 140 }}
        defaultValue={props.fullName}
        placeholder="Select to View"
        onChange={(e) => handleChange(e)}
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataListPartner.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ contact,auth}) => ({
  addSharingContactPartner: contact.addSharingContactPartner,
  userId:auth.userDetails.userId,
  user: auth.userDetails,
  fullName:
  (auth.userDetails.fullName),
  permissionsDataListPartner: contact.permissionsDataListPartner,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      shareContactPartnerPermission,
      //   getUsers,
      //   getsharePartnerUsers,
      getPermissionsListPartner,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactSharePartnerForm);
