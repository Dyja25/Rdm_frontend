import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

const UpdateBankForm = lazy(() => import("./UpdateBankForm"));

class UpdateBankModal extends Component {
  render() {
    const { updateBankModal, handleUpdateBankModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          //title="Bank"
          title={<FormattedMessage
            id="app.bank"
            defaultMessage="Bank"
          />}
          width="25%"
          visible={updateBankModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateBankModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateBankForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdateBankModal;
