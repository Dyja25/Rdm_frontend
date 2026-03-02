import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const PartnerContactForm = lazy(() => import("./PartnerContactForm.jsx"));

const AddContactModal = (props) => {
  const {
    addPartnerContactModal,
    handlePartnerContactModal,
    ...formProps
  } = props;
  return (
    <>
      <StyledModal
        //title="Contact"
        title={<FormattedMessage id="app.contact" defaultMessage="Contact" />}
        width="55%"
        visible={addPartnerContactModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handlePartnerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <PartnerContactForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddContactModal;
