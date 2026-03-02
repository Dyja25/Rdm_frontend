import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";

import { FormattedMessage } from "react-intl";

const BankDocumentForm = lazy(() => import("./BankDocumentForm.jsx"));

class AddBankModal extends Component {
  render() {
    const { addBankModal, handleBankModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          //title="Bank"
          title={<FormattedMessage id="app.bank" defaultMessage="Bank" />}
          width="25%"
          visible={addBankModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleBankModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <BankDocumentForm employeeId={this.props.employeeId}/>
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddBankModal;
