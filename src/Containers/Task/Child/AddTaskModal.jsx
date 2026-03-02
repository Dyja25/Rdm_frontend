import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const TaskForm=lazy(()=>import("./TaskForm"));

const AddTaskModal = (props) => {
  const { addTaskModal, handleTaskModal, ...formProps } = props;
  console.log(props.selectedTask);

  return (
    <>
      <StyledModal
        //title="Schedule Task"
        title={<FormattedMessage
          id="app.scheduletask"
          defaultMessage="Schedule Task"
        />}
        width="55vw"
        visible={addTaskModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleTaskModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <TaskForm {...formProps} selectedTask={props.selectedTask} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddTaskModal;
