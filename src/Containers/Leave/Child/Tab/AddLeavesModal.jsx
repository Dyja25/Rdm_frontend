import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LeaveForm = lazy(() => import("./LeaveForm"));
const AddLeavesModal = (props) => {
  const { addLeaveModal, handleLeavesModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        //title="Apply for Leaves"
        title={<FormattedMessage
          id="app.applyforleaves"
          defaultMessage="Apply for Leaves"
        />}
        width="30vw"
        visible={addLeaveModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleLeavesModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeaveForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddLeavesModal;
