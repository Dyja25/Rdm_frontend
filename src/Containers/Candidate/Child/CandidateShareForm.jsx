import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getPermissionsList,
  shareCandidatePermission,
  getCandidateListByUserId,
  getRecords,
  getCandidatePagination,
  setChoosedtypeCandidate,

} from "../CandidateAction";

import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function CandidateShareForm(props) {
  const [selectedUser, setSelectedUser] = useState(props.fullName || "all"); // Initialize state with prop

  useEffect(() => {
    props.getPermissionsList();
  }, []);

  useEffect(() => {
    setSelectedUser(props.currentUser);
  }, [props.currentUser]);

  const [page, setPage] = useState(0);

  const permissionListForAll = props.permissionsDataList.map((item) => {
    return item.userId;
  });

  const findLoginData=props.permissionsDataList.find((element)=>{
    if(element.userId === props.userId){
         return element.userName
   }
});
console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
       {props.user.employee_type!=="external"&&(  
      <StyledSelect
      value={selectedUser}
      
        style={{ width: 140 }}
    
        placeholder="Select to View"
        onChange={(e) => props.handleDropChange(e)}
     
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataList.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
      )} 
    </>
  );
}

const mapStateToProps = ({ candidate,auth }) => ({
  addSharingCandidate: candidate.addSharingCandidate,
  userId:auth.userDetails.userId,
  user: auth.userDetails,
  // fullName:
  //  (auth.userDetails.fullName),
  permissionsDataList: candidate.permissionsDataList,
   candidateByUserId: candidate.candidateByUserId,
  allCandidateData:candidate.allCandidateData,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      shareCandidatePermission,
      getCandidateListByUserId,
      getCandidatePagination,
      //   getUsers,
      getPermissionsList,
      setChoosedtypeCandidate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateShareForm);
