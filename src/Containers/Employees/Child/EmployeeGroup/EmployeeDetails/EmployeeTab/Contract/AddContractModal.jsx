import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

const ContractDocumentForm = lazy(() =>
  import("./ContractDocumentForm")
);

class AddContractModal extends Component {
  render() {
    const {
      addContractModal,
      handleContractModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          // title="Contract"
          title={<FormattedMessage
            id="app.contract"
            defaultMessage="Contract"
          />}
          width="25%"
          visible={addContractModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleContractModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ContractDocumentForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddContractModal;
