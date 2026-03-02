import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const EventForm = lazy(() => import("./EventForm.jsx"));
const AddEventModal = (props) => {
  const { addEventModal, handleEventModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        // title="Schedule Event"
        title={<FormattedMessage
          id="app.scheduleevent"
          defaultMessage="Schedule Event"
        />}
        width="55vw"
        visible={addEventModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleEventModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <EventForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddEventModal;
