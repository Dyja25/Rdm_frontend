import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

import { FormattedMessage } from "react-intl";

const BankDocumentForm = lazy(() => import("./BankDocumentForm.jsx"));

class AddBankModal extends Component {
  render() {
    const { addCandidateBankModal, handleCandidateBankModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          //title="Bank"
          title={<FormattedMessage id="app.bank" defaultMessage="Bank" />}
          width="25%"
          visible={addCandidateBankModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleCandidateBankModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <BankDocumentForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddBankModal;
