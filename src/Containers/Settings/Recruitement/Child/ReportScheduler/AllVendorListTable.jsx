import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getScheduler} from "../../../SettingsAction";

function SchedulerTable(props) {
  

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
     width: "30%",
    },
    {
      title: "Name Of Vendor",
      width: "30%",
      dataIndex: " ",     
     
    },

    {
      title: "Frequency",
      dataIndex: "frequency",
      width: "30%",
    },
  ]
  useEffect(()=>{
   // props.getScheduler(props.organizationId)
},[])
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.scheduler}
        // loading={
        //   props.fetchingScheduler ||
        //   props.fetchingSchedulerError
        // }
        pagination={false}
        scroll={{ y: 240 }}
        onChange={console.log("task onChangeHere...")}
      />
      
    </>
  );
}

const mapStateToProps = ({  auth,settings }) => ({
    // organizationId: auth.userDetails.organizationId,
    // scheduler: settings.scheduler,   
    // fetchingScheduler: settings.fetchingScheduler,
    // fetchingSchedulerError: settings.fetchingSchedulerError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {   
        
    },
    dispatch
  );

export default connect(
  
)(SchedulerTable);
