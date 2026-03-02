import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
// import {getScheduler} from "../../../SettingsAction";

function SequenceTable(props) {
  

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
     width: "30%",
    },
    {
      title: "Priority",
      width: "30%",
      dataIndex: " ",     
     
    },

    {
      title: "Days",
      dataIndex: "",
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
  mapStateToProps,
  mapDispatchToProps
)(SequenceTable);
