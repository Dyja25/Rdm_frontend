import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";

const EmailForm = lazy(() => import("./EmailForm"));

class AddEmailModal extends Component {
  render() {
    const { addEmailModal, handleEmailModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          title="Configure"
          width="35%"
          visible={addEmailModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleEmailModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EmailForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddEmailModal;
