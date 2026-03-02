import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
// import Icon from "antd/lib/icon";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { handleTaskModal, getTaskListRangeByUserId } from "../TaskAction";

const TaskActionRight = (props) => {
  function handleTaskRefresh() {
    const {
      getTaskListRangeByUserId,
      userDetails: { userId },
    } = props;
    getTaskListRangeByUserId(userId);
  }
  return (
    <FlexContainer alignItems="center">
      {/* <Button type="primary" icon="reload" onClick={() => handleTaskRefresh()}>
        Refresh
      </Button> */}
      &nbsp;&nbsp;
      <Tooltip placement="left" title="Create">
        <Button
          type="primary"
          ghost
          onClick={() => props.handleTaskModal(true)}
        >
          Add
        </Button>
      </Tooltip>
    </FlexContainer>
  );
};

const mapStateToProps = ({ task, auth }) => ({
  userDetails: auth.userDetails,

  taskListRangeByUserId: task.taskListRangeByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskModal,
      getTaskListRangeByUserId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskActionRight);
