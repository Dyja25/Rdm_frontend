import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getOpportunityPermissionsList,shareOpportunityPermission,getRecords } from "../OpportunityAction";

import { StyledSelect } from "../../../Components/UI/Antd";


const Option =StyledSelect;

function OpportunityShareForm(props) {
  useEffect(() => {
    props.getOpportunityPermissionsList();
  }, []);
  // const permissionList = props.permissionsDataList.map((item) => {
  //   return {
  //     label: `${item.userName || ""}`,
  //     value: item.userId,
  //   };
  // });
  // function handleReset(resetForm) {
  //   resetForm();
  // }
  // function handleChange(userId) {
  //   props.getOpportunityListByUserId(userId);
  //    props.getRecords(userId);
  // }
  const permissionListForAll = props.permissionsDataList.map((item) => {
    return item.userId;
  });
  function handleChange(value){
    if(value === "all"){
    props.shareOpportunityPermission(
      {
        type: "opportunity",
        user: permissionListForAll,
      },
      value,
      "All"
    );
    }else{
      props.shareOpportunityPermission(
        {
          type: "candidate",
          user: [value],
        },
        value,
      
      );
    }
  }
  // console.log(props.shareUsers);
  const findLoginData=props.permissionsDataList.find((element)=>{
           if(element.userId === props.userId){
                return element.userName
          }
      });
  console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
    {findLoginData &&
      <StyledSelect
        // showArrow={false}
        // value={props.name || undefined}
        // disabled={props.stageInd || props.approveInd || props.rejectInd}
        // showSearch
        defaultValue={findLoginData && findLoginData.userName}
        style={{ width: 140 }}
        placeholder="Select to View"
        onChange={(e) => handleChange(e)}
      >
        <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataList.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
       }
    </>
  );
}

const mapStateToProps = ({ opportunity,auth }) => ({
  addSharingOpportunity: opportunity.addSharingOpportunity,
  userId:auth.userDetails.userId,
  //   users: team.users,
  //   shareUsers: partner.shareUsers,
  permissionsDataList: opportunity.permissionsDataList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      shareOpportunityPermission,
      //   getUsers,
      getOpportunityPermissionsList,
      getRecords,
      // getOpportunityListByUserId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityShareForm);

