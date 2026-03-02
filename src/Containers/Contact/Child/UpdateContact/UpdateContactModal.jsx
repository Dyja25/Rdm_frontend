import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateContactForm = lazy(() => import("./UpdateContactForm.jsx"));

const UpdateContactModal = props => {
  const { updateContactModal, handleUpdateContactModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        //title="Contact"
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width="55%"
        visible={updateContactModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => handleUpdateContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateContactForm contactId={props.contactId} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateContactModal;
