import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { BundleLoader } from "../../Components/Placeholder";
import AddTaskModal from "./Child/AddTaskModal";
import TaskHeader from "./Child/TaskHeader.jsx";
import { handleTaskModal } from "./TaskAction";

const TaskTable = lazy(() => import("./Child/TaskTable.jsx"));

class Task extends Component {
  render() {
    const { addTaskModal, handleTaskModal } = this.props;
    return (
      <React.Fragment>
        <TaskHeader handleTaskModal={handleTaskModal} />
        <AddTaskModal
          addTaskModal={addTaskModal}
          handleTaskModal={handleTaskModal}
        />
        <Suspense fallback={<BundleLoader />}>
          <TaskTable />
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ task }) => ({
  addTaskModal: task.addTaskModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Task);
