import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ContactForm = lazy(() => import("./ContactForm.jsx"));

const AddContactModal = (props) => {
  const { addContactModal, handleContactModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        //title="Contact"
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width="55%"
        visible={addContactModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => handleContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddContactModal;
