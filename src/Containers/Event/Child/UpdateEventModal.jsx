import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UpdateEventForm = lazy(() => import("./UpdateEventForm.jsx"));
const UpdateEventModal = (props) => {
  const { updateEventModal, handleUpdateEventModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        // title="Schedule Event"
        title={<FormattedMessage
          id="app.updateEvent"
          defaultMessage="Update Event"
        />}
        width="55vw"
        visible={updateEventModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleUpdateEventModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateEventForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateEventModal;
