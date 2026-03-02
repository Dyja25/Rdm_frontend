import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import TaskActionLeft from "./TaskActionLeft.jsx";
import TaskActionRight from "./TaskActionRight.jsx";
class TaskHeader extends Component {
  render() {
    const { viewType, setTaskViewType } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={<TaskActionLeft />}
          rightComponent={<TaskActionRight />}
        />
      </div>
    );
  }
}

export default TaskHeader;
