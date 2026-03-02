import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import UpdateTaskForm from "./UpdateTaskForm.jsx";

const UpdateTaskModal = (props) => {
    //   console.log(props.leadsId);
    const { updateTaskModal, handleUpdateTaskModal, ...formProps } = props;
    return (
      <>
        <StyledModal
          // title="Update Task"
          title={<FormattedMessage
            id="app.updatetask"
            defaultMessage="Update Task"
          />}
          width="55vw"
          visible={updateTaskModal}
          maskClosable={false}
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateTaskModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateTaskForm />
          </Suspense>
        </StyledModal>
      </>
    );
  };
  
  export default UpdateTaskModal;
