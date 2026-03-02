import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateLeavesForm = lazy(() => import("./UpdateLeavesForm"));

const UpdateLeavesModal = (props) => {
  const { updateLeaveModal, handleUpdateLeaveModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        //title="Apply for Leaves"
        title={<FormattedMessage
          id="app.applyforleaves"
          defaultMessage="Update Leaves"
        />}
        width="30vw"
        visible={updateLeaveModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleUpdateLeaveModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateLeavesForm leaveId={props.leaveId} />{" "} 
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateLeavesModal;
