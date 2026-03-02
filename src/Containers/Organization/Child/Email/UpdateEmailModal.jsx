import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";

const UpdateEmailForm = lazy(() => import("./UpdateEmailForm"));

class UpdateEmailModal extends Component {
  render() {
    const {
      addUpdateEmailModal,
      handleUpdateEmailModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          title="Configure"
          width="35%"
          visible={addUpdateEmailModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateEmailModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>{<UpdateEmailForm />}</Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdateEmailModal;
