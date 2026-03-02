import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Switch,
  Tooltip,
  Popconfirm,
  Checkbox,
  message,
} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer } from "../../../Components/UI/Elements";
import { shareCustomerPermission, getPermissionsListCustomer } from "../CustomerAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { FormattedMessage } from "react-intl";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function CustomerShareForm(props) {
  useEffect(() => {
    props.getPermissionsListCustomer();
    // props.getsharePartnerUsers();
  }, []);
  // const permissionList = props.permissionsDataListCustomer.map((item) => {
  //   return {
  //     label: `${item.userName || ""}`,
  //     value: item.userId,
  //   };
  // });
  // permissionList.unshift({label:"All", value:"All"})
  // function handleReset(resetForm) {
  //   resetForm();
  // }
  const permissionListForAll = props.permissionsDataListCustomer.map((item) => {
    return item.userId;
  });
  function handleChange(value){
    if(value === "all"){
    props.shareCustomerPermission(
      {
        type: "customer",
        user: permissionListForAll,
      },
      value,
      "All"
    );
    }else{
      props.shareCustomerPermission(
        {
          type: "customer",
          user: [value],
        },
        value,
      
      );
    }
  }
  // console.log(props.shareUsers);
  const findLoginData=props.permissionsDataListCustomer.find((element)=>{
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
        onChange={(e) => handleChange(e)}
      >
         <Option value={"all"}>{"All"} </Option>
        {props.permissionsDataListCustomer.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ customer ,auth}) => ({
  addSharingCustomer: customer.addSharingCustomer,
  userId:auth.userDetails.userId,
  fullName:
  (auth.userDetails.fullName),
  permissionsDataListCustomer: customer.permissionsDataListCustomer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        shareCustomerPermission,
      //   getUsers,
      //   getsharePartnerUsers,
      getPermissionsListCustomer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShareForm);
