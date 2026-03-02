import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import PlannerSharedForm from "./PlannerSharedForm.jsx";
import { StyledSelect } from "../../../Components/UI/Antd";


const Option = StyledSelect.Option;

const PlannerActionRight = (props) => {
  return (
    <FlexContainer alignItems="center">
       <PlannerSharedForm/>
      &nbsp;
        {/* <Button
          type="primary"
          default
          // href={`${base_url}/excel/export/user/candidate/${userId}`}
        >
          Export
        </Button>
        &nbsp;
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            ghost
            onClick={() => handleCandidateModal(true)}
          >
            Add
          </Button>
        </Tooltip> */}
      {/* <span style={{ marginRight: "0.3125em" }}>
        <Button type="primary" onClick={() => props.handleCallModal(true)}>
          <Icon type="plus" />
          Call
        </Button>
      </span>
      <span style={{ marginRight: "0.3125em" }}>
        <Button type="primary" onClick={() => props.handleEventModal(true)}>
          <Icon type="plus" />
          Event
        </Button>
      </span>
      <span>
        <Button type="primary" onClick={() => props.handleTaskModal(true)}>
          <Icon type="plus" />
          Task
        </Button>
      </span> */}

      {/* {props.userType === "ADMIN" && (
         props.subscriptionType === "PROFESSIONALPLUS" && ( */}
      {/* <>
        <PlannerShareForm />
      </> */}

      &nbsp;
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth }) => ({
  // userType: auth.userDetails && auth.userDetails.userType,
  userType: auth.userDetails,


});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PlannerActionRight);
